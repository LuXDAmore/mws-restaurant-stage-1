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

var precacheConfig = [["app/scripts/app-866bd44dd3.min.js","866bd44dd34f9061fb97e5dc5489821a"],["app/styles/app-9196732162.min.css","9196732162e72a8a99b28362a6326478"],["assets/icons/icon-128x128.png","e7e76948ae8a3319f68a103cc5f3e824"],["assets/icons/icon-144x144.png","e7e76948ae8a3319f68a103cc5f3e824"],["assets/icons/icon-152x152.png","e7e76948ae8a3319f68a103cc5f3e824"],["assets/icons/icon-192x192.png","e7e76948ae8a3319f68a103cc5f3e824"],["assets/icons/icon-384x384.png","e7e76948ae8a3319f68a103cc5f3e824"],["assets/icons/icon-512x512.png","e7e76948ae8a3319f68a103cc5f3e824"],["assets/icons/icon-72x72.png","c2d2e8555efc218d60b704b47a3d6a1d"],["assets/icons/icon-96x96.png","9c569b063397c4aee25eaa30739124c4"],["assets/images/200/1.jpg","370fcd5e33e7c6bc55ad86e31176f5f5"],["assets/images/200/10.jpg","2be4fb1f529e9773309316c54cab6280"],["assets/images/200/2.jpg","9ef554c3c11a4bcac465b999a0cb628f"],["assets/images/200/3.jpg","b3cbcdce798fec3933e0a8ea78f23295"],["assets/images/200/4.jpg","7037e56519568402ff7527515669e19c"],["assets/images/200/5.jpg","53d25c7342d1dd454ad4e2c773abdbbc"],["assets/images/200/6.jpg","96abc55e2b1758a412729f7f4809f3c7"],["assets/images/200/7.jpg","ef34b4afc79c9693db86b4ce290228e4"],["assets/images/200/8.jpg","3f06a7f41d6e36054ff4b05da845fb8a"],["assets/images/200/9.jpg","0279fa3177133808f69342114780afbd"],["assets/images/400/1.jpg","9d9bf37d03ad7b0efa550aa38a6d4854"],["assets/images/400/10.jpg","74b6ae5070a0f6c5f08f7ebbc904e8b6"],["assets/images/400/2.jpg","0abc89de601cfb8ada2ebb88e648179f"],["assets/images/400/3.jpg","dcaf3c2d054fbe4aa296b32c9748f53d"],["assets/images/400/4.jpg","b463eb7f9ba7fcd3c75cd063846c8e0f"],["assets/images/400/5.jpg","ff6c954880a9d5cc53b1105f8103facf"],["assets/images/400/6.jpg","fc3d4a5505ecf268d62f394d82bf8e0f"],["assets/images/400/7.jpg","ad61a6300ecde8a012f18c02f5d8a103"],["assets/images/400/8.jpg","27ad1a87c3321d2a22b1108c59d58d2d"],["assets/images/400/9.jpg","9b6e5217340b88b326deb3c0dc8dae43"],["assets/images/480/1.jpg","e350bc59106d7b12eec4fbd8c68e3fe0"],["assets/images/480/10.jpg","0c9d1fff40dc3b38bb99e5ba54616315"],["assets/images/480/2.jpg","c76fa810a6865f4cd4b4fd3686540403"],["assets/images/480/3.jpg","93f283e2c729288bb98749ffdfcca5ec"],["assets/images/480/4.jpg","f9e486b641091e2e92ca95849256274d"],["assets/images/480/5.jpg","e4bfa17569fb9a97440448592db52d82"],["assets/images/480/6.jpg","53d4df11b2e54258a97ea1a589ce4137"],["assets/images/480/7.jpg","9f76e931ba25bc2188cbc08da68f0012"],["assets/images/480/8.jpg","02780f80c9daf11de15e387d773a4dd1"],["assets/images/480/9.jpg","2078596f639e5da566d61337fba03411"],["assets/images/800/1.jpg","5f56779423cb076e6715ab3b316cea69"],["assets/images/800/10.jpg","66dd08522d83aa7bccbcf176749a3a30"],["assets/images/800/2.jpg","115a388609e72512336ce84a9dc50d67"],["assets/images/800/3.jpg","a7ca1a51544c6700f796434f007917d2"],["assets/images/800/4.jpg","f8ab58414eef10e1d5719bbc6c9e3bde"],["assets/images/800/5.jpg","77eb65760d05df6cc42f8b94fdefc364"],["assets/images/800/6.jpg","5696e729afff2302ca143f85105d0630"],["assets/images/800/7.jpg","a340eff9b6858dea8eb292196797e66d"],["assets/images/800/8.jpg","f6bf6ae6b153cdd561811086377dd75a"],["assets/images/800/9.jpg","d4b9a6870bed8005ee3cb33e181ee368"],["assets/images/960/1.jpg","8dd38e4aca9b486d6d8b76d87086ac8d"],["assets/images/960/10.jpg","286e9a23a6474a405db077b4593b3928"],["assets/images/960/2.jpg","26efef11645fea3d30750c969b3ba93d"],["assets/images/960/3.jpg","1f5abecfb6015cbb5c4b68cb174f8d58"],["assets/images/960/4.jpg","2bb040d02c248027fdfdab0c01f36a98"],["assets/images/960/5.jpg","5dbb044a48ac6a5f88bfb37a99a8ca0f"],["assets/images/960/6.jpg","edbd447418d5a4b89c6cf90bad578e72"],["assets/images/960/7.jpg","7c147648b8905297a1ae4cace2d73800"],["assets/images/960/8.jpg","dff88fbee450600904a39b306224e2b2"],["assets/images/960/9.jpg","2f2b054e8418199cf6bf2392a8f5c8f8"],["favicon.png","c2d2e8555efc218d60b704b47a3d6a1d"],["index.html","ef04e846bd87504c2596f84ffbab51a4"],["restaurant.html","2dcb13845b12f4b55d2588618aaa841d"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
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
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

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
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
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

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
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







