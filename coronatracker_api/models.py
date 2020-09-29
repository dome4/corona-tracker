from django.db import models

# Create your models here.


class RecordableUser(models.Model):
    name = models.CharField(max_length=200)
    created_on = models.DateTimeField(auto_now_add=True)
    avatar = models.TextField(blank=True)


class Recording(models.Model):
    user = models.ForeignKey(RecordableUser, on_delete=models.CASCADE)
    timestamp = models.DateField(auto_now_add=True)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'timestamp'], name='unique_recording'),
        ]
