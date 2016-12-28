var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var FCM = require('fcm-push');
const request = require('request');


var fcm = new FCM("AAAAVme7BCM:APA91bG6U_DiXeCzduJmKjy8v733skiVVbMDtm6o-6pfw97H5Xw9HpC8YaZFiu8Xe-1wF1wCL2gTvVyc7AxrYPdX6d4p_6FURGlzDsOKSoMoADprUsERE3wgLHgupKCwYgcu86qLmh0lpUnrCidKwG5QuncBCplXSA");

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCeKNfcnlIkYrdr2a0qA1QC0nZYdhoyOng",
	authDomain: "pieman-d47da.firebaseapp.com",
	databaseURL: "https://pieman-d47da.firebaseio.com",
	storageBucket: "pieman-d47da.appspot.com",
	messagingSenderId: "371107496995",
  // messagingSenderId:"103953800507"
};


firebase.initializeApp(config);

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function sendToTopic(topic, title, message, success, fail, collapseKey=topic){
  
  var payload = {
    to: [topic],
    collapse_key: collapseKey,
    notification: {
      title: title,
      body: message
    }
  };
  
  fcm.send(payload)
    .then(function(response){
      console.log("Successfully sent with response: ", response);
      success(response);
    })
    .catch(function(err){
      console.log("Something has gone wrong!");
      console.error(err);
      fail(err);
    })
}

function sendNotification(message, receiver, callback){
  let data = {
    "notification": {
      "title": "Notipy Notification",
      "body": message,
      "click_action" : "https://pieman.online",
      "icon": "http://pieman.online/img/pieman-128.png"
    },
    "to" : receiver
  };
  
  request({
    url: "https://fcm.googleapis.com/fcm/send",
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization':'key=AAAAVme7BCM:APA91bG6U_DiXeCzduJmKjy8v733skiVVbMDtm6o-6pfw97H5Xw9HpC8YaZFiu8Xe-1wF1wCL2gTvVyc7AxrYPdX6d4p_6FURGlzDsOKSoMoADprUsERE3wgLHgupKCwYgcu86qLmh0lpUnrCidKwG5QuncBCplXSA'
    },
    json: data
  }, function(error, response, body){
    if (callback != undefined) callback(error, response, body);
  })
}

function addToTopic(registration, topic, callback){
  
    request({
      url: `https://iid.googleapis.com/iid/v1/${registration}/rel/topics/${topic}`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'key=AAAAVme7BCM:APA91bG6U_DiXeCzduJmKjy8v733skiVVbMDtm6o-6pfw97H5Xw9HpC8YaZFiu8Xe-1wF1wCL2gTvVyc7AxrYPdX6d4p_6FURGlzDsOKSoMoADprUsERE3wgLHgupKCwYgcu86qLmh0lpUnrCidKwG5QuncBCplXSA'
      }
    }, function(error, response, body){
      if (callback != undefined) callback(error, response, body);
    })
}

function broadcast(message){
  firebase.database().ref('registrations').once('value', function(snapshot) {
    let count = 0, string;
    snapshot.forEach(function(childSnapshot) {
      console.log('sending to '+childSnapshot.val());
      sendNotification(message, childSnapshot.val());
      count++;
    });
    string  = message+' Sent to '+count+' subscribers!';
    console.log(string);
    return string;
  });
}

router.post('/sendNotification', function(req, res) {
  sendNotification(req.body.message, req.body.receiver, function(error, response, body){
    // res.send(error+"<br>"+JSON.stringify(response)+"<br>"+body);
  res.send(response);
  });
});

router.post('/register', function(req, res) {
  
  firebase.database().ref(`registrations/${req.body.topic}`).push(req.body.subscriber);
  addToTopic(req.body.subscriber, req.body.topic, (err, resp, body)=>{
    res.send(resp);
  });
  
});

router.post('/notifyTopic', function(req, res) {
  sendToTopic(req.body.topic, req.body.title, req.body.message, response => {
    res.send(response);
  }, err => {
    res.send(err);
  });
});

router.get('/broadcast/:message', function(req, res){
  broadcast(req.params.message);
  res.send('sent!');
  // res.send(req.params.message);
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Notipy' });
});

router.get('/getSubs', function(req, res) {
	var arr = [];
	firebase.database().ref('registrations').once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			arr.push(childSnapshot.val());
		});
		res.send(JSON.stringify(arr));
	});
});


module.exports = router;
