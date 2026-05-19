from django.db import models

# Create your models here.
class Location(models.Model):
    room_name = models.TextField(max_length=20)
    y_coordinate = models.FloatField()
    x_coordinate = models.FloatField()
    
class Connection(models.Model):
    from_location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="from_conn")
    to_location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="to_conn")
    cost = models.FloatField()