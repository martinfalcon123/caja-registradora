self.addEventListener("push", (event) => {
  const data = event.data.json();
  const title = data.title || "Notificación";
  const options = {
    body: data.body || "",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // Abre la app al hacer clic en la notificación
  );
});
