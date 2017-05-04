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
    
    .factory('Messaging', ['$localStorage', '$http', ($localStorage, $http) =>{
      
      let service = {};
      
      const msg = firebase.messaging();
      
      service.registerSW = () => {
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
          navigator.serviceWorker.register('service-worker.js')
            .then(reg => {
              msg.useServiceWorker(reg);
              reg.onupdatefound = () => {
            
                let installingWorker = reg.installing;
            
                installingWorker.onstatechange = function() {
                  switch (installingWorker.state) {
                    case 'installed':
                      if (navigator.serviceWorker.controller) {
                        console.log('New or updated content is available.');
                      } else {
                        console.log('Content is now available offline!');
                      }
                      break;
                    case 'redundant':
                      console.error('The installing service worker became redundant.');
                      break;
                  }
                };
                
              };
              
              navigator.serviceWorker.ready.then(function(reg) {
                return reg.sync.register('pietime-fetch');
              });
              
            })
            .catch(function(e) {
              console.error('Error during service worker registration:', e);
            });
  
          
        }
      };
      
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
      
      service.get = function(child){
        return db.ref(child).once("value").then(function(snapshot){
          return snapshot.val();
        });
      };
  
      service.getList = function(child){
    
      };
      
      service.getTime = callback =>{
        service.set('/time', firebase.database.ServerValue.TIMESTAMP);
        callback();
      };
  
      service.onChange = function(child, type, callback){
        return db.ref(child).on(type, snapshot => {
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
      
    }]);
  
    // let w = new Worker('service-worker.js');
    // w.onmessage = function(event) {
    //   console.log('on message received');
    //   localStorage.setItem('pietime', event.data);
    //   localStorage.setItem('background', 'true');
    // };
  
})();


