// Route #1
global.toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
  cache: {
    name: 'pietime',
    maxEntries: 20,
  },
  origin: "https://pieman-d47da.firebaseio.com/pietime.json"
});

// Route #2
global.toolbox.router.get(/\.(?:png|gif|jpg)$/, global.toolbox.cacheFirst, {
  cache: {
    name: 'images-cache',
    maxEntries: 50
  }
});
