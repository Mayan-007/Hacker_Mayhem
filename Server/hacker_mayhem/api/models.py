from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(max_length=254)
    bio = models.TextField(blank=True, null=True)
    password = models.CharField(max_length=200, null=True)
    first_name = models.CharField(max_length=200, null=True)
    last_name = models.CharField(max_length=200, null=True)
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    policy_agreement = models.BooleanField(default=False)
    terms_conditions_agreement = models.BooleanField(default=False)
    
    def __str__(self):
        return self.username
    
class Blog(models.Model):
    title = models.CharField(max_length=200, null=True)
    html_body = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    thumbnail = models.ImageField(upload_to='thumbnails/', null=True, blank=True)
    
    def __str__(self):
        return self.title
    
class Machine(models.Model):
    ami_id = models.CharField(max_length=200, null=True)
    key_pair_name = models.CharField(max_length=200, null=True)
    instance_type = models.CharField(max_length=200, null=True)
    security_group = models.ForeignKey('SecurityGroup', on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200, null=True)
    description = models.TextField(blank=True, null=True)
    flag = models.CharField(max_length=200, null=True)
    key_pair_name = models.CharField(max_length=200, null=True)
    image = models.ImageField(upload_to='machine_images/', null=True, blank=True)
    difficulty = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    
    def __str__(self):
        return self.title

class SecurityGroup(models.Model):
    name = models.CharField(max_length=200, null=True)
    sg_id = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    
    def __str__(self):
        return self.name
    
class MachineBlog(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, null=True)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return self.machine.title + " - " + self.blog.title
    
class UserMachine(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, null=True)
    ip_address = models.CharField(max_length=200, null=True)
    am_id = models.CharField(max_length=200, null=True)
    machine_status = models.CharField(max_length=200, null=True)
    is_cracked = models.BooleanField(default=False)
    cracket_at = models.DateTimeField(auto_now_add=True, null=True)
    
    def __str__(self):
        return self.user.username + " - " + self.machine.title