/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('RiderBinderBikeProfile', function(Y, NAME) {

/**
 * The RiderBinderIndex module.
 *
 * @module RiderBinderIndex
 */

    /**
     * Constructor for the RiderBinderIndex class.
     *
     * @class RiderBinderIndex
     * @constructor
     */
    Y.namespace('mojito.binders')[NAME] = {

        /**
         * Binder initialization method, invoked after all binders on the page
         * have been constructed.
         */
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function(node) {
	        var self = this;
            this.node = node;

		    Y.all('.reserve-btn').on('click', function(e) {
			    console.log(this.getAttribute('href'));
			    Y.io(this.getAttribute('href'), {
			        on: {success: function() { }}
			    });
			    e.preventDefault();
			    window.location = "/rider";
		    });
        }
    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});