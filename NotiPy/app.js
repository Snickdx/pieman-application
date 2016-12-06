// Copyright 2015-2016, Google, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-env node */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const app = express();
const cors = require('cors');

app.use(cors());
app.options('*', cors());

// Parse JSON body
app.use(bodyParser.json());

app.post('/api/send-push-msg', function(req, res){

  const options = {
    vapidDetails: {
      subject: 'https://developers.google.com/web/fundamentals/',
      publicKey: 'BAd4mNLFMoE4g_m2g2ZSSbEljvi_ROkFMwWgIVwSRp7IpoFUSu0pAqFFw-BunnFOzpvWkKvF10CrT1oT91IOALA',
      privateKey: 'K1DCCq4FyQNU11TfMkXz1LlwiU2cCageTzP5JNTKS-k'
    },
    // 1 hour in seconds.
    TTL: 60 * 60
  };
  
  const mysub = {"endpoint":"https://fcm.googleapis.com/fcm/send/d5Y9juXfYgE:APA91bF0wlPtbYz1HRGVnz_zBDrrGtM_8SbjKiXGzubOsrkYqD4_FWciH7I9kmWkIuDdBxSC3CjUhW_VUCbm3tZGuqx6XpFHAigHkjVBPjhznmVUzVlXi8f6nKMZtJI42VRxXeKxjAAK","keys":{"p256dh":"BPG1tk3FD4uXZsvFvgPcf2xSv_myNs8x4KrUlIeDwMDd0HPR4wHy3NOAO6bhPCs87dk5UB6IQ_82jccMR8-0CgY=","auth":"7Jwp0K8j2XL89Q_zhhePtw=="}};
  
  
  webpush.sendNotification(
    mysub,
    req.body.data,
    options
  )
  .then(function(){
    res.status(200).send({success: true});
  })
  .catch(function(err){
    if (err.statusCode) {
      res.status(err.statusCode).send(err.body);
    } else {
      res.status(400).send(err.message);
    }
  });
});

app.use('/', express.static('static'));

// Start the server
const server = app.listen(3000, function(){
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
// [END app]
