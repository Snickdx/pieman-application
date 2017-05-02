
toolbox.router.post('/(.*)', toolbox.fastest, {origin: 'https://pieman-d47da.firebaseio.com/pietime.json'});
toolbox.cache("https://pieman-d47da.firebaseio.com/pietime.json");
