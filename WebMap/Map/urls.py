from . import views
from django.urls import path

urlpatterns = [
    path('', views.index, name='index'),
    path('testmap/', views.testmap, name='testmap'),
    path('pathfind/', views.pathfind, name="pathfind"),
    path('admin-dashboard', views.admin_dashboard, name="adminds"),
    path('save-room/', views.save_room, name="save-room")
]
