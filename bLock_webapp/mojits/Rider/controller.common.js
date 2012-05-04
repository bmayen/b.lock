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

	            console.log("*************************", bikes);

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
            ac.models.RiderModelFoo.getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.composite.done({
	                template: {ns_class: "rider bike-profile"}
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

            ac.models.RiderModelFoo.testMongo(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }

                ac.params.params.body.navClass = 'test data';

                ac.done({
                });
            });
            // ac.models.RiderModelFoo.getBikeStatus(function(err, data){
            //     if (err) {
            //         ac.error(err);
            //         return;
            //     }
            //     ac.composite.done({
            //         template: {ns_class: "rider bike-reviews"}
            //     });
            // });
        },

	    /** HELPERS **/
	    showMap: function(filters) {

	    }
    };

}, '0.0.1', {requires: ['mojito', 'RiderModelFoo']});
