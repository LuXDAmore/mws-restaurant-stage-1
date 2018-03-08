'use strict';


/**
 * Common gmaps helper functions.
 */
/* eslint-disable no-unused-vars */
class GMapHelper {
	/* eslint-enable no-unused-vars */

	/**
	 * Database URL.
	 * Change this to restaurants.json file location on your server.
	 */

	/**
	 * Fetch all restaurants.
	 */
	static load( config = {} ) {

		if(
			typeof document === 'undefined'
			|| document.getElementById( 'google-maps-script' )
		) {

			// Do nothing if run from server-side
			return;

		};

		const default_config = {
			key: 'AIzaSyBG8LXp4osGIgtI1SxUafmy6fPsgMq414c',
			libraries: 'places',
			callback: '',
		};

		const options = Object.assign(
			{},
			default_config,
			config
		);

		let url = `https://maps.googleapis.com/maps/api/js?${
			Object
				.keys( options )
				.map( key => encodeURIComponent( key ) + '=' + encodeURIComponent( options[ key ] ) )
				.join( '&' )
		}`;

		const GMapScript = document.createElement( 'script' );

		GMapScript.id = 'google-maps-script';
		GMapScript.src = url;
		GMapScript.async = '';
		GMapScript.defer = '';

		document.body.appendChild( GMapScript );

	};

};
