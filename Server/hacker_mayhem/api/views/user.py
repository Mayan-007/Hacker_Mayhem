import hashlib
import random
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from ..models import User
from ..serializers import UserSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist


@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = hashlib.sha256(request.data.get('password').encode()).hexdigest()

        user = None
        if '@' in username:
            try:
                user = User.objects.get(email=username)
                if not user.check_password(password):
                    user = None
            except ObjectDoesNotExist:
                pass

        if not user:
            user = authenticate(username=username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        try:
            # Delete the user's token to logout
            request.user.auth_token.delete()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    if request.method == 'GET':
        try:
            serializer = UserSerializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_update(request):
    if request.method == 'POST':
        try:
            serializer = UserSerializer(request.user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# forgot password feature with email verification
@api_view(['POST'])
def forgot_password(request):
    if request.method == 'POST':
        try:
            email = request.data.get('email')
            user = User.objects.get(email=email)
            token = random.randint(100000, 999999)
            request.session['token'] = token
            send_mail(
                'Reset Password',
                'Your reset password token is ' + str(token),
                'mayanprajapati007@gmail.com',
                [email],
                fail_silently=False,
            )
            return Response({'message': 'Successfully sent email to reset password.'}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# reset password feature with token verification
@api_view(['POST'])
def reset_password(request):
    if request.method == 'POST':
        try:
            token = int(request.data.get('token'))
            password = request.data.get('password')
            if token != request.session['token']:
                return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
            user = User.objects.get(email=request.data.get('email'))
            user.set_password(password)
            user.save()
            del request.session['token']
            return Response({'message': 'Successfully reset password.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    if request.method == 'POST':
        try:
            # validate password
            password = hashlib.sha256(request.data.get('password').encode()).hexdigest()
            user = authenticate(username=request.user.username, password=password)
            if not user:
                return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)
            request.user.delete()
            return Response({'message': 'Successfully deleted account.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)