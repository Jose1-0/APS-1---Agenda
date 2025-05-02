from django.urls import path
from .views import test_vapid_keys, save_push_subscription  # Adicione a view de inscrição

urlpatterns = [
    path('test-vapid/', test_vapid_keys),
    path('save-subscription/', save_push_subscription),  # Nova rota para salvar a inscrição
]