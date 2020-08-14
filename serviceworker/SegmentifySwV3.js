'use strict';
var cur_date = new Date().toJSON().slice(0,10).replace(/-/g,'');
console.log('I am being updated at' + cur_date);

'use strict';

var defaults = {
  icon: 'https://cdn.segmentify.com/push/error.png',
  restUrl: 'https://gimli-test.segmentify.com/',
  apiKey: '8f6b9ae8-7d0e-455d-be6d-bdf7b74efcf7',
  errorTitle: 'Notification Failed',
  errorMessage: 'Can\'t show the push notification due to possible network problem.'
};

self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
});

self.addEventListener('push', function (event) {
  event.waitUntil(
    self.registration.pushManager.getSubscription()
      .then(function (subscription) {
        var subscriptionId = '';
        try {
          if (!subscription) {
            throw new Error('Couldn\'t find subscription');
          }
          subscriptionId = subscription.endpoint;
          if (event.data) {
            var payloadJson = event.data.json();
            if (typeof payloadJson !== 'object') {
              throw new Error('Json not valid');
            }
            return showSuccess(payloadJson);
          }
        } catch (error) {
          return showError(error, subscriptionId);
        }
      }).catch(function (error) {
      return showError(error);
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  // Close notification.
  event.notification.close();

  switch (event.action) {
    case 'action0':
      var promise = new Promise(
        function (resolve) {
          var redirectUrl = event.notification.data.url;
          if (event.notification.data.actionUrls.length > 0) {
            redirectUrl = event.notification.data.actionUrls[0];
          }
          clients.openWindow(redirectUrl);
          setTimeout(resolve, 1000);
        }).then(function () {
      });
      break;
    case 'action1':
      var promise = new Promise(
        function (resolve) {
          var redirectUrl = event.notification.data.url;
          if (event.notification.data.actionUrls.length > 1) {
            redirectUrl = event.notification.data.actionUrls[1];
          }
          clients.openWindow(redirectUrl);
          setTimeout(resolve, 1000);
        }).then(function () {
      });
      break;
    default:
      var promise = new Promise(
        function (resolve) {
          clients.openWindow(event.notification.data.url);
          setTimeout(resolve, 1000);
        }).then(function () {
      });
      break;
  }

  // Now wait for the promise to keep the permission alive.
  event.waitUntil(Promise.all([interaction(event.notification.data, 'click'), promise]));
});

self.addEventListener('notificationclose', function (event) {
  event.waitUntil(Promise.all([interaction(event.notification.data, 'close')]));
});

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function json(response) {
  return response.json();
}

function showSuccess(data) {
  var notification = {};
  if (data.data) {
    data = data.data;
  }
  notification.title = data.title || '';
  notification.message = data.message || '';
  notification.icon = data.icon || defaults.icon;
  notification.image = data.image || '';
  notification.requireInteraction = true;
  notification.data = {};
  notification.data.url = data.redirectUrl;
  if (data.actions && getBrowserName() !== 'Firefox') {
    notification.actions = JSON.parse(data.actions) || [];
    notification.data.actionUrls = JSON.parse(data.actionUrls) || [];
  }
  if (data.instanceId) {
    notification.data.apiKey = defaults.apiKey;
    notification.data.instanceId = data.instanceId;
    notification.data.userId = data.userId || '';
    return fetch(defaults.restUrl + 'interaction/notification?apiKey=' + defaults.apiKey + '&instanceId=' + data.instanceId + '&type=show').then(function () {
      return showNotification(notification);
    }).catch(function (err) {
      return showNotification(notification);
    });
  } else {
    return showNotification(notification);
  }
}

function showError(error, subscriptionId) {
  var notification = {};
  notification.title = defaults.errorTitle;
  notification.message = defaults.errorMessage;
  notification.icon = defaults.icon;
  notification.image = '';
  notification.requireInteraction = false;
  notification.data = {};
  return fetch(defaults.restUrl + 'error/notification?apiKey=' + defaults.apiKey + '&message=' + error + '&subscriptionId=' + (subscriptionId || 'empty_subscription')).then(function () {
    return showNotification(notification);
  }).catch(function (err) {
    return showNotification(notification);
  });
}

function showNotification(notification) {
  if (getBrowserName() === 'Opera') {
    Promise.all([self.registration.showNotification(notification.title, {
      body: notification.message,
      icon: notification.icon,
      image: notification.image,
      data: notification.data
    })]);
/*
    self.registration.showNotification(notification.title, {
      body: notification.message,
      icon: notification.icon,
      image: notification.image,
      requireInteraction: notification.requireInteraction,
      data: notification.data,
      actions: notification.actions
    });
    */
  } else {
    return self.registration.showNotification(notification.title, {
      body: notification.message,
      icon: notification.icon,
      image: notification.image,
      requireInteraction: notification.requireInteraction,
      data: notification.data,
      actions: notification.actions
    });
  }
}

function interaction(notificationData, type) {
  if (notificationData.apiKey && notificationData.instanceId) {
    if (!defaults.restUrl.endsWith('/')) {
      defaults.restUrl = defaults.restUrl + '/';
    }
    var url = defaults.restUrl + 'interaction/notification?apiKey=' + defaults.apiKey
      + '&instanceId=' + notificationData.instanceId + '&userId=' + notificationData.userId + '&type=' + type;
    return fetch(url).catch(function (err) {
    });
  } else {
    return Promise.resolve(100);
  }
}

function getBrowserName() {
  var agent = '';
  if (/OPR/i.test(navigator.userAgent)) agent = 'Opera';
  else if (/Chrome/i.test(navigator.userAgent)) agent = 'Chrome';
  else if (/Firefox/i.test(navigator.userAgent)) agent = 'Firefox';
  return agent;
}
