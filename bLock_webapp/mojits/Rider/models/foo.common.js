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

		    Y.each(global.db, function(val) {
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
            this.initializedIfNotSet();
            callback( global.lockIterator % 2 == 0 );
        },

        /**
        * Fake singleton
        */
        initializedIfNotSet: function() {
            if( !global.lockIterator ) {
                global.lockIterator = 0;
            }

	        if( !global.db ) {
                this.initDb();
            }

        },

	    initDb: function() {
		    global.db = [{
                'name': {
                    first: 'brett',
                    last: 'mayen',
                    nickname: 'brettm'
                },

                bikes: [{
                    id: 0,
                    available: true,
                    trip_type: 'One Way',
                    unlock_code: '1eju2ewj45jfj3',
                    location: {
                        epicenter: {
                            lat: 70.759136,
                            long: -103.990262
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
                            lat: 60.759136,
                            long: -93.990262
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
                            lat: 50.759136,
                            long: -83.990262
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
                            lat: 60.759136,
                            long: -93.990262
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
