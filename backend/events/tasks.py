from celery import shared_task
from .models import Event, Subscription
from django.utils import timezone
from datetime import timedelta
import json
import requests
from pywebpush import webpush, WebPushException
from django.conf import settings

@shared_task
def check_upcoming_events():
    now = timezone.now()
    target_time = now + timedelta(minutes=15)

    # Arredondar os segundos para facilitar comparação
    target_time = target_time.replace(second=0, microsecond=0)

    events = Event.objects.filter(start=target_time)

    if not events.exists():
        return

    subscriptions = Subscription.objects.all()

    for event in events:
        payload = {
            "title": "Evento em breve!",
            "body": f"O evento '{event.title}' começa em 15 minutos.",
        }

        for sub in subscriptions:
            try:
                webpush(
                    subscription_info={
                        "endpoint": sub.endpoint,
                        "keys": {
                            "auth": sub.keys_auth,
                            "p256dh": sub.keys_p256dh,
                        },
                    },
                    data=json.dumps(payload),
                    vapid_private_key=settings.VAPID_PRIVATE_KEY,
                    vapid_claims={
                        "sub": "mailto:seuemail@exemplo.com"  # substitua pelo seu email real
                    },
                )
                print(f"Notificação enviada para {sub.endpoint[:30]}...")
            except WebPushException as ex:
                print(f"Erro ao enviar para {sub.endpoint[:30]}: {repr(ex)}")
