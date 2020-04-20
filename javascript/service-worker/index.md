# What is a service worker
A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction.

## features
* push notifications
* background sync

## specialize
* It's a JavaScript Worker, so it can't access the DOM directly. 
* It can communicate with the pages it controls by responding to messages sent via the `postMessage` interface
* It is a programmable network proxy, allowing you to control how network requests from your page are handled.
* It's terminated when not in use, and restarted when it's next needed, so you cannot rely on global state within a service worker's `onfetch` and `onmessage` handlers. If there is information that you need to persist and reuse across restarts, service workers do have access to the `IndexedDB API`.
* Service workers make extensive use of promises

## life cycle
Installing -> Activated -> Idle -> Terminated -> Idle
                                -> Fetch/Message -> Idle
           -> Error

* If all the files are cached successfully, then the service worker becomes installed.
* If any of the files fail to download and cache, then the install step will fail and the service worker won't activate (i.e. won't be installed).
* If that happens, don't worry, it'll try again next time.
* When installed, the activation step will follow and this is a great opportunity for handling any management of old caches, which we'll cover during the service worker update section.
* After the activation step, the service worker will control all pages that fall under its scope, though the page that registered the service worker for the first time won't be controlled until it's loaded again. 
* either the service worker will be terminated to save memory, or it will handle fetch and message events that occur when a network request or message is made from your page.

## dev
* During development you'll be able to use service worker through localhost, but to deploy it on a site you'll need to have HTTPS setup on your server.
* Using service worker you can hijack connections, fabricate, and filter responses. Powerful stuff. While you would use these powers for good, a man-in-the-middle might not. To avoid this, you can only register service workers on pages served over HTTPS, so we know the service worker the browser receives hasn't been tampered with during its journey through the network.
* chrome://serviceworker-internals/
* chrome://inspect/#service-workers

## Code
### Register a service worker
To install a service worker you need to kick start the process by registering it in your page. This tells the browser where your service worker JavaScript file lives.
```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
```
### Install a service worker
```
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
```
### Cache and return requests
After a service worker is installed and the user navigates to a different page or refreshes, the service worker will begin to receive fetch events, an example of which is below.
```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```
