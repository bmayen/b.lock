/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('LenderBinderIndex', function(Y, NAME) {

/**
 * The LenderBinderIndex module.
 *
 * @module LenderBinderIndex
 */

    /**
     * Constructor for the LenderBinderIndex class.
     *
     * @class LenderBinderIndex
     * @constructor
     */
    Y.namespace('mojito.binders')[NAME] = {

        /**
         * Binder initialization method, invoked after all binders on the page
         * have been constructed.
         */
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;

	        this.mojitProxy.invoke('initMap', {params: {}}, function() {});
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
        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
