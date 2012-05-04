/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('LenderModelFoo', function(Y, NAME) {

/**
 * The LenderModelFoo module.
 *
 * @module Lender
 */

    /**
     * Constructor for the LenderModelFoo class.
     *
     * @class LenderModelFoo
     * @constructor
     */
    Y.mojito.models[NAME] = {

        init: function(config) {
            this.config = config;
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @param callback {function(err,data)} The callback function to call when the
         *        data has been retrieved.
         */
        getData: function(callback) {
            callback(null, { some: 'data' });
        },

	    getBikes: function(callback) {
            var self = this,
                bikes = [];

		    console.log(global.db);

            Y.each(global.db, function(val) {
                Y.each(val.bikes, function(val) {
                    console.log(val);
                    bikes.push(val);
                });
            });

            callback(null, bikes);
	    }

    };

}, '0.0.1', {requires: []});
