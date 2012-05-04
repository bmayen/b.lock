/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('Lender', function(Y, NAME) {

/**
 * The Lender module.
 *
 * @module Lender
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
            ac.models.LenderModelFoo.getBikes(function(err, bikes) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.composite.done({
	                template: {
                        ns_class: "lender index",
                        bikes: bikes
                    }
                });
            });


        },

	    /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        bikeStats: function(ac) {
            ac.models.LenderModelFoo.getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.composite.done({
	                template: {ns_class: "lender bike-stats"}
                });
            });
        },

	    bikeRegister: function(ac) {
            ac.models.LenderModelFoo.getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.composite.done({
                    template: {ns_class: "lender bike-register"}
                });
            });
        }
    };

}, '0.0.1', {requires: ['mojito', 'LenderModelFoo']});
