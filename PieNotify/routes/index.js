var express = require('express');
var router = express.Router();
var firebase = require('firebase');
const request = require('request');

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCeKNfcnlIkYrdr2a0qA1QC0nZYdhoyOng",
	authDomain: "pieman-d47da.firebaseapp.com",
	databaseURL: "https://pieman-d47da.firebaseio.com",
	storageBucket: "pieman-d47da.appspot.com",
	messagingSenderId: "371107496995"
};


firebase.initializeApp(config);

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

function broadcast(message){
  firebase.database().ref('registrations').once('value', function(snapshot) {
    let count = 0;
    snapshot.forEach(function(childSnapshot) {
      sendNotification(message, childSnapshot.val());
      count++;
    });
    return message+' Sent to'+count+' subscribers!';
  });
}

router.post('/sendNotification', function(req, res) {
  sendNotification(req.body.message, req.body.receiver, function(error, response, body){
    res.send(body);
  });
});

router.get('/broadCast/:message', function(req, res){
    res.send(broadcast(req.params.message));
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
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
