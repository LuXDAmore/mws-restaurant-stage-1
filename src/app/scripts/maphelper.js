'use strict';

let setUp = false;

/**
 * Common gmaps helper functions.
 */
/* eslint-disable no-unused-vars */
class GMaps {
	/* eslint-enable no-unused-vars */

	/**
	 * Database URL.
	 * Change this to restaurants.json file location on your server.
	 */

	/**
	 * Fetch all restaurants.
	 */
	static load( apiKey, callBack, version, libraries, loadCn ) {

		if( typeof document === 'undefined' ) {

			// Do nothing if run from server-side
			return;

		};

		if( ! setUp ) {

			const googleMapScript = document.createElement( 'script' );

			let options = {}

			if( typeof apiKey === 'string' )
				options.key = apiKey
			else if( typeof apiKey === 'object' ) {

				for( let k in apiKey )
					options[ k ] = apiKey[ k ];

			} else
				throw new Error( 'apiKey should either be a string or an object' );


			// Libraries
			let librariesPath = '';

			if( libraries && libraries.length > 0 ) {

				librariesPath = libraries.join( ',' );
				options[ 'libraries' ] = librariesPath;

			} else if( Array.prototype.isPrototypeOf( options.libraries ) )
				options.libraries = options.libraries.join( ',' );

			options[ 'callback' ] = callBack;

			let baseUrl = 'https://maps.googleapis.com/';

			if( typeof loadCn === 'boolean' && loadCn === true )
				baseUrl = 'http://maps.google.cn/';

			let url = `${ baseUrl }maps/api/js?${
				Object
					.keys( options )
					.map( key => encodeURIComponent( key ) + '=' + encodeURIComponent( options[ key ] ) )
					.join( '&' )
			}`;

			if( version )
				url = url + '&v=' + version;

			googleMapScript.setAttribute( 'src', url );
			googleMapScript.setAttribute( 'async', '' );
			googleMapScript.setAttribute( 'defer', '' );
			document.body.appendChild( googleMapScript );

		} else
			throw new Error( 'You already started the loading of google maps' );

	};

};
