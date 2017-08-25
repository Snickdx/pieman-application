(()=>{
  
  let noop = () => {};
  
  const config = {
    apiKey: "AIzaSyCeKNfcnlIkYrdr2a0qA1QC0nZYdhoyOng",
    authDomain: "https://pieman.online",
    databaseURL: "https://pieman-d47da.firebaseio.com",
    storageBucket: "pieman-d47da.appspot.com",
    messagingSenderId: "371107496995",
    serverKey: "AAAAVme7BCM:APA91bG6U_DiXeCzduJmKjy8v733skiVVbMDtm6o-6pfw97H5Xw9HpC8YaZFiu8Xe-1wF1wCL2gTvVyc7AxrYPdX6d4p_6FURGlzDsOKSoMoADprUsERE3wgLHgupKCwYgcu86qLmh0lpUnrCidKwG5QuncBCplXSA"
  };
  
  firebase.initializeApp(config);
  
  angular.module('app.services', [])
    
    .factory('ServiceWorker', ()=>{
      const scope = './';
      
      let service = {};
      
      service.sw = null;
      
      service.syncManager = null;
      
      service.pushManager = null;
      
      service.registration = null;
      
      service.getRegistration = (success, failure) => {
        success = success || noop;
        failure = failure || noop;
        
        navigator.serviceWorker.getRegistration(scope).then(reg => {
          success(reg);
        }).catch(err => {
          failure(err);
        });
        
      };
      
      service.getNotifications = () => {
        return service.registration.getNotifications();
      };
      
      service.update = () => {
        service.registration.update()
      };
      
      service.showNotification = notification => {
        if(service.registration == null){
          console.log('registration is null')
        }else{
          service.registration.showNotification('Vibration Sample', {
            body: 'Buzz! Buzz!',
            icon: '../img/pieman-192.png',
            badge: '../img/pieman-128.png',
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: 'vibration-sample'
          });
        }
      };
      
      service.registerSync = (syncName) => {
        navigator.serviceWorker.ready.then(reg => {
          reg.sync.register(syncName);
          console.log(`${syncName} registered`);
        });
      };
      
      service.register = (success, failure) => {
        success = success || noop;
        failure = failure || noop;
        
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register(
              'service-worker.js',
              {scope: scope}
            )
            .then(reg => {
              service.registration = reg;
              service.syncManager = reg.sync;
              service.pushManager = reg.pushManager;
              service.sw = reg.installing;
              
              reg.onupdatefound = () => {
                reg.installing.onstatechange = function() {
                    if (navigator.serviceWorker.controller) {
                      console.log('New or updated content is available.');
                    } else {
                      console.log('Content is now available offline!');
                    }
                };
              };
  
              success();
  
              return navigator.serviceWorker.ready;
    
            })
            .catch(e => {
              console.error("Error installing service worker", e)
            });
          });
          
        }else {
          console.error("Service Worker not supported!");
        }
        
      };
      
      service.update = () => {
        service.getRegistration(reg=>{
          reg.update();
          console.log('updated');
        });
      };
      
      service.isOutdated = () => {
        return false;
      };
      
      return service;
    })
    
    .factory('Messaging', ['$localStorage', '$http', 'ServiceWorker', ($localStorage, $http, ServiceWorker) =>{
      
      let service = {};
      
      const msg = firebase.messaging();
      
      service.onTokenRefresh = callback => {
        msg.onTokenRefresh(() => {
          msg.getToken()
            .then(refreshedToken => {
              $localStorage.savedToken = refreshedToken;
              console.log("Token Refreshed");
              service.deleteToken();
              callback = callback || noop;
              callback(refreshedToken);
            })
            .catch(err => {
              console.log('Unable to retrieve refreshed token ', err);
            });
        });
      };
      
      service.disableMessaging = callback => {
        console.log('Notifications Disabled!');
        let token = $localStorage.savedToken;
        msg.deleteToken($localStorage.savedToken);
        delete $localStorage.savedToken;
        callback = callback || noop;
        callback(token);
      };
      
      service.subscribeToTopic = (token, topic, success) => {
        success = success || noop();
        $localStorage.savedToken = token;
        
        $http({
          method: 'POST',
          url: `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`key=${config.serverKey}`
          }
        }).then(response=>{
          success(response);
        })
      };
      
      service.isEnabled = () => {
        return  $localStorage.savedToken != undefined;
      };
      
      service.onMessage = callback =>{
        msg.onMessage(payload =>{
          console.log("Message Received: ", payload);
          callback(payload);
        });
      };
      
      service.getToken = (success, failure) => {
        msg.getToken()
          .then(token => {success(token)})
          .catch(err => {failure(err)});
      };
      
      service.enableMessaging = (success, failure) => {
        success = success || noop;
        failure = failure || noop;
        
        ServiceWorker.getRegistration(reg=>{
          msg.useServiceWorker(reg);
  
          msg.requestPermission()
            .then(()=>{
              console.log('Notifications supported');
              service.getToken(
                token => {
                  $localStorage.savedToken = token;
                  success(token);
                },
                err => {
                  console.log('Error getting token ', err);
                  failure();
                }
              );
            })
            .catch(function(err) {
              console.log('Unable to get permission to notify.', err);
              failure(err);
            })
        });
        
      };
      
      service.checkMessaging = () => {
        return $localStorage.savedToken != undefined;
      };
      
      return service;
      
    }])
    
    .factory('Database', ['$firebaseArray', '$firebaseObject', ($firebaseArray, $firebaseObject)=>{
      
      let service = {};
      const db = firebase.database();
      
      service.set = function(child, data){
        db.ref(child).set(data);
      };
      
      service.get = (child, callback) =>{
        db.ref(child).once("value").then(function(snapshot){
          callback(snapshot);
        });
      };
      
      service.getList = function(child){
      
      };
      
      service.getTimeRef = ()=>{
        return firebase.database.ServerValue.TIMESTAMP;
      };
      
      service.onConChange = callback => {
        db.ref(".info/connected").on("value", snap=>{
          callback(snap.val());
        });
      };
      
      service.getTimeOffset = callback =>{
        db.ref(".info/serverTimeOffset").on("value", snap => {
          callback(snap.val());
        });
      };
      
      service.onChange = function(child, type, callback){
        db.ref(child).on(type, snapshot => {
          callback(snapshot);
        });
      };
      
      service.update = function(child, obj){
        return db.ref(child).update(obj);
      };
      
      service.getOrderedbyLast = function(child, prop, num){
        return db.ref(child).orderByChild(prop).limitToLast(num);
      };
      
      service.pushKey = (child) => {
        return db.ref(child).push();
      };
      
      service.push = function(child, data){
        return db.ref(child).push().set(data);
      };
      
      service.getCollection = function(child){
        return $firebaseArray(db.ref(child));
      };
      
      service.getObject = function(child){
        return $firebaseObject(db.ref(child));
      };
      
      return service;
      
    }])
    
    .factory('Auth', ['$firebaseAuth', $firebaseAuth=>{
      let service = {};
      
      service.auth = $firebaseAuth(firebase.auth());
      
      service.anonLogin = (success, failure)=>{
        
        service.auth.$signInAnonymously().catch(error=>{
          failure(error);
        });
  
        service.auth.$onAuthStateChanged(user=>{
          success(user);
        });
      };
      
      service.currentUser = () => {
        return firebase.auth().currentUser;
      };
      
      service.onAuth = callback => {
      
      };
      
      return service;
      
    }])
    
    .factory('Caching', [()=>{
      let service = {};
      
      service.retrieve = (name, success, failure) => {
        localforage.getItem(name)
          .then(data=>{
            success(data);
          })
          .catch(err=>{
            failure(err);
          })
        
      };
      
      service.cacheXHR = (url) => {};
      
      service.cacheData = (name, data) => {
        localforage.setItem(name, data)
      };
      
      return service;
    }]);
  
  
})();


