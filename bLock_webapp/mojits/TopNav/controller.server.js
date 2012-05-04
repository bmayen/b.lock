/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('TopNav', function(Y, NAME) {

/**
 * The TopNav module.
 *
 * @module TopNav
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
	        var self = this;

            ac.models.TopNavModelFoo.getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.done({
                    testData: ac.params.params.body.testData,
                    data: data
                });
            });
        }
    };

}, '0.0.1', {requires: ['mojito', 'TopNavModelFoo']});
