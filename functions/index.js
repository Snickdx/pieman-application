'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
admin.initializeApp(functions.config().firebase);


exports.pietimeUpdate = functions.database.ref('/pietime').onWrite(event => {
  const pietime = event.data.val();
  let payload = {
    "notification": {
      "title": "Notipy Notification",
      "body": "Pieman will be in SAC @ "+moment(pietime.arrive).subtract(4, 'h').format("h:mm A"),
      "click_action" : "https://pieman.online",
      "icon": "https://firebasestorage.googleapis.com/v0/b/pieman-d47da.appspot.com/o/pieman-144.png?alt=media&token=fae111b6-3ddf-4552-a17d-9e911090977b"
    },
    "data": {
      arrive: `${pietime.arrive}`,
      depart: `${pietime.depart}`
    }
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
