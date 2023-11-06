from ..models import Blog, MachineBlog
from rest_framework.response import Response
from rest_framework import status
from ..serializers import BlogSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist

@api_view(['GET'])
def blogs(request):
    if request.method == 'GET':
        try:
            serializer = BlogSerializer(Blog.objects.all(), many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['GET'])
def blog(request, id):
    if request.method == 'GET':
        try:
            blog = Blog.objects.get(id=id)
            serializer = BlogSerializer(blog)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def machine_blogs(request):
    if request.method == 'GET':
        try:
            machine_blogs = MachineBlog.objects.filter(machine__id=request.data['machine_id'])
            blogs = []
            for machine_blog in machine_blogs:
                blogs.append(machine_blog.blog)
            serializer = BlogSerializer(blogs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)