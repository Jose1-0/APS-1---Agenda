from rest_framework import serializers
from .models import Event
from .models import Subscription

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class SubscriptionSerializer(serializers.ModelSerializer):
    keys = serializers.DictField(write_only=True)

    class Meta:
        model = Subscription
        fields = ['endpoint', 'keys']

    def create(self, validated_data):
        keys = validated_data.pop('keys', {})
        return Subscription.objects.create(
            endpoint=validated_data['endpoint'],
            keys_p256dh=keys['p256dh'],
            keys_auth=keys['auth'],
        )