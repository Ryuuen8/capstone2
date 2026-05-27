from django.db import models
from django.urls import reverse
from django.utils.html import format_html
# Create your models here.
class Location(models.Model):
    floor_location = models.IntegerField(default=1)
    room_name = models.TextField(max_length=20)
    coordinates = models.JSONField(default=list)
    y_coordinate = models.FloatField()
    x_coordinate = models.FloatField()
    

    def __str__(self):
        return self.room_name
    

    
class Connection(models.Model):
    from_location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="from_conn")
    to_location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="to_conn")
    cost = models.FloatField()
    
    def __str__(self):
        return f"{self.from_location.room_name} → {self.to_location.room_name}"    
