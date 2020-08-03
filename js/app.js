// Check to see if the browser supports service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((reg) => console.log('Service worker registered', reg))
    .catch((error) => console.log('Service worker not registered', error));
}
