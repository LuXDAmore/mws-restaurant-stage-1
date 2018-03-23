(
	function( window, navigator ) {

		'use strict';

		if( 'serviceWorker' in navigator
			&& (
				window.location.protocol === 'https:'
				|| window.location.href.indexOf( 'localhost:[SERVICE-WORKER-EXCLUDED-PORT]' ) === - 1
			)
		) {

			function serviceWorker() {

				window.removeEventListener( 'load', serviceWorker, false );

				navigator.serviceWorker
					.register(
						'[SERVICE-WORKER-NAME]',
						{
							scope: './'
						}
					)
					.then(
						function( registration ) {

							if( typeof registration.update === 'function' ) registration.update();

							registration.onupdatefound = function() {

								var installingWorker = registration.installing;

								/* TODO: Show a toast that informs to refresh the page */
								/* TODO: importScripts: Should i add ./node_modules/sw-toolbox/sw-toolbox.js ? npm install --save sw-toolbox */
								/* https://youtu.be/lXLKSJmLULM?t=2m36s */
								installingWorker.onstatechange = function() {

									switch( installingWorker.state ) {
										case 'installed':
											if( navigator.serviceWorker.controller ) window.console.info( 'New or updated content is available.' );
											else window.console.info( 'Content is cached, and will be available for offline use the next time the page is loaded.' );
										break;
										case 'redundant':
											window.console.error( 'The installing service worker became redundant.' );
										break;
									};

								};

							};

						}
					)
					.catch(
						function( e ) {

							window.console.error( 'Error during service worker registration:', e );

						}
					)
				;

			};

			window.addEventListener( 'load', serviceWorker, false );

		};

	}
)( window, navigator )
