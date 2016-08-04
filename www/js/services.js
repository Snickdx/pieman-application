angular.module('app.services', [])

.factory('FB', ['$http', '$firebaseAuth', '$firebaseArray', '$firebaseObject', '$q', '$rootScope', function($http, $firebaseAuth, $firebaseArray, $firebaseObject, $q, $rootScope){
  var config = {
    apiKey: "AIzaSyCeKNfcnlIkYrdr2a0qA1QC0nZYdhoyOng",
    authDomain: "pieman-d47da.firebaseapp.com",
    databaseURL: "https://pieman-d47da.firebaseio.com",
    storageBucket: "pieman-d47da.appspot.com"
  };
  firebase.initializeApp(config);

  var auth = $firebaseAuth();
  
  var db = firebase.database();

  var obj = {};

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

  obj.getList = function(child){};

  obj.getOrderedbyLast = function(child, prop, num){
    return db.ref(child).orderByChild(prop).limitToLast(num);
  };
  
  obj.checkAuth = function(){
    return auth.$onAuthStateChanged(function(authData){
      obj.auth = authData;
      return obj.get('users/'+authData.uid).then(function(data){
        obj.userData = data;
        $rootScope.$broadcast('loggedIn');
        return obj.userData;
      });
    })
  };

  obj.push = function(child, data){
    db.ref(child).push().set(data);
  };

  obj.getCollection = function(child){
    return $firebaseArray(db.ref(child));
  };

  obj.getObject = function(){};

  return obj;
}])

.service('BlankService', [function(){

}]);

