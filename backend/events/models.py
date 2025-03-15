from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=200)
    start = models.DateTimeField()
    end = models.DateTimeField()
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title