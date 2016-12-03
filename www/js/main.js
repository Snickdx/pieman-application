
var endpoint;
var key;
var authSecret;
if ('serviceWorker' in navigator) {
  
  // navigator.serviceWorker.register('service-worker.js').then(function(serviceWorkerRegistration) {
  //   // Use the PushManager to get the user's subscription to the push service.
  //   console.log(serviceWorkerRegistration);
  //   serviceWorkerRegistration.pushManager.getSubscription()
  //     .then(function(subscription) {
  //       // If a subscription was found, return it.
  //       if (subscription) {
  //         return subscription;
  //       }
  //
  //       // Otherwise, subscribe the user (userVisibleOnly allows to specify
  //       // that we don't plan to send notifications that don't have a
  //       // visible effect for the user).
  //       return serviceWorkerRegistration.pushManager.subscribe({
  //         userVisibleOnly: true
  //       });
  //     })
  //     .then(function(subscription) {
  //       // Here you can use the subscription.
  //     });
  //
  // });
  
  navigator.serviceWorker.register('service-worker.js')


    .then(function(registration) {
      console.log('service worker installed');

      return registration.pushManager.getSubscription()
        .then(function(subscription) {

          if (subscription) {
            console.log('subscription found');
            console.log(subscription);
            return subscription;

          }
          console.log("no subscription found");

          return registration.pushManager.subscribe({ userVisibleOnly: true });
        });
    })
    
    .then(function(subscription) {
      var rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
      key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : '';
      var rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
      authSecret = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : '';
      endpoint = subscription.endpoint;
      fetch('http://localhost:3000/register', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          endpoint: subscription.endpoint,
          key: key,
          authSecret: authSecret
        })
      });
    })
    
    .catch(function(err){console.log('Error', err)});
}

function testPush() {
  
  var obj = {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      endpoint: endpoint,
      key: key,
      authSecret: authSecret,
      payload: "Vote Yes",
      delay: 3,
      ttl: 10
    })
  };
  console.log(JSON.stringify(obj));
  
  fetch('http://localhost:3000/sendNotification', obj).then(function(response){
    console.log(response);
  });
}
