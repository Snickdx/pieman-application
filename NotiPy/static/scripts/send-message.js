/* eslint-env browser,  es6 */

function getDetails() {
  const details = window.localStorage.getItem('last-known-details');
  try {
    if (details) {
      return JSON.parse(details);
    }
  } catch (err) {
    // NOOP
  }
  return null;
}

function saveDetails(details) {
  window.localStorage.setItem('last-known-details',
    JSON.stringify(details));
}

function sendPushMessage() {
  const subscriptionTextArea = document.querySelector('#push-subscription');
  const textToSendTextArea = document.querySelector('#push-data');

  // const subscriptionString = subscriptionTextArea.value.trim();
  const dataString = textToSendTextArea.value;
  const subscriptionString = `{"endpoint":"https://fcm.googleapis.com/fcm/send/d5Y9juXfYgE:APA91bF0wlPtbYz1HRGVnz_zBDrrGtM_8SbjKiXGzubOsrkYqD4_FWciH7I9kmWkIuDdBxSC3CjUhW_VUCbm3tZGuqx6XpFHAigHkjVBPjhznmVUzVlXi8f6nKMZtJI42VRxXeKxjAAK","keys":{"p256dh":"BPG1tk3FD4uXZsvFvgPcf2xSv_myNs8x4KrUlIeDwMDd0HPR4wHy3NOAO6bhPCs87dk5UB6IQ_82jccMR8-0CgY=","auth":"7Jwp0K8j2XL89Q_zhhePtw=="}}`;
  console.log(subscriptionString);

  saveDetails({
    subscription: subscriptionString,
    data: dataString
  });

  if (subscriptionString.length === 0 ) {
    return Promise.reject(new Error('Please provide a push subscription.'));
  }

  let subscriptionObject = null;
  try {
    subscriptionObject = JSON.parse(subscriptionString);
  } catch (err) {
    return Promise.reject(new Error('Unable to parse subscription as JSON'));
  }

  if (!subscriptionObject.endpoint) {
    return Promise.reject(new Error('The subscription MUST have an endpoint'));
  }

  const publicElement = document.querySelector('.js-public-key');
  const privateElement = document.querySelector('.js-private-key');
  
  let request =  JSON.stringify({
    subscription: subscriptionObject,
    data: dataString,
    applicationKeys: {
      public: publicElement.textContent,
      private: privateElement.textContent,
    }
  });
  
  // console.log(request);
  
  return fetch('http://localhost:3000/api/send-push-msg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: request
    
  })
  .then((response) => {
    if (response.status !== 200) {
      return response.text()
      .then((responseText) => {
        throw new Error(responseText);
      });
    }
  });
}

function initialiseUI() {
  const sendBtn = document.querySelector('.js-send-push');
  sendBtn.addEventListener('click', () => {
    sendBtn.disabled = true;

    sendPushMessage()
    .catch((err) => {
      console.error(err);
      window.alert(err.message);
    })
    .then(() => {
      sendBtn.disabled = false;
    });
  });

  const previousDetails = getDetails();
  if (previousDetails) {
    const subscriptionTextArea = document.querySelector('#push-subscription');
    const textToSendTextArea = document.querySelector('#push-data');

    subscriptionTextArea.value = previousDetails.subscription;
    textToSendTextArea.value = previousDetails.data;
  }

  sendBtn.disabled = false;
}

window.addEventListener('load', () => {
  initialiseUI();
});
