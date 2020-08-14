importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js');

workbox.routing.registerRoute(
  /(.*)(akamaized.net|rocketcdn.com|\/assets\/pro)(.*)\.(?:png|gif|jpg|css|js)/,
  workbox.strategies.networkFirst({
    cacheName: 'assets-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 1 * 24 * 60 * 60, // 1 Days
      })
    ]
  })
);

workbox.routing.registerRoute(
  /(.*)(akamaized.net|rocketcdn.com\/assets\/pro)(.*)\.(?:woff|woff2|svg|eot|otf|ttf)/,
  workbox.strategies.networkFirst({
    cacheName: 'fonts-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      })
    ]
  })
);

workbox.precaching.precacheAndRoute([
  {
    "url": "assets/mobileweb/assets/img/angle-left.png",
    "revision": "13a8897bd3fb8d15553b700729a5b11f"
  },
  {
    "url": "assets/mobileweb/assets/img/angle-right.png",
    "revision": "49cdfc786f4146d88709b21d11e422b6"
  },
  {
    "url": "assets/mobileweb/assets/img/closebox.png",
    "revision": "45a56bc7b82e6c285d1d8ecb7cc7f1f5"
  },
  {
    "url": "assets/mobileweb/assets/img/icon_facebook.png",
    "revision": "65f80db8b04f032915eecafe16716bfd"
  },
  {
    "url": "assets/mobileweb/assets/img/js-logo.jpg",
    "revision": "f7c0f0bd47b2ffc65466b5388a11caf7"
  },
  {
    "url": "assets/mobileweb/assets/img/pixel.png",
    "revision": "ec4756231f055689ac396c4714419687"
  },
  {
    "url": "assets/mobileweb/dist/app.lite.css",
    "revision": "d8e2e8b45a47a2057bb5f2b3e6c96a33"
  },
  {
    "url": "assets/mobileweb/dist/bundle.js",
    "revision": "468619032d1ebe0240d378b4af96572e"
  },
  {
    "url": "assets/mobileweb/dist/bundle.lite.js",
    "revision": "e9f197f541fa0216b577f3a81dbea1dc"
  }
]);
