/**
 * Copyright 2015 Google Inc. All rights reserved.
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

'use strict';

if( 'serviceWorker' in navigator
	&& window.location.protocol === 'https:'
	&& [ 'localhost', '127' ].indexOf( window.location.hostname ) === - 1
) {

	window.addEventListener(
		'load',
		function() {

			navigator.serviceWorker
				.register( 'sw.js' )
				.then(
					function( registration ) {

						if( typeof registration.update == 'function' )
							registration.update();

						registration.onupdatefound = function() {

							var installingWorker = registration.installing;

							installingWorker.onstatechange = function() {

								switch( installingWorker.state ) {
									case 'installed':
										if( navigator.serviceWorker.controller )
											window.console.info( 'New or updated content is available.' );
										else
											window.console.info( 'Content is cached, and will be available for offline use the next time the page is loaded.' );
									break;
									case 'redundant':
										window.console.error( 'The installing service worker became redundant.' );
									break;
								};

							};

						};

					}
				).catch(
					function( e ) {

						window.console.error( 'Error during service worker registration:', e );

					}
				)
			;

		}
	);

};
