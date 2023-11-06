from django.urls import path
from .views.blog import *
from .views.machine import *
from .views.user import *

urlpatterns = [
    
    # Authentication
    path('user/register/', register_user, name='register'),
    path('user/login/', user_login, name='login'),
    path('user/logout/', user_logout, name='logout'),
    path('user/', user_info, name='user_info'),
    path('user/update/', user_update, name='user_update'),
    path('user/forgot_password/', forgot_password, name='forgot_password'),
    path('user/reset_password/', reset_password, name='reset_password'),
    path('user/delete_account/', delete_account, name='delete_account'),
    
    # Machines
    path('machine/<int:id>/', machine, name='machine'),
    path('machines/', machines, name='machines'),
    path('machine/start/', start_machine, name='start_machine'),
    path('machine/stop/', stop_machine, name='stop_machine'),
    
    # User Machines
    path('user_machines/', user_machines, name='user_machines'),
    path('user_machine/<int:id>/', user_machine, name='user_machine'),
    path('user_machine/crack/', crack_machine, name='crack_machine'),
    
    # Blogs
    path('blog/<int:id>/', blog, name='blog'),
    path('blogs/', blogs, name='blogs'),
    
    # Machine Blogs
    path('machine_blogs/', machine_blogs, name='machine_blogs'),
]