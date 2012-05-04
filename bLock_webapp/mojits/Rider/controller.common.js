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

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
            ac.models.RiderModelFoo.getBikes(function(err, bikes) {
                if (err) {
                    ac.error(err);
                    return;
                }

	            ac.params.params.body.navClass = 'test data';

                ac.composite.done({
                    template: {
	                    ns_class: "rider index",
	                    bikes: bikes
                    }
                });
            });


        },

	    /**
         * Method corresponding to the 'bike profile' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        bikeProfile: function(ac) {
		    var id = ac.params.getFromRoute().id;

            ac.models.RiderModelFoo.getBike(id, function(err, bike) {
                if (err) {
                    ac.error(err);
                    return;
                }

                ac.composite.done({
	                template: {
		                ns_class: "rider bike-profile",
	                    bike: bike
	                }
                });
            });
        },

	    /**
         * Method corresponding to the 'bike profile' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        bikeReviews: function(ac) {
            ac.models.RiderModelFoo.getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.composite.done({
	                template: {ns_class: "rider bike-reviews"}
                });
            });
        },

        /**
         * Retrieve the status of a lock
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        getLockValue: function(ac) {
            var self = this;
            var id = ac.params.getFromRoute().id;
            var lockValue = ac.models.RiderModelFoo.getLockValue( id );
            ac.done( lockValue ? "{1}" : "{0}" );
        },

        /**
         * Retrieve the status of a lock
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        setLockValueTrue: function(ac) {
            var self = this;
            id = ac.params.getFromRoute().id;
            ac.models.RiderModelFoo.setLockValue( id, true );
            ac.done( 'true' );
        },

        /**
         * Retrieve the status of a lock
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        setLockValueFalse: function(ac) {
            var self = this;
            var id = ac.params.getFromRoute().id;
            ac.models.RiderModelFoo.setLockValue( id, false );
            ac.done( 'false' );
        },

        /**
         * Retrieve the status of a lock
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        getActiveBike: function(ac) {
            var self = this;
            var user_id = ac.params.getFromRoute().id;
            var bike_id = ac.models.RiderModelFoo.getActiveBike( user_id );
            ac.done( String( bike_id ) );
        },

	    reserve: function(ac) {
            debugger;
		    var self = this;
            var id = ac.params.getFromRoute().id;
            ac.models.RiderModelFoo.reserve( id, false );
            ac.done( 'false' );
	    }
    };

}, '0.0.1', {requires: ['mojito', 'RiderModelFoo']});
