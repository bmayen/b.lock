/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('Rider', function(Y, NAME) {

/**
 * The Rider module.
 *
 * @module Rider
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.mojito.controllers[NAME] = {

        init: function(config) {
            this.config = config;
        },

	    initMap: function(ac) {
            var self = this,
	            myOptions = {
	                center: new google.maps.LatLng(-34.397, 150.644),
	                zoom: 8,
	                mapTypeId: google.maps.MapTypeId.ROADMAP
	            };

		    ac.models.RiderModelFoo.getBikes(function(err, bikes) {
			    self.map = new google.maps.Map(Y.one('.map').getDOMNode(), myOptions);

                var bounds = new google.maps.LatLngBounds(), //  Create a new viewpoint bound
                    coords, marker, markerIdx, i;

                for (i = 0; i < bikes.length; ++i) {
                    coords = new google.maps.LatLng(event.data("lat"), event.data("lng"));
                    marker = new google.maps.Marker({
                        position: coords,
                        map: self.map
                    });

                    //  And increase the bounds to take this point
                    bounds.extend(coords);
                }

                //  Fit these bounds to the map
                self.map.fitBounds(bounds);
		    });
        }
    };

}, '0.0.1', {requires: ['mojito', 'RiderModelFoo']});
