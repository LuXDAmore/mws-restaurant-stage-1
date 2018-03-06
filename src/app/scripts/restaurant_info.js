/* eslint-disable no-unused-vars */
let restaurant
	, map
;
/* eslint-enableno-unused-vars */

'use strict';

/**
 * Initialize Google map, called from HTML.
 */
window.initMapRestaurantInfo = () => {

	fetchRestaurantFromURL(
		( error, restaurant ) => {

			if( error ) // Got an error!
				window.console.error( error );
			else {

				const map = document.getElementById( 'map' );

				self.map = new google.maps.Map(
					map,
					{
						zoom: 16,
						center: restaurant.latlng,
						scrollwheel: false,
					}
				);
				google.maps.event.addListenerOnce(
					self.map,
					'idle',
					() => {

						const iframe = map.querySelector( 'iframe' );
						if( iframe )
							map.querySelector( 'iframe' ).title = 'Google maps';

					}
				);

				fillBreadcrumb();

				DBHelper.mapMarkerForRestaurant( self.restaurant, self.map );

			};

		}
	);

};

/**
 * Get current restaurant from page URL.
 */
function fetchRestaurantFromURL( callback ) {

	if( self.restaurant ) { // restaurant already fetched!

		callback( null, self.restaurant )
		return;

	};

	const id = getParameterByName( 'id' );

	if( ! id ) // no id found in URL
		callback( 'No restaurant id in URL', null );
	else {

		DBHelper.fetchRestaurantById(
			id,
			( error, restaurant ) => {

				self.restaurant = restaurant;
				if( ! restaurant ) {

					window.console.error( error );
					return;

				};
				fillRestaurantHTML();
				DBHelper.lazyLoadImages();

				callback( null, restaurant )

			}
		);

	};

};

/**
 * Create restaurant HTML and add it to the webpage
 */
function fillRestaurantHTML( restaurant = self.restaurant ) {

	const name = document.getElementById( 'restaurant-name' );
	name.innerHTML = restaurant.name;

	const address = document.getElementById( 'restaurant-address' );
	address.innerHTML = restaurant.address;

	const picture = document.getElementById( 'restaurant-img' );
	DBHelper.generateSourceInPicture( restaurant, picture );
	DBHelper.generateSourceInPicture( restaurant, picture, 'jpg' );

	// Fallback
	const image = document.createElement( 'img' );
	image.className = 'restaurant-img';
	image.alt = 'Restaurant Image';
	image.dataset.src = DBHelper.imageUrlForRestaurant( restaurant, 400 );
	picture.append( image );

	const cuisine = document.getElementById( 'restaurant-cuisine' );
	cuisine.innerHTML = restaurant.cuisine_type;

	// fill operating hours
	if( restaurant.operating_hours )
		fillRestaurantHoursHTML();

	// fill reviews
	fillReviewsHTML();

};

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
function fillRestaurantHoursHTML( operatingHours = self.restaurant.operating_hours ) {

	const hours = document.getElementById( 'restaurant-hours' );
	for( let key in operatingHours ) {

		const row = document.createElement( 'tr' );

		const day = document.createElement( 'td' );
		day.innerHTML = key;
		row.appendChild( day );

		const time = document.createElement( 'td' );
		time.innerHTML = operatingHours[ key ];
		row.appendChild( time );

		hours.appendChild( row );

	};

};

/**
 * Create all reviews HTML and add them to the webpage.
 */
function fillReviewsHTML( reviews = self.restaurant.reviews ) {

	const container = document.getElementById( 'reviews-container' );
	const title = document.createElement( 'h2' );
	title.innerHTML = 'Reviews';
	container.appendChild( title );

	if( ! reviews ) {

		const noReviews = document.createElement( 'p' );
		noReviews.innerHTML = 'No reviews yet!';
		container.appendChild( noReviews );
		return;

	};

	const ul = document.getElementById( 'reviews-list' );
	reviews.forEach( review => ul.appendChild( createReviewHTML( review ) ) );
	container.appendChild( ul );

};

/**
 * Create review HTML and add it to the webpage.
 */
function createReviewHTML( review ) {

	const li = document.createElement( 'li' );

	const title = document.createElement( 'p' );
	const name = document.createElement( 'strong' );
	name.innerHTML = review.name;
	title.appendChild( name );
	li.appendChild( title );

	const subtitle = document.createElement( 'p' );
	const info = document.createElement( 'small' );
	const date = document.createElement( 'em' );
	date.innerHTML = review.date;

	const rating = document.createElement( 'span' );
	rating.innerHTML = `Rating: ${ review.rating }`;

	info.appendChild( date );
	info.appendChild( rating );
	subtitle.appendChild( info );
	li.appendChild( subtitle );

	const comments = document.createElement( 'p' );
	comments.innerHTML = review.comments;
	li.appendChild( comments );

	return li;

};

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
function fillBreadcrumb( restaurant = self.restaurant ) {

	const breadcrumb = document.getElementById( 'breadcrumb' );
	const li = document.createElement( 'li' );
	li.innerHTML = restaurant.name;
	breadcrumb.appendChild( li );

}

/**
 * Get a parameter by name from page URL.
 */
function getParameterByName( name, url ) {

	if( ! url )
		url = window.location.href;

	name = name.replace( /[\[\]]/g, '\\$&' );

	const regex = new RegExp( `[?&]${name}(=([^&#]*)|&|#|$)` )
		, results = regex.exec( url )
	;

	if( ! results )
		return null;

	if( ! results[ 2 ] )
		return '';

	return decodeURIComponent( results[ 2 ].replace( /\+/g, ' ' ) );

};
