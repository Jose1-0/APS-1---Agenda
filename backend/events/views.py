from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer
from .serializers import SubscriptionSerializer
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

def test_vapid_keys(request):
    return JsonResponse({
        'public': settings.VAPID_PUBLIC_KEY,
        'private': settings.VAPID_PRIVATE_KEY
    })

@csrf_exempt  # Para desabilitar a proteção CSRF, já que é uma API externa
def save_push_subscription(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            subscription_data = {
                'endpoint': data.get('endpoint'),
                'keys_auth': data.get('keys', {}).get('auth'),
                'keys_p256dh': data.get('keys', {}).get('p256dh'),
            }

            serializer = SubscriptionSerializer(data=subscription_data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({"message": "Inscrição salva com sucesso!"}, status=201)
            else:
                return JsonResponse(serializer.errors, status=400)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Método não permitido"}, status=405)