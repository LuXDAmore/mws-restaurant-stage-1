'use strict';

/**
 * Common gmaps helper functions.
 */
/* eslint-disable no-unused-vars */
class GMapHelper {
	/* eslint-enable no-unused-vars */

	/**
	 * GMaps load function with config.
	 */
	static load( config = {} ) {

		if(
			typeof document === 'undefined'
			|| document.getElementById( 'google-maps-script' )
		) {

			// Do nothing if run from server-side or if script already founded
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
		GMapScript.async = true;
		GMapScript.defer = true;

		document.body.appendChild( GMapScript );

	};

	// Do this on every Maps Loaded event. --> Only to obtain more on Lighthouse.
	static mapsLoaded( map ) {

		const iframe = map.querySelector( 'iframe' );
		if( iframe )
			iframe.title = 'Google maps';

		// FIXME: Google maps doesn't matter about the 'rel' attribute
		// setTimeout(
		// 	() => {

		// 		const anchors = map.querySelectorAll( 'a' );
		// 		if( anchors )
		// 			anchors.forEach( anchor => anchor.rel = 'nooper' );

		// 	},
		// 	1000
		// )

	}

};
