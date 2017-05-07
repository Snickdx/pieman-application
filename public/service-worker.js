/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/css/ionic.app.css","2514d26ce0367d9bcdcbe9963e66c72b"],["/fonts/roboto/css/fonts.css","fd4f1ad6dcecbde4499e3008c75df950"],["/fonts/roboto/fonts/Roboto-100/Roboto-100.ttf","b0ea79ecda11ad2dabfdda928db2b561"],["/fonts/roboto/fonts/Roboto-100/Roboto-100.woff","58af682d7075bb3510bd041dc8d81706"],["/fonts/roboto/fonts/Roboto-100italic/Roboto-100italic.ttf","e9251dd73aba0509a9bb08bad024db88"],["/fonts/roboto/fonts/Roboto-100italic/Roboto-100italic.woff","36d9e3482400f071d5202885be19ee3f"],["/fonts/roboto/fonts/Roboto-300/Roboto-300.ttf","634f53eb79efa455a9e9d85d608b3447"],["/fonts/roboto/fonts/Roboto-300/Roboto-300.woff","7e2d32e7141050d758a38b4ec96390c0"],["/fonts/roboto/fonts/Roboto-300italic/Roboto-300italic.ttf","1aeedeee0b68884bb34f67a9b3aa76e4"],["/fonts/roboto/fonts/Roboto-300italic/Roboto-300italic.woff","f7f58963e077aaac2476e70ec59ad5be"],["/fonts/roboto/fonts/Roboto-500/Roboto-500.ttf","88f29ea5a372d06f521395134f62ab91"],["/fonts/roboto/fonts/Roboto-500/Roboto-500.woff","0f3b7101a8adc1afe1fbe89775553c32"],["/fonts/roboto/fonts/Roboto-500italic/Roboto-500italic.ttf","b07f691c8304374ab2943cfa1f57d6ed"],["/fonts/roboto/fonts/Roboto-500italic/Roboto-500italic.woff","6fe015419c76da07261300175b1e66d2"],["/fonts/roboto/fonts/Roboto-700/Roboto-700.ttf","ad97d029a11d8b39692037e753d23d1f"],["/fonts/roboto/fonts/Roboto-700/Roboto-700.woff","43183beef21370d8a4b0d64152287eba"],["/fonts/roboto/fonts/Roboto-700italic/Roboto-700italic.ttf","bcfeb9890c11d57f4ebaf5150cd99638"],["/fonts/roboto/fonts/Roboto-700italic/Roboto-700italic.woff","7e3bdb1d31e946199e866262423df9c8"],["/fonts/roboto/fonts/Roboto-900/Roboto-900.ttf","1b72bcbf48ca1ef9e98dccadc4514a92"],["/fonts/roboto/fonts/Roboto-900/Roboto-900.woff","72808932cb03c3e9ace8ba45ff6d9cd4"],["/fonts/roboto/fonts/Roboto-900italic/Roboto-900italic.ttf","862f5eff1ecb4f38d770782bf9e51f81"],["/fonts/roboto/fonts/Roboto-900italic/Roboto-900italic.woff","aa60fa9ca068990c94ad6a4c7c2ebe1d"],["/fonts/roboto/fonts/Roboto-italic/Roboto-italic.ttf","31fc50b4c526d006bf3333b5c04eefaa"],["/fonts/roboto/fonts/Roboto-italic/Roboto-italic.woff","7f839b4cd334882c4729a56e5ec87bf0"],["/fonts/roboto/fonts/Roboto-regular/Roboto-regular.ttf","38861cba61c66739c1452c3a71e39852"],["/fonts/roboto/fonts/Roboto-regular/Roboto-regular.woff","f94d5e5102359961c44a1da1b58d37c9"],["/img/pieman-128.png","005376b904fec5688309522f50208054"],["/img/pieman-144.png","afbbcaed3444682a52c389383efc18be"],["/img/pieman-192.png","81c4d5fad79e1aa6013be54ae8d8f9f7"],["/img/pieman.png","31a7c397ad6f9bdbc85923ff5b0f2c49"],["/img/piemanHD.png","4c694726be8b6e79c0c832ce7a64794b"],["/index.html","6277ec3cdd81b92dc3579c1baa0a47f0"],["/js/app.js","58c79896835b8a65e4e1c274446117df"],["/js/controllers.js","3940ef575dce6270e94d9eab49a18dcb"],["/js/directives.js","e64039e562404ff135fa88cb7229da56"],["/js/routes.js","9f26503bb4ce712ff088a53804bd3d25"],["/js/services.js","4592877e61f0d148d61adab146c3f840"],["/lib/angularfire/dist/angularfire.min.js","5e136c4b28e4c328a30a785a4e2a8636"],["/lib/firebase/firebase-messaging.js","848c4ed5fca26dfd8313f9180d8e07f3"],["/lib/firebase/firebase.js","7be7eaebcffdbb6bd82127ff7dd51580"],["/lib/ionic-datepicker/dist/ionic-datepicker.bundle.min.js","2f76643fcc5fb37064606e2cffa9e490"],["/lib/ionic-datepicker/src/ionic-datepicker-modal.html","25e3cc9e3579f7a43b456b6e41ba4b15"],["/lib/ionic-datepicker/src/ionic-datepicker-popup.html","5f09f03773780fce87478359d03a440d"],["/lib/ionic-timepicker/dist/ionic-timepicker.bundle.min.js","35f3136402da54e8c46198a1c6963c90"],["/lib/ionic-timepicker/src/ionic-timepicker.html","df384f43bf9eae625e1babe6c864b2fd"],["/lib/ionic-toast/dist/ionic-toast.bundle.min.js","3cbf455189b4a41376ee15affa556c38"],["/lib/ionic/fonts/ionicons.eot","2c2ae068be3b089e0a5b59abb1831550"],["/lib/ionic/fonts/ionicons.svg","621bd386841f74e0053cb8e67f8a0604"],["/lib/ionic/fonts/ionicons.ttf","24712f6c47821394fba7942fbb52c3b2"],["/lib/ionic/fonts/ionicons.woff","05acfdb568b3df49ad31355b19495d4a"],["/lib/ionic/js/ionic.bundle.js","d21ca023ae3ff12d90e7b6b3b928a4c5"],["/lib/localforage/dist/localforage.js","e00cd5cbe85dc0d82e56dc8dbe38a650"],["/lib/moment/min/moment.min.js","19436ad9831513f90ffd2421b3d97903"],["/lib/ngstorage/ngStorage.min.js","ee45fc1dc996fc2033bc24c058f95fe4"],["/node_modules/moment-duration-format/lib/moment-duration-format.js","7fef4e037e91f8c4f6d4e97fa5904931"],["/node_modules/moment-duration-format/test/test.html","378b45ec41193634d198236deace8301"],["/templates/piemanStatus.html","d8b5219593f26f75efc35aed5e164c94"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







importScripts("lib/firebase/firebase.js","js/FCMScript.js","lib/localforage/dist/localforage.js","js/sync.js");

