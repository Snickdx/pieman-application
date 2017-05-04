self.addEventListener('sync', function (event) {
  console.log('sync event fired');
  if (event.tag === 'pietime-fetch') {
    event.waitUntil(getPieData());
  }
});

let getPieData = ()=> {
  db.ref('/pietime')
    .once("value")
    .then(function(snapshot){
      console.log(snapshot.val());
    })
    .then(function (text) {
      console.log('Request successful', text);
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
};




