'use strict';

/**
 * Common database helper functions.
 */
/* eslint-disable no-unused-vars */
class DBHelper {

	static restaurants = [];
	static isFetching = false;

	/* eslint-enable no-unused-vars */
	/**
	 * Database URL.
	 * Change this to restaurants.json file location on your server.
	 */
	static get DATABASE_URL() {

		return 'data/restaurants.json';

	};

	/**
	 * Fetch all restaurants.
	 */
	static fetchRestaurants( callback ) {

		if( this.isFetching || this.restaurants.length )
			callback( null, this.restaurants );
		else {

			this.isFetching = true;

			const xhr = new XMLHttpRequest();
			xhr.open( 'GET', DBHelper.DATABASE_URL );
			xhr.onload = () => {

				if( xhr.status === 200 ) { // Got a success response from server!

					const json = JSON.parse( xhr.responseText );
					this.restaurants = json.restaurants;

					callback( null, this.restaurants );

				} else { // Oops!. Got an error from server.

					const error = ( `Request failed. Returned status of ${xhr.status}` );
					callback( error, null );

				};

			};

			xhr.send();

		};

	};

	/**
	 * Fetch a restaurant by its ID.
	 */
	static fetchRestaurantById( id, callback ) {

		// fetch all restaurants with proper error handling.
		DBHelper.fetchRestaurants(
			( error, restaurants ) => {

				if( error )
					callback( error, null );
				else {

					const restaurant = restaurants.find( r => r.id == id );
					if( restaurant ) // Got the restaurant
						callback( null, restaurant );
					else // Restaurant does not exist in the database
						callback( 'Restaurant does not exist', null );

				}

			}
		);

	};

	/**
	 * Fetch restaurants by a cuisine type with proper error handling.
	 */
	static fetchRestaurantByCuisine( cuisine, callback ) {

		// Fetch all restaurants  with proper error handling
		DBHelper.fetchRestaurants(
			( error, restaurants ) => {

				if( error )
					callback( error, null );
				else {

					// Filter restaurants to have only given cuisine type
					const results = restaurants.filter( r => r.cuisine_type == cuisine );
					callback( null, results );

				};

			}
		);

	};

	/**
	 * Fetch restaurants by a neighborhood with proper error handling.
	 */
	static fetchRestaurantByNeighborhood( neighborhood, callback ) {

		// Fetch all restaurants
		DBHelper.fetchRestaurants(
			( error, restaurants ) => {

				if( error )
					callback( error, null );
				else {

					// Filter restaurants to have only given neighborhood
					const results = restaurants.filter( r => r.neighborhood == neighborhood );
					callback( null, results );

				};

			}
		);

	};

	/**
	 * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
	 */
	static fetchRestaurantByCuisineAndNeighborhood( cuisine, neighborhood, callback ) {

		// Fetch all restaurants
		DBHelper.fetchRestaurants(
			( error, restaurants ) => {

				if( error )
					callback( error, null );
				else {

					let results = restaurants
					if( cuisine != 'all' ) // filter by cuisine
						results = results.filter( r => r.cuisine_type == cuisine );


					if( neighborhood != 'all' ) // filter by neighborhoo
						results = results.filter( r => r.neighborhood == neighborhood );

					callback( null, results );

				}

			}
		);

	};

	/**
	 * Fetch all neighborhoods with proper error handling.
	 */
	static fetchNeighborhoods( callback ) {

		// Fetch all restaurants
		DBHelper.fetchRestaurants(
			( error, restaurants ) => {

				if( error )
					callback( error, null );
				else {

					// Get all neighborhoods from all restaurants
					const neighborhoods = restaurants.map( ( v, i ) => restaurants[ i ].neighborhood )
					// Remove duplicates from neighborhoods
					const uniqueNeighborhoods = neighborhoods.filter( ( v, i ) => neighborhoods.indexOf( v ) == i )
					callback( null, uniqueNeighborhoods );

				}

			}
		);

	};

	/**
	 * Fetch all cuisines with proper error handling.
	 */
	static fetchCuisines( callback ) {

		// Fetch all restaurants
		DBHelper.fetchRestaurants(
			( error, restaurants ) => {

				if( error )
					callback( error, null );
				else {

					// Get all cuisines from all restaurants
					const cuisines = restaurants.map( ( v, i ) => restaurants[ i ].cuisine_type )
					// Remove duplicates from cuisines
					const uniqueCuisines = cuisines.filter( ( v, i ) => cuisines.indexOf( v ) == i )
					callback( null, uniqueCuisines );

				}

			}
		);

	};

	/**
	 * Restaurant page URL.
	 */
	static urlForRestaurant( restaurant ) {

		return ( `restaurant.html?id=${ restaurant.id }` );

	};

	/**
	 * Create srcSet of images in Picture.
	 */
	static generateSourceInPicture(
		restaurant,
		picture,
		type = 'webp',
		element = 'source',
		length = 4,
		retina = false
	) {

		for( let i = 0; i <= ( length - 1 ); i ++ ) {

			const source = document.createElement( element );

			let media = 400
				, srcset = ''
			;
			switch( i ) {
				case 0:
					media = 800;
				break;
				case 1:
					media = 480;
				break;
				case 3:
					media = 320;
				break;
			}

			srcset = DBHelper.imageUrlForRestaurant( restaurant, media, type );
			if( retina )
				srcset += ` 1x, ${ DBHelper.imageUrlForRestaurant( restaurant, media * 2, type ) }`;

			source.media = `(min-width: ${ media }px)`;
			source.type = `image/${ type }`;
			source.dataset.srcset = srcset;

			picture.append( source );

		};

	};

	/**
	 * Start the Lazy Loading of images
	 */
	static lazyLoadImages() {

		if( typeof LazyLoad !== 'undefined' ) {

			new LazyLoad(
				{
					elements_selector: '.restaurant-img',
				}
			);

		};

	};

	/**
	 * Restaurant image URL.
	 */
	static imageUrlForRestaurant( restaurant, size = 400, extension = '' ) {

		const filename = extension ? restaurant.photograph.replace( 'jpg', extension ) : restaurant.photograph;

		return ( `assets/images/${ size }/${ filename }` );

	};

	/**
	 * Map marker for a restaurant.
	 */
	static mapMarkerForRestaurant( restaurant, map ) {

		const marker = new google.maps.Marker(
			{
				position: restaurant.latlng,
				title: restaurant.name,
				url: DBHelper.urlForRestaurant( restaurant ),
				map: map,
				animation: google.maps.Animation.DROP
			}
		);
		return marker;

	};

}
