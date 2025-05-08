from django.urls import path, include
from rest_framework.routers import DefaultRouter
from events.views import EventViewSet

router = DefaultRouter()
router.register(r'events', EventViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/', include('events.urls')),  # <-- adiciona as rotas manuais do app events
]