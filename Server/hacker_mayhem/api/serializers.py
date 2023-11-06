from rest_framework import serializers
from .models import User, Machine, Blog, UserMachine
import hashlib

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'bio', 'first_name', 'last_name', 'profile_pic', 'terms_conditions_agreement']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        hashed_password = hashlib.sha256(validated_data['password'].encode()).hexdigest()
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            terms_conditions_agreement=validated_data['terms_conditions_agreement']
        )
        user.set_password(hashed_password)
        user.save()
        return user
    
class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = ['id', 'ami_id', 'title', 'description', 'flag', 'image', 'difficulty', 'date_created']
        
    def create(self, validated_data):
        machine = Machine(
            ami_id=validated_data['ami_id'],
            title=validated_data['title'],
            description=validated_data['description'],
            flag=validated_data['flag'],
            image=validated_data['image'],
            difficulty=validated_data['difficulty']
        )
        machine.save()
        return machine
    
class UserMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMachine
        fields = ['id', 'user', 'machine', 'machine_status', 'is_cracked', 'cracket_at']

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id', 'title', 'html_body', 'date_created', 'thumbnail']
        
    def create(self, validated_data):
        blog = Blog(
            title=validated_data['title'],
            html_body=validated_data['html_body'],
            thumbnail=validated_data['thumbnail']
        )
        blog.save()
        return blog