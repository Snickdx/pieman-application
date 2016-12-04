var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys =  {
	publicKey : 'BNLlHPnvGOCOWTMoIk_gg3JH7T1THXrbKZy35P4rdqt-I5uM_1OJPUeLL17dOoYVVkPd5Uchl-c8dSxRPADAmgI',
	privateKey: 'SMf4vG2uxOVz6_bAAUFJciFnFHE8bWj42AHPLssm0zA'
};

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCeKNfcnlIkYrdr2a0qA1QC0nZYdhoyOng",
	authDomain: "pieman-d47da.firebaseapp.com",
	databaseURL: "https://pieman-d47da.firebaseio.com",
	storageBucket: "pieman-d47da.appspot.com",
	messagingSenderId: "371107496995"
};

webpush.setGCMAPIKey(config.apiKey);

webpush.setVapidDetails(
	'mailto:example@yourdomain.org',
	vapidKeys.publicKey,
	vapidKeys.privateKey
);


firebase.initializeApp(config);

var sub;

function sendNotification(subscription, payload){

	
	const pushSubscription = {
		endpoint: subscription.endpoint,
		keys: {
			p256dh: subscription.key,
			auth: subscription.authSecret
		}
	};
	
	console.log(pushSubscription);
	webpush.sendNotification(
		pushSubscription,
		payload
	);

}

router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

router.post('/sendNotification', function(req, res) {
	console.log(sub);
	sendNotification(sub, "HI :)");
	res.send('ok');
	// console.log(req);
	//res.send(req.body);
	// setTimeout(function () {
	//
	// 	webpush.sendNotification(req.body.endpoint, {
	// 		TTL: req.body.ttl,
	// 		payload: req.body.payload,
	// 		userPublicKey: req.body.key,
	// 		userAuth: req.body.authSecret
	// 	})
	// 		.then(function () {
	// 			res.sendStatus(201);
	// 		});
	// }, req.body.delay * 1000);
});


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/getSubs', function(req, res) {
	var arr = [];
	firebase.database().ref('subscribers').once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			arr.push(childSnapshot.key);
		});
		res.send(JSON.stringify(arr));
	});
});

router.post('/register', function(req, res){
	console.log(req.body);
	firebase.database().ref("/subscribers/"+req.body.key+"/").set(req.body);
	sub=req.body;
	res.sendStatus(201);
});


module.exports = router;

