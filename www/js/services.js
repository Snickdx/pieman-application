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
    
    const NotifyServer = "http://snickdx.me:3000";
    
    firebase.initializeApp(config);
    const fbAuth = new firebase.auth.FacebookAuthProvider();
  
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
      $http.post(NotifyServer+"/register", {topic:"general", subscriber: token}).then(successCallback, errorCallback);
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
  
    obj.enableMessaging = () => {
      msg.requestPermission()
        .then(function() {
          console.log('Notifications Enabled!');
          ionicToast.show('Notifications Enabled!', 'bottom', false, 4000);
          obj.getToken(
            token => {
              obj.saveToken(token);
            },
            err => {
              console.log('Error getting token ', err);
            }
          );
        })
        .catch(function(err) {
          ionicToast.show('Error enabling notifications', 'bottom', false, 4000);
          console.log('Unable to get permission to notify.', err);
        })
    };
  
    obj.checkMessaging = () => {
      return $localStorage.savedToken != undefined;
    };
    
  
    //***********************************Authentication****************************************
  
    obj.auth = null;
  
    obj.userData = null;
  
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
    
    obj.FBlogin = function(){
      firebase.auth().signInWithPopup(fbAuth).then(function(result) {
        obj.auth = result.user;
        console.log(result.user);
        obj.signUp(result.credential.accessToken, user.displayName);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
    };
    
    
    // obj.FBlogin = function(){
    //   console.log('in here');
    //   firebase.auth().signInWithRedirect(fbAuth);
    //
    //   firebase.auth().getRedirectResult().then(function(result) {
    //     if (result.credential) {
    //       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //       var token = result.credential.accessToken;
    //
    //     }
    //     // if(obj.get('users/'+token) == null )obj.signUp(token, )
    //     // The signed-in user info.
    //     var user = result.user;
    //     console.log(user);
    //     obj.signUp(token, "lol");
    //   }).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     console.log(errorCode, errorMessage, email, credential);
    //   });
    // };
  
    obj.signUp = function(token, username){
        console.log('account created!');
        obj.userData = {
          downvotes: 0,
          followers: 0,
          id: token,
          upvotes: 0,
          username: username
        };
        obj.set('users/'+token, obj.userData);
        return obj.userData;
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
        
            return obj.get('users/'+authData.uid).then(function(data){
              obj.userData = data;
              $rootScope.$broadcast('loggedIn');
              return obj.userData;
            });
          
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

