angular.module('app.services', [])
  
  
  .factory('FB', ['ionicToast', '$http', '$firebaseAuth', '$firebaseArray', '$firebaseObject', '$q', '$rootScope', '$localStorage', function(ionicToast, $http, $firebaseAuth, $firebaseArray, $firebaseObject, $q, $rootScope, $localStorage){
    
    function successCallback(res){
      console.log(res);
    }
    
    function errorCallback(err){
      console.log(err);
    }
    
    const config = {
      apiKey: "AIzaSyCeKNfcnlIkYrdr2a0qA1QC0nZYdhoyOng",
      authDomain: "pieman-d47da.firebaseapp.com",
      databaseURL: "https://pieman-d47da.firebaseio.com",
      storageBucket: "pieman-d47da.appspot.com",
      messagingSenderId: "371107496995"
    };
    
    firebase.initializeApp(config);
    
    const msg = firebase.messaging();
    
    const auth = $firebaseAuth();
    
    const db = firebase.database();
    
    const obj = {};
    
    //**********************************Service Worker****************************************
    
    obj.registerSW = () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js').then(function(reg) {
          msg.useServiceWorker(reg);
          reg.onupdatefound = function() {

            let installingWorker = reg.installing;
            
        
            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case 'installed':
                  if (navigator.serviceWorker.controller) {
                    ionicToast.show('New Content Available Please Refresh', 'bottom', false, 4000);
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
        }).catch(function(e) {
          console.error('Error during service worker registration:', e);
        });
      }
    };
    
    //***********************************Cloud Messaging***************************************
    
    obj.deleteToken = () => {
      obj.set('/registrations/general/'+$localStorage.tokenKey, null);
      console.log('Notifications Disabled!');
      ionicToast.show('Notifications Disabled!', 'bottom', false, 4000);
      delete $localStorage.savedToken;
      delete $localStorage.tokenKey;
    };
    
    obj.saveToken = token => {
      $localStorage.savedToken = token;
      let ref = obj.pushKey('/registrations/general');
      $localStorage.tokenKey = ref.key;
      ref.set(token);
      
      $http({
          method: 'POST',
          url: `https://iid.googleapis.com/iid/v1/${token}/rel/topics/general`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'key=AAAAVme7BCM:APA91bG6U_DiXeCzduJmKjy8v733skiVVbMDtm6o-6pfw97H5Xw9HpC8YaZFiu8Xe-1wF1wCL2gTvVyc7AxrYPdX6d4p_6FURGlzDsOKSoMoADprUsERE3wgLHgupKCwYgcu86qLmh0lpUnrCidKwG5QuncBCplXSA'
          }
        },
        response => {
          console.log('Registered for general notifications', response);
        },
        err => {
          console.log(err);
        });
      
      console.log("Messaging token saved at "+ref.key);
    };
    
    obj.isMsgEnabled = () => {
      return  $localStorage.savedToken != undefined;
    };
    
    msg.onMessage(payload =>{
      console.log("Message Received: ", payload);
      ionicToast.show(payload.notification.title+" : "+payload.notification.body, 'bottom', false, 4000);
    });
    
    msg.onTokenRefresh(() => {
      msg.getToken()
        .then(refreshedToken => {
          console.log("Token Refreshed");
          obj.deleteToken();
          obj.saveToken(refreshedToken);
        })
        .catch(err => {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });
    
    obj.getToken = (success, failure) => {
      msg.getToken()
        .then(token => {success(token)})
        .catch(err => {failure(err)});
    };
    
    obj.enableMessaging = (success, failure) => {
      msg.requestPermission()
        .then(()=>{
          console.log('Notifications supported');
          ionicToast.show('Notifications Enabled!', 'bottom', false, 4000);
          obj.getToken(
            token => {
              obj.saveToken(token);
            },
            err => {
              console.log('Error getting token ', err);
              ionicToast.show('Notification Error', 'bottom', false, 4000);
            }
          );
          success();
        })
        .catch(function(err) {
          ionicToast.show('Notifications only available on Chrome Firefox or Opera!', 'bottom', false, 4000);
          console.log('Unable to get permission to notify.', err);
          failure();
        })
    };
    
    obj.checkMessaging = () => {
      return $localStorage.savedToken != undefined;
    };
    
    
    //***********************************Authentication****************************************
    
    obj.auth = null;
    
    obj.userData = null;
    
    obj.isAuth = function(){};
    
    obj.getAuthData = function(){
      return auth.$getAuth();
    };
    
    obj.getUserData = function(){
      return obj.userData;
    };
    
    obj.getUserName = function(){
      obj.userData = JSON.parse($localStorage.userData);
      console.log(obj.userData);
      return $localStorage.userData.username;
    };
    
    obj.FBlogin = function(){
      auth.$signInWithRedirect(new firebase.auth.FacebookAuthProvider()).catch(err=>{
        ionicToast.show('Error singing in ', 'bottom', false, 4000);
        console.log(err);
      });
 
    };
    
    obj.checkAuth = function(){
      return auth.$onAuthStateChanged(function(authData){
        obj.auth = authData;
        if(authData != null){
          
          obj.get('users/'+authData.uid).then(
            val => {
              if(val == null){
                console.log('first time login signing up');
                obj.userData ={
                  uid: authData.uid,
                  type: 'user',
                  downvotes: 0,
                  followers: 0,
                  upvotes: 0,
                  displayName: authData.displayName
                };
                obj.set('users/'+obj.userData.uid, obj.userData);
              }else{
                obj.userData = val;
                console.log('user data found', obj.userData);
              }
              $rootScope.$broadcast('loggedIn');
              return obj.userData;
            }
          );
        }
        $rootScope.$broadcast('noAuth');
        return authData;
      })
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
    
    obj.set = function(child, data){
      db.ref(child).set(data);
    };
    
    obj.get = function(child){
      return db.ref(child).once("value").then(function(snapshot){
        return snapshot.val();
      });
    };
    
    obj.getList = function(child){
      
    };
    
    obj.update = function(child, obj){
      return db.ref(child).update(obj);
    };
    
    obj.getOrderedbyLast = function(child, prop, num){
      return db.ref(child).orderByChild(prop).limitToLast(num);
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
    
    obj.getObject = function(child){
      return $firebaseObject(db.ref(child));
    };
    
    return obj;
  }])
  
  .factory('NotifyService', ['webNotification', function(webNotification){
    
    let obj = {};
    
    obj.show = function(options){
      webNotification.showNotification(options.title, {
        body: options.body,
        icon: options.icon,
        onClick: function onNotificationClicked() {
          console.log('Notification clicked.');
        },
        autoClose: 4000 //auto close the notification after 4 seconds (you can manually close it via hide function)
      }, function onShow(error, hide) {
        if (error) {
          window.alert('Unable to show notification: ' + error.message);
        } else {
          console.log('Notification Shown.');
          
          setTimeout(function hideNotification() {
            console.log('Hiding notification....');
            hide(); //manually close the notification (you can skip this if you use the autoClose option)
          }, 5000);
        }
      });
    };
    
    return obj;
    
  }]);

