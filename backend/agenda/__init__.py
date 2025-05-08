from __future__ import absolute_import, unicode_literals

# Faz o Celery ser carregado quando o Django inicia
from .celery import app as celery_app

__all__ = ('celery_app',)