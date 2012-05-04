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

	        /*
	        this.mongodb = require('mongodb');
            this.server = new this.mongodb.Server("localhost", 27017, {});

            this.db = new this.mongodb.Db('test', this.server, {});
            */
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

		    this.initializedIfNotSet();

		    Y.each(this.getGlobal().db, function(val) {
			    Y.each(val.bikes, function(val) {
				    console.log(val);
	                bikes.push(val);
			    });
            });


		    callback(null, bikes);

		    /*
		    this.db.open(function (error, client) {
                if (error) throw error;
                var collection = new self.mongodb.Collection(client, 'posts');

                collection.find({}, {safe: true},
                    function(err, object) {
                        if (err) console.warn("**************", err.message);
                        else {
                            object.toArray(function(err, docs) {
                                callback(null, docs);
                            });
                        }  // undefined if no matching object exists.
                    });
            });
            */
        },

	    getBike: function(id, callback) {
            var self = this,
                bike;

            this.initializedIfNotSet();

            Y.each(this.getGlobal().db, function(val) {
                Y.each(val.bikes, function(val) {
	                if (val.id == id) {
	                    bike = val;
	                }
                });
            });

            callback(null, bike);
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

        getLockValue: function(id) {
            this.initializedIfNotSet();
            return this.getGlobal().lockIterator;
        },

        setLockValue: function( id, value ) {
            // TODO: SET VALUE FOR REAL
            this.initializedIfNotSet();
            this.getGlobal().lockIterator = value;
        },

	    reserve: function( id ) {
		    this.initializedIfNotSet();
		    this.getGlobal().db[0].activeBikeId = id;
		    console.log("****************", this.getGlobal().db[0]);
        },

        /**
        * Fake singleton
        */
        initializedIfNotSet: function() {
            if( !this.getGlobal().lockIterator ) {
                this.getGlobal().lockIterator = false;
            }

	        if( !this.getGlobal().db ) {
                this.initDb();
            }
        },

        /**
        * Simple wrapper to get global in node and browser
        */
        getGlobal: function() {
            return ( typeof window !== 'undefined' ) ? window : global;
        },

	    initDb: function() {
           this.getGlobal().db = [{
                'name': {
                    first: 'brett',
                    last: 'mayen',
                    nickname: 'brettm'
                },
 	            activeBikeId: 0,
                bikes: [{
                    id: 0,
                    available: true,
                    trip_type: 'One Way',
                    unlock_code: '1eju2ewj45jfj3',
                    location: {
                        epicenter: {
                            lat: 40.735226248609976,
                            long: -73.99094581604004
                        },
                        radius: 1000
                    },
                    deadline: 201336052351974,
                    current_location: {
                        lat: 1.02348,
                        long: 93.45573
                    }
                },{
                    id: 1,
                    available: true,
                    trip_type: 'Round Trip',
                    unlock_code: '1eju2ewj45jfj3',
                    location: {
                        epicenter: {
                            lat: 40.76520144280567,
                            long: -73.97953033447266
                        },
                        radius: 1000
                    },
                    deadline: 201336052351974,
                    current_location: {
                        lat: 8.02348,
                        long: 63.45573
                    }
                },{
                    id: 2,
                    available: true,
                    trip_type: 'Round Trip',
                    unlock_code: '1eju2ewj45jfj3',
                    location: {
                        epicenter: {
                            lat: 40.72501469240076,
                            long: -73.98141860961914
                        },
                        radius: 1000
                    },
                    deadline: 201336052351974,
                    current_location: {
                        lat: 6.02348,
                        long: 33.45573
                    }
                },{
                    id: 3,
                    available: true,
                    trip_type: 'One Way',
                    unlock_code: '1eju2ewj45jfj3',
                    location: {
                        epicenter: {
                            lat: 40.71206913039633,
                            long: -73.96425247192383
                        },
                        radius: 1000
                    },
                    deadline: 201336052351974,
                    current_location: {
                        lat: 25.02348,
                        long: 25.45573
                    }
                }]
            }];
	    }
    };


}, '0.0.1', {requires: []});
