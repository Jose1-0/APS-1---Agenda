import axios from 'axios';

const publicVapidKey = 'BPy1yeHiRhU9fxPkQwbBvtZ-tXCQ69N2m2DpkaFZphrD8ODPLnYWlF4OJGw3W7UrHDOopR0Gn32shA3yD3xD9yM';

export async function registerForPush() {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.register('/sw.js');

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    // Envia para o Django
    await axios.post('http://localhost:8000/api/save-subscription/', {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
    });

    console.log('Usuário inscrito para notificações');
  }
}

// utilitário necessário
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}