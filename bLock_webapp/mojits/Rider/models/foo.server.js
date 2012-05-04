/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('RiderModelFoo', function(Y, NAME) {

/**
 * The RiderModelFoo module.
 *
 * @module Rider
 */

    /**
     * Constructor for the RiderModelFoo class.
     *
     * @class RiderModelFoo
     * @constructor
     */
    Y.mojito.models[NAME] = {

        init: function(config) {
            this.config = config;
            
	        this.mongodb = require('mongodb');
            this.server = new this.mongodb.Server("localhost", 27017, {});

            this.db = new this.mongodb.Db('test', this.server, {});
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

	    getMap: function(callback) {
            callback(null, { some: 'data' });
        },

	    testMongo: function(callback) {
		    var self = this;
            this.db.open(function (error, client) {
                if (error) throw error;
                var collection = new self.mongodb.Collection(client, 'test');
                // debugger;
                collection.find({}, {safe: true},
                    function(err, object) {
                        // debugger;
                        if (err) console.warn("**************", err.message);
                        else {
                            object.toArray(function(err, docs) {
                                callback(null, docs);
                            });
                        }  // undefined if no matching object exists.
                    });
            });
	    },

        getLockValue: function(id, callback) {
            this.initializedIfNotSet();

            global.lockIterator++;
            console.warn("**************", global.lockIterator);
            callback( global.lockIterator % 2 == 0 );
        },

        setLockValue: function( id, callback ) {

        },

        /**
        * Fake singleton
        */
        initializedIfNotSet: function() {
            if( !global.lockIterator ) {
                global.lockIterator = 0;
            }
        }


    };

}, '0.0.1', {requires: []});
