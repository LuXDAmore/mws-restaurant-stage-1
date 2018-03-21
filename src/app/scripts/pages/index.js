(
	function( window, document ) {

		'use strict';

		// Check the right page
		const IS_INDEX = window.location.href.indexOf( 'restaurant.html' ) === - 1;

		// Common vars
		let restaurants
			, neighborhoods
			, cuisines
			, map
			, markers = []
		;

		// Destructuring Self
		const self = { restaurants, neighborhoods, cuisines, map, markers };

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
		function ready() {

			window.removeEventListener( 'load', ready, false ); // --> Remove listener, no longer needed

			window.console.log( '%c RESTAURANT REVIEWS, ready to rock ✌️', 'color:#2980b9' );

			if( typeof GMapHelper !== 'undefined'
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
		if( IS_INDEX )
			window.addEventListener( 'load', ready, false );

		/**
		 * Fetch all neighborhoods and set their HTML.
		 */
		function fetchNeighborhoods() {

			DBHelper.fetchNeighborhoods(
				( error, neighborhoods ) => {

					// Got an error
					if( error )
						window.console.error( error );
					else {

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
					option.textContent = neighborhood;
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
			ul.textContent = '';

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

			DBHelper.lazyLoadImages();

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

			name.textContent = restaurant.name;
			li.append( name );

			const neighborhood = document.createElement( 'p' );

			neighborhood.textContent = restaurant.neighborhood;
			li.append( neighborhood );

			const address = document.createElement( 'p' );

			address.textContent = restaurant.address;
			li.append( address );

			const more = document.createElement( 'a' );

			more.textContent = 'View Details';
			more.title = 'Restaurant Details';
			more.rel = 'nooper';
			more.href = DBHelper.urlForRestaurant( restaurant );

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

	}
)( window, document )
