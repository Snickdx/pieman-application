angular.module('app.services', [])
  
  
  .factory('FB', ['$http', '$firebaseAuth', '$firebaseArray', '$firebaseObject', '$q', '$rootScope', '$localStorage', function($http, $firebaseAuth, $firebaseArray, $firebaseObject, $q, $rootScope, $localStorage){
    
    const config = {
      apiKey: "AIzaSyCeKNfcnlIkYrdr2a0qA1QC0nZYdhoyOng",
      authDomain: "pieman-d47da.firebaseapp.com",
      databaseURL: "https://pieman-d47da.firebaseio.com",
      storageBucket: "pieman-d47da.appspot.com",
      messagingSenderId: "371107496995",
    };
    
    firebase.initializeApp(config);
  
    const msg = firebase.messaging();
  
    const auth = $firebaseAuth();
  
    const db = firebase.database();
    
    const obj = {};
    
    //**********************************Service Worker****************************************
    
    obj.registerSW = () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
          .then(function(registration){
            console.log('service worker installed');
            msg.useServiceWorker(registration);
          })
          .catch(function(err){console.log('Error', err)});
      }
    };
    
    //***********************************Cloud Messaging***************************************
  
    obj.deleteToken = () => {
      obj.set('/subscriptions/'+$localStorage.tokenKey, "null");
      delete $localStorage.savedToken;
      delete $localStorage.tokenKey;
    };
  
    obj.saveToken = token => {
      $localStorage.savedToken = token;
      let ref = obj.pushKey('/registrations');
      $localStorage.tokenKey = ref.key;
      ref.set(token);
      console.log("Messaging token saved at "+ref.key);
    };
  
    obj.loadToken = () =>{
      return $localStorage.savedToken
    };
  
    obj.isMsgEnabled = () => {
      return  $localStorage.savedToken != undefined;
    };
  
    obj.onMessage = () => {
      msg.onMessage(function(payload) {
        console.log("Message received. ", payload);
      })
    };
  
    obj.onTokenFresh = () => {
      msg.onTokenRefresh(() => {
        msg.getToken()
          .then(function(refreshedToken) {
            obj.deleteToken();
            obj.saveToken(refreshedToken);
          })
          .catch(function(err) {
            console.log('Unable to retrieve refreshed token ', err);
          });
      });
    };
  
    obj.enableMessaging = () => {
      console.log('enabled bro');
      msg.requestPermission()
        .then(function() {
          console.log('Notification permission granted.');
          obj.enableMessaging(token => {
            obj.saveToken(token);
          });
        })
        .catch(function(err) {
          console.log('Unable to get permission to notify.', err);
        })
    };
  
    obj.checkMessaging = () => {
      return $localStorage.savedToken != undefined;
    };
  
    obj.getToken = callback =>{
      msg.getToken()
        .then(function(currentToken) {
          if (currentToken) {
            callback(currentToken);
          } else {
            console.log('No Instance ID token available. Request permission to generate one.');
          }
        })
        .catch(function(err) {
          console.log('An error occurred while retrieving token. ', err);
        });
    };
    
  
    //***********************************Authentication****************************************
  
    obj.auth = null;
  
    obj.userData = null;
  
    obj.login = function(email, password){
      return auth.$signInWithEmailAndPassword(email, password).then(function(authData) {
        console.log("Logged in as:", authData.uid);
        obj.auth = authData;
        return obj.get('users/'+authData.uid).then(function(data){
          obj.userData = data;
          return obj.userData;
        });
      }).catch(function(error) {
        console.error("Authentication failed:", error);
        return {
          id: -1,
          error: error
        };
      });
    };
  
    obj.set = function(child, data){
      db.ref(child).set(data);
    };
  
    obj.get = function(child){
      return db.ref(child).once("value").then(function(snapshot){
        return snapshot.val();
      });
    };
  
    obj.isAuth = function(){};
  
    obj.signUp = function(username, email, password){
      return auth.$createUserWithEmailAndPassword(email, password).then(function(authData){
        obj.auth=authData;
        console.log('account created!');
        obj.userData = {
          downvotes: 0,
          email: email,
          followers: 0,
          id: authData.uid,
          upvotes: 0,
          username: username
        };
        obj.set('users/'+authData.uid, obj.userData);
        return obj.userData;
      }).catch(function(error) {
        return {
          uid: -1,
          error: error
        };
      });
    };
  
    obj.logout = function(){
      try {
        auth.$signOut();
        obj.auth = null;
        return $q.when({ status : 0});
      }
      catch(error) {
        return $q.when({status: -1, error: error});
      }
    };
    
    
    //************************************* Database ******************************************
    
    obj.getList = function(child){};
    
    obj.getOrderedbyLast = function(child, prop, num){
      return db.ref(child).orderByChild(prop).limitToLast(num);
    };
    
    obj.checkAuth = function(){
      return auth.$onAuthStateChanged(function(authData){
        obj.auth = authData;
        if(authData != null){
          if(authData.isAnonymous){
            obj.userData = {username:'Anonymous'};
            $rootScope.$broadcast('loggedIn');
            return obj.userData;
          }else{
            return obj.get('users/'+authData.uid).then(function(data){
              obj.userData = data;
              $rootScope.$broadcast('loggedIn');
              return obj.userData;
            });
          }
        }
        return authData;
        
      })
    };
    
    obj.anonLogin = function(){
      auth.$signInAnonymously().catch(function(error) {
        return {uid: -1, error:error};
      });
      return obj.checkAuth();
    };
    
    obj.pushKey = (child) => {
      return db.ref(child).push();
    };
    
    obj.push = function(child, data){
      return db.ref(child).push().set(data);
    };
    
    obj.getCollection = function(child){
      return $firebaseArray(db.ref(child));
    };
    
    obj.getObject = function(){};
    
    return obj;
  }]);
  
//   .factory('NotifyService', ['webNotification', function(webNotification){
//
//   let obj = {};
//
//   obj.show = function(options){
//     webNotification.showNotification(options.title, {
//       body: options.body,
//       icon: options.icon,
//       onClick: function onNotificationClicked() {
//         console.log('Notification clicked.');
//       },
//       autoClose: 4000 //auto close the notification after 4 seconds (you can manually close it via hide function)
//     }, function onShow(error, hide) {
//       if (error) {
//         window.alert('Unable to show notification: ' + error.message);
//       } else {
//         console.log('Notification Shown.');
//
//         setTimeout(function hideNotification() {
//           console.log('Hiding notification....');
//           hide(); //manually close the notification (you can skip this if you use the autoClose option)
//         }, 5000);
//       }
//     });
//   };
//
//   return obj;
//
// }]);

