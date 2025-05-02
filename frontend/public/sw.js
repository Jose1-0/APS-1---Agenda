self.addEventListener('push', function (event) {
    const data = event.data.json();
    console.log('Push recebido:', data);

    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '', // ícone se quiser
    });
  });