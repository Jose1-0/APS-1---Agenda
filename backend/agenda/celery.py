from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Setando o módulo de configurações do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'agenda.settings')

app = Celery('agenda')

# Usando a configuração do Celery
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto discover tasks em todos os apps
app.autodiscover_tasks()