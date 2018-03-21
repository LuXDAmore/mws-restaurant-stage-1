'use strict';

/* eslint-disable no-unused-vars */
let restaurants
	, neighborhoods
	, cuisines
	, map
	, markers = []
;
/* eslint-enable no-unused-vars */

const IS_INDEX = window && window.location.href.indexOf( 'restaurant.html' ) === - 1;

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {

	const map = document.getElementById( 'map' );

	let loc = {
		lat: 40.722216,
		lng: - 73.987501,
	};

	self.map = new google.maps.Map(
		map,
		{
			zoom: 12,
			center: loc,
			scrollwheel: false,
		}
	);

	google.maps.event.addListenerOnce(
		self.map,
		'idle',
		() => GMapHelper.mapsLoaded( map )
	);

	updateRestaurants();

};

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
const ready = function() {

	if(
		IS_INDEX
		&& typeof GMapHelper !== 'undefined'
		&& typeof DBHelper !== 'undefined'
	) {

		DBHelper.fetchRestaurants(
			() => {

				fetchNeighborhoods();
				fetchCuisines();

			}
		);

		GMapHelper.load(
			{
				callback: 'initMap',
			}
		);

	};

};
// document.addEventListener( 'DOMContentLoaded', ready, false );
ready();

/**
 * Fetch all neighborhoods and set their HTML.
 */
function fetchNeighborhoods() {

	DBHelper.fetchNeighborhoods(
		( error, neighborhoods ) => {

			if( error ) { // Got an error

				window.console.error( error );

			} else {

				self.neighborhoods = neighborhoods;
				fillNeighborhoodsHTML();

			};

		}
	);

};

/**
 * Set neighborhoods HTML.
 */
function fillNeighborhoodsHTML( neighborhoods = self.neighborhoods ) {

	const select = document.getElementById( 'neighborhoods-select' );
	neighborhoods.forEach(
		neighborhood => {

			const option = document.createElement( 'option' );
			option.innerHTML = neighborhood;
			option.value = neighborhood;
			select.append( option );

		}
	);

};

/**
 * Fetch all cuisines and set their HTML.
 */
function fetchCuisines() {

	DBHelper.fetchCuisines(
		( error, cuisines ) => {

			// Got an error!
			if( error )
				window.console.error( error );
			else {

				self.cuisines = cuisines;
				fillCuisinesHTML();

			};

		}
	);

};

/**
 * Set cuisines HTML.
 */
function fillCuisinesHTML( cuisines = self.cuisines ) {

	const select = document.getElementById( 'cuisines-select' );

	cuisines.forEach(
		cuisine => {

			const option = document.createElement( 'option' );
			option.innerHTML = cuisine;
			option.value = cuisine;
			select.append( option );

		}
	);

};

/**
 * Update page and map for current restaurants.
 */
function updateRestaurants() {

	const cSelect = document.getElementById( 'cuisines-select' );
	const nSelect = document.getElementById( 'neighborhoods-select' );

	const cIndex = cSelect.selectedIndex;
	const nIndex = nSelect.selectedIndex;

	const cuisine = cSelect[ cIndex ].value;
	const neighborhood = nSelect[ nIndex ].value;

	DBHelper.fetchRestaurantByCuisineAndNeighborhood(
		cuisine,
		neighborhood,
		( error, restaurants ) => {

			// Got an error!
			if( error )
				window.console.error( error );
			else {

				resetRestaurants( restaurants );
				fillRestaurantsHTML();

			};

		}
	);

};

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
function resetRestaurants( restaurants ) {

	// Remove all restaurants
	self.restaurants = [];
	const ul = document.getElementById( 'restaurants-list' );
	ul.innerHTML = '';

	// Remove all map markers
	self.markers.forEach( m => m.setMap( null ) );
	self.markers = [];
	self.restaurants = restaurants;

};

/**
 * Create all restaurants HTML and add them to the webpage.
 */
function fillRestaurantsHTML( restaurants = self.restaurants ) {

	const ul = document.getElementById( 'restaurants-list' );

	restaurants.forEach( restaurant => ul.append( createRestaurantHTML( restaurant ) ) );

	// DBHelper.lazyLoadImages();

	addMarkersToMap();

};

/**
 * Create restaurant HTML.
 */
function createRestaurantHTML( restaurant ) {

	const li = document.createElement( 'li' );

	const picture = document.createElement( 'picture' );
	li.append( picture );

	DBHelper.generateSourceInPicture( restaurant, picture );
	DBHelper.generateSourceInPicture( restaurant, picture, 'jpg' );

	// Fallback
	const image = document.createElement( 'img' );
	image.className = 'restaurant-img';
	image.alt = 'Restaurant Image';
	image.dataset.src = DBHelper.imageUrlForRestaurant( restaurant, 400 );
	picture.append( image );

	// Title
	const name = document.createElement( 'h1' );
	name.innerHTML = restaurant.name;
	li.append( name );

	const neighborhood = document.createElement( 'p' );
	neighborhood.innerHTML = restaurant.neighborhood;
	li.append( neighborhood );

	const address = document.createElement( 'p' );
	address.innerHTML = restaurant.address;
	li.append( address );

	const more = document.createElement( 'a' );
	more.innerHTML = 'View Details';
	more.href = DBHelper.urlForRestaurant( restaurant );
	more.rel = 'nooper';
	more.title = 'Restaurant Details';
	li.append( more );

	return li;

};

/**
 * Add markers for current restaurants to the map.
 */
function addMarkersToMap( restaurants = self.restaurants ) {

	restaurants.forEach(
		restaurant => {

			// Add marker to the map
			const marker = DBHelper.mapMarkerForRestaurant( restaurant, self.map );
			google.maps.event.addListener(
				marker,
				'click',
				() => window.location.href = marker.url
			);
			self.markers.push( marker );

		}
	);

};
