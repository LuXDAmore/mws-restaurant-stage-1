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

var precacheConfig = [["app/scripts/app-d736e91a8a.min.js","d736e91a8a9212072997797e81fcf64e"],["app/styles/app-e136038cb9.min.css","e136038cb96cab02058f9a0d916ec23d"],["assets/icons/icon-128x128.png","e7e76948ae8a3319f68a103cc5f3e824"],["assets/icons/icon-144x144.png","e7e76948ae8a3319f68a103cc5f3e824"],["assets/icons/icon-152x152.png","e7e76948ae8a3319f68a103cc5f3e824"],["assets/icons/icon-192x192.png","e7e76948ae8a3319f68a103cc5f3e824"],["assets/icons/icon-384x384.png","e7e76948ae8a3319f68a103cc5f3e824"],["assets/icons/icon-512x512.png","e7e76948ae8a3319f68a103cc5f3e824"],["assets/icons/icon-72x72.png","c2d2e8555efc218d60b704b47a3d6a1d"],["assets/icons/icon-96x96.png","9c569b063397c4aee25eaa30739124c4"],["assets/images/320/1.jpg","65af654a6989764d2fa158cdc466639f"],["assets/images/320/1.webp","7153496487c60abc436931f29b28adb6"],["assets/images/320/10.jpg","17b2b35d555652a687beaf94169c5dd1"],["assets/images/320/10.webp","ea0d624da6eab4bc6b4bc5cf2d64691a"],["assets/images/320/2.jpg","829e10c15eb7ce25c4e83a0662d79855"],["assets/images/320/2.webp","287284ed9de81b9f1ef4af72986d468b"],["assets/images/320/3.jpg","b9745d3b70ab7a28e14eb2126d4ecf7d"],["assets/images/320/3.webp","99adaff363f5c0031130fe52a1b2c3c1"],["assets/images/320/4.jpg","846272af7aa86940c3ab5b70f8e8222d"],["assets/images/320/4.webp","cd97282d90bd12238083e9f4fb353190"],["assets/images/320/5.jpg","73b1b1930560a10cfa330237c71eee2d"],["assets/images/320/5.webp","e83919181f55dcbf7eba27f8b9e26fff"],["assets/images/320/6.jpg","165f83de6215b37edaf9a7d41c2754a1"],["assets/images/320/6.webp","90761b3f4f8b2df855c28f906f5f3431"],["assets/images/320/7.jpg","adb9174478aafb3efad1364848b2c16f"],["assets/images/320/7.webp","47946a169adfa96f422f0467f08ae074"],["assets/images/320/8.jpg","f15463fb1bc40b05db433cd4f6c9bf60"],["assets/images/320/8.webp","8dc0380b2ecb513e70b5b7975706bf52"],["assets/images/320/9.jpg","8c1d4e56fd2236607afe775341bbe68c"],["assets/images/320/9.webp","78e53eb11f2b210cbb2528d5a161574c"],["assets/images/400/1.jpg","9d9bf37d03ad7b0efa550aa38a6d4854"],["assets/images/400/1.webp","68ae8d210cb00521f1a71459cdbba442"],["assets/images/400/10.jpg","74b6ae5070a0f6c5f08f7ebbc904e8b6"],["assets/images/400/10.webp","33faf8e8f0700adfd7c415a1df6d5baf"],["assets/images/400/2.jpg","0abc89de601cfb8ada2ebb88e648179f"],["assets/images/400/2.webp","e56fbfef5d03712b37f5f0bf282d341e"],["assets/images/400/3.jpg","dcaf3c2d054fbe4aa296b32c9748f53d"],["assets/images/400/3.webp","508c4fb96c9be0fe413eb26b13669243"],["assets/images/400/4.jpg","b463eb7f9ba7fcd3c75cd063846c8e0f"],["assets/images/400/4.webp","cd6dfc732f82c09e90ae4b5589734d72"],["assets/images/400/5.jpg","ff6c954880a9d5cc53b1105f8103facf"],["assets/images/400/5.webp","f5d7144cc9f030fc77fd8f60bb8cccef"],["assets/images/400/6.jpg","fc3d4a5505ecf268d62f394d82bf8e0f"],["assets/images/400/6.webp","0ae2f6ce33e7f2b588a089e8d04012f2"],["assets/images/400/7.jpg","ad61a6300ecde8a012f18c02f5d8a103"],["assets/images/400/7.webp","15d3983914f9eea7a01887c3111e6d3d"],["assets/images/400/8.jpg","27ad1a87c3321d2a22b1108c59d58d2d"],["assets/images/400/8.webp","bb2e4d893106214631ce3828b09da053"],["assets/images/400/9.jpg","9b6e5217340b88b326deb3c0dc8dae43"],["assets/images/400/9.webp","425b10844d0f45770684d7b1d3f2bd68"],["assets/images/480/1.jpg","e350bc59106d7b12eec4fbd8c68e3fe0"],["assets/images/480/1.webp","5f3332e299d6c1642cc74ccff63e65e0"],["assets/images/480/10.jpg","0c9d1fff40dc3b38bb99e5ba54616315"],["assets/images/480/10.webp","1956313389018a5a35ff867f5665cbe4"],["assets/images/480/2.jpg","c76fa810a6865f4cd4b4fd3686540403"],["assets/images/480/2.webp","e680a76d2e8ef422e866690b29b1d7bf"],["assets/images/480/3.jpg","93f283e2c729288bb98749ffdfcca5ec"],["assets/images/480/3.webp","3faeae15de8c5dc026ddf5bca5026746"],["assets/images/480/4.jpg","f9e486b641091e2e92ca95849256274d"],["assets/images/480/4.webp","1861794d68705e40a40c07f820640ea3"],["assets/images/480/5.jpg","e4bfa17569fb9a97440448592db52d82"],["assets/images/480/5.webp","f1e967e167c2258f4865c814efd38fad"],["assets/images/480/6.jpg","53d4df11b2e54258a97ea1a589ce4137"],["assets/images/480/6.webp","9dc436acae67d9741d3795d5814c7659"],["assets/images/480/7.jpg","9f76e931ba25bc2188cbc08da68f0012"],["assets/images/480/7.webp","b2132f477a9c633c0d4cabdc74d8c858"],["assets/images/480/8.jpg","02780f80c9daf11de15e387d773a4dd1"],["assets/images/480/8.webp","c2eb2522fa730a16a7713e03a22e59a5"],["assets/images/480/9.jpg","2078596f639e5da566d61337fba03411"],["assets/images/480/9.webp","9a9a0df29ad1e558173963625bb435c4"],["assets/images/640/1.jpg","abe21f3ea036611ff79c6c357bd82c97"],["assets/images/640/1.webp","d8f726420a77113bc558a76c09bab050"],["assets/images/640/10.jpg","3b1fb62b48cffc8ea7faa3ab1adcd240"],["assets/images/640/10.webp","952932beb71a510b089a69ce7f0db850"],["assets/images/640/2.jpg","7439fd40544b6afc5c78f94821b0e8b9"],["assets/images/640/2.webp","68ad031f95c7de3ac5d67bcb68217232"],["assets/images/640/3.jpg","64f3b38e7722f4d52be468609eecfe8e"],["assets/images/640/3.webp","eb63ec5ffd562a06b59ec7559b6b254f"],["assets/images/640/4.jpg","b8590af133517b72fc3c1bbe6dfadc66"],["assets/images/640/4.webp","3b0e0b13b05649fc73ec2de75f3716cd"],["assets/images/640/5.jpg","cef5a3a19276ca40d7446867e7acdb1d"],["assets/images/640/5.webp","0fdd0c4a08c10d91d033422e305e6a3c"],["assets/images/640/6.jpg","75a0c097a294c573cb33d5b4032210cf"],["assets/images/640/6.webp","74b57593a19e55c37c1abd5208554fe9"],["assets/images/640/7.jpg","7c89c17a1a9cef14c6ca23afd8957c86"],["assets/images/640/7.webp","7427d2b68126e149df81ac8a3a1056a1"],["assets/images/640/8.jpg","b473e1d404e158988d43d40ef62a1ac6"],["assets/images/640/8.webp","dd2e18fb37d93cce33e2b546f7919067"],["assets/images/640/9.jpg","73a9f30a8fe3c1ce917c43b99bf538c7"],["assets/images/640/9.webp","67f5c462f0b5582f7fe8248300a22792"],["assets/images/800/1.jpg","5f56779423cb076e6715ab3b316cea69"],["assets/images/800/1.webp","fd8759877013b4bcb9761875915ea1a7"],["assets/images/800/10.jpg","66dd08522d83aa7bccbcf176749a3a30"],["assets/images/800/10.webp","370c8d7024189e4dfc66036e8aaece03"],["assets/images/800/2.jpg","115a388609e72512336ce84a9dc50d67"],["assets/images/800/2.webp","ed15e50ec375a7edec16e5a783922abe"],["assets/images/800/3.jpg","a7ca1a51544c6700f796434f007917d2"],["assets/images/800/3.webp","c08ecea30ed4292d208ce48925caab84"],["assets/images/800/4.jpg","f8ab58414eef10e1d5719bbc6c9e3bde"],["assets/images/800/4.webp","a6f90512d07c0d5e9caf7b147b8fd366"],["assets/images/800/5.jpg","77eb65760d05df6cc42f8b94fdefc364"],["assets/images/800/5.webp","cb46d73bbbcdf036623f9176f9dbcfe0"],["assets/images/800/6.jpg","5696e729afff2302ca143f85105d0630"],["assets/images/800/6.webp","47d66590f489ef34861ab2814fb85492"],["assets/images/800/7.jpg","a340eff9b6858dea8eb292196797e66d"],["assets/images/800/7.webp","d3ba8862c6e27a34d7dab11536cce244"],["assets/images/800/8.jpg","f6bf6ae6b153cdd561811086377dd75a"],["assets/images/800/8.webp","5e5f18b0749b9cd197223e54c9f46701"],["assets/images/800/9.jpg","d4b9a6870bed8005ee3cb33e181ee368"],["assets/images/800/9.webp","b13289171b7dc4d8a5cad8f1bfca0c05"],["data/restaurants.json","4ba9d8355cee522235582ae2442e1c71"],["favicon.png","c2d2e8555efc218d60b704b47a3d6a1d"],["index.html","c440d317ff4ebd047277745f79fe9de9"],["manifest.json","bcd6571b8dc5adec6b9f641159339b09"],["restaurant.html","76041c324748a5322917e7dab7e83085"]];
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







