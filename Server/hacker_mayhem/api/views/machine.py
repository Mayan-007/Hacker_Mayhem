from ..models import Machine, UserMachine
from rest_framework.response import Response
from rest_framework import status
from ..serializers import MachineSerializer, UserMachineSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from .aws import create_new_ec2_instance, terminate_ec2_instance

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def machines(request):
    if request.method == 'GET':
        try:
            serializer = MachineSerializer(Machine.objects.all(), many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def machine(request, id):
    if request.method == 'GET':
        try:
            machine = Machine.objects.get(id=id)
            serializer = MachineSerializer(machine)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Machine not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_machine(request):
    if request.method == 'POST':
        try:
            machine = Machine.objects.get(id=request.data['machine_id'])
            
            # Check if the machine is already running for the user
            try:
                user_machine = UserMachine.objects.get(user=request.user, machine=machine)
                if user_machine.machine_status == 'running':
                    return Response({'error': 'Machine already running'}, status=status.HTTP_400_BAD_REQUEST)
            except ObjectDoesNotExist:
                pass
            
            # Check if the user has another machine running
            try:
                user_machine = UserMachine.objects.get(user=request.user, machine_status='running')
                if user_machine:
                    return Response({'error': 'You can only run one machine at a time'}, status=status.HTTP_400_BAD_REQUEST)
            except ObjectDoesNotExist:
                pass
            
            new_instance_id, new_public_ip = create_new_ec2_instance(machine)
            
            
            # Check if the user has a machine with the same instance id
            try:
                user_machine = UserMachine.objects.get(user=request.user, machine=machine)
                user_machine.ip_address = new_public_ip
                user_machine.am_id = new_instance_id
                user_machine.machine_status = 'running'
                user_machine.save()
                resonse_data = {
                    'id': user_machine.id,
                    'ip_address': user_machine.ip_address,
                    'machine_status': user_machine.machine_status,
                }
                return Response(resonse_data, status=status.HTTP_200_OK)
            except ObjectDoesNotExist:
                pass
            
            user_machine = UserMachine.objects.create(
                user=request.user,
                machine=machine,
                ip_address=new_public_ip,
                am_id=new_instance_id,
                machine_status='running',
            )
            user_machine.save()
            resonse_data = {
                'id': user_machine.id,
                'ip_address': user_machine.ip_address,
                'machine_status': user_machine.machine_status,
            }
            return Response(resonse_data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Machine not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def stop_machine(request):
    if request.method == 'POST':
        try:
            user_machine = UserMachine.objects.get(id=request.data['user_machine_id'])
            
            try:
                machine = Machine.objects.get(id=user_machine.machine.id)
            except ObjectDoesNotExist:
                return Response({'error': 'Machine not found'}, status=status.HTTP_404_NOT_FOUND)
            
            # Check if the machine is already stopped
            if user_machine.machine_status == 'stopped':
                return Response({'error': 'Machine already stopped'}, status=status.HTTP_400_BAD_REQUEST)
            
            if user_machine.machine_status == 'running':
                terminate_ec2_instance(user_machine.am_id)
                user_machine.machine_status = 'stopped'
                user_machine.save()
                return Response({'message': 'Machine stopped'}, status=status.HTTP_200_OK)
            
        except ObjectDoesNotExist:
            return Response({'error': 'Machine not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_machines(request):
    if request.method == 'GET':
        try:
            user_machines = UserMachine.objects.filter(user=request.user)
            serializer = UserMachineSerializer(user_machines, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_machine(request, id):
    if request.method == 'GET':
        try:
            user_machine = UserMachine.objects.get(id=id)
            serializer = UserMachineSerializer(user_machine)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Machine not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def crack_machine(request):
    if request.method == 'POST':
        try:
            user_machine = UserMachine.objects.get(id=request.data['user_machine_id'])
            
            # Check if the machine is already cracked
            
            # Check if the machine is running
            if user_machine.machine_status != 'running':
                return Response({'error': 'Machine is not running'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Check if the flag is correct
            if request.data['flag'] != user_machine.machine.flag:
                return Response({'error': 'Flag is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
            
            user_machine.is_cracked = True
            user_machine.machine_status = 'stopped'
            user_machine.save()
            terminate_ec2_instance(user_machine.am_id)
            return Response({'message': 'Machine cracked'}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Machine not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)