import boto3
import environ
env = environ.Env()
environ.Env.read_env()
aws_access_key_id = env('AWS_ACCESS_KEY_ID')
aws_secret_access_key = env('AWS_SECRET_ACCESS_KEY')
aws_region = env('AWS_REGION')

def create_new_ec2_instance(machine):
    # Initialize the EC2 client
    ec2_client = boto3.client('ec2', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key, region_name=aws_region)

    # Create a new EC2 instance based on the specified AMI
    new_instance = ec2_client.run_instances(
        ImageId=machine.ami_id,
        InstanceType=machine.instance_type,
        MinCount=1,
        MaxCount=1,
        SecurityGroupIds=[machine.security_group.sg_id],
        KeyName=machine.key_pair_name
    )['Instances'][0]

    # Wait for the new instance to reach the 'running' state
    waiter = ec2_client.get_waiter('instance_running')
    waiter.wait(InstanceIds=[new_instance['InstanceId']])

    # Describe the new instance to get its public IP address
    response = ec2_client.describe_instances(InstanceIds=[new_instance['InstanceId']])
    new_public_ip = response['Reservations'][0]['Instances'][0]['PublicIpAddress']

    return new_instance['InstanceId'], new_public_ip


def terminate_ec2_instance(instance_id):
    # Initialize the EC2 client
    ec2_client = boto3.client('ec2', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key, region_name=aws_region)

    try:
        # Terminate the EC2 instance
        ec2_client.terminate_instances(InstanceIds=[instance_id])

        # Wait for the instance to be terminated
        waiter = ec2_client.get_waiter('instance_terminated')
        waiter.wait(InstanceIds=[instance_id])
    except Exception as e:
        print(e)
        
    return None
    
    