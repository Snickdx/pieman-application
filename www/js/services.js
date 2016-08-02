angular.module('app.services', [])

.factory('FB', ['$http', '$firebaseAuth', '$firebaseArray', '$firebaseObject', '$q', function($http, $firebaseAuth, $firebaseArray, $firebaseObject, $q){
  var config = {
    apiKey: "AIzaSyCeKNfcnlIkYrdr2a0qA1QC0nZYdhoyOng",
    authDomain: "pieman-d47da.firebaseapp.com",
    databaseURL: "https://pieman-d47da.firebaseio.com",
    storageBucket: "pieman-d47da.appspot.com"
  };
  firebase.initializeApp(config);

  var auth = $firebaseAuth(firebase.auth());

  var db = firebase.database();

  var obj = {};

  obj.auth = null;

  obj.login = function(email, password){
    return auth.$signInWithEmailAndPassword(email, password).then(function(authData) {
      console.log("Logged in as:", authData.uid);
      obj.auth = authData;
      return obj.get('users/'+authData.uid).then(function(data){
        for(var prop in data){
          if(data.hasOwnProperty(prop) && !authData.hasOwnProperty(prop))authData[prop] = data[prop]
        }
        console.log(authData);
        return authData;
      });

    }).catch(function(error) {
      console.error("Authentication failed:", error);
      return {
        uid: -1,
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
      authData.email = email;
      authData.username = username;
      authData.downvotes = 0;
      authData.id = authData.uid;
      authData.upvotes = 0;
      authData.followers = 0;
      obj.set('users/'+authData.uid,{
        downvotes: 0,
        email: email,
        followers: 0,
        id: authData.uid,
        upvotes: 0,
        username: username
      });
      return authData;
    }).catch(function(error) {
      return {
        uid: -1,
        error: error
      };
    });
  };

  obj.logout = function(){
    return auth.signOut().then(function() {
      obj.auth = null;
      return { status : 0};
    }, function(error) {
      return {status: -1, error: error};
    });
  };

  obj.getCollection = function(){};

  obj.getObject = function(){};

  return obj;
}])

.service('BlankService', [function(){

}]);

