'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
admin.initializeApp(functions.config().firebase);


exports.sendFollowerNotification = functions.database.ref('{pietime}').onWrite(event => {
  const pietime = event.params.pietime;
  let payload = {
    "notification": {
      "title": "Notipy Notification",
      "body": "Pieman will be in SAC @ "+moment(pietime.arrive).add(4, 'h').format("HH:mm:ss A"),
      "click_action" : "https://pieman.online",
      "icon": "https://firebasestorage.googleapis.com/v0/b/pieman-d47da.appspot.com/o/pieman-144.png?alt=media&token=fae111b6-3ddf-4552-a17d-9e911090977b"
    },
    "data": pietime
  };

  let options = {
    "priority": "high"
  };

  let topic = "pieman";

  admin.messaging().sendToTopic(topic, payload, options)
    .then(function(response) {
      console.log("Successfully sent message:", response);
    })
    .catch(function(error) {
      console.log("Error sending message:", error);
    });

});

// exports.addMessage = functions.https.onRequest((req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push it into the Realtime Database then send a response
//   admin.database().ref('/messages').push({original: original}).then(snapshot => {
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     res.redirect(303, snapshot.ref);
//   });
// });
