from django.db import models

class Event(models.Model):
    PRIORITY_CHOICES = [
    (1, 'Baixa'),
    (2, 'Média'),
    (3, 'Alta'),
    ]
        
    title = models.CharField(max_length=200)
    start = models.DateTimeField()
    end = models.DateTimeField()
    description = models.TextField(blank=True, null=True)
    priority = models.IntegerField(choices=PRIORITY_CHOICES, default=1)

    def __str__(self):
        return self.title