'use strict';

/*
 * Copyright (c) 2013 GE Global Research. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * GE Global Research. The software may be used and/or copied only
 * with the written permission of GE Global Research or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

/**
 * @class Unit test spec for toggle-switch.
 *
 * Use any Mocha (http://visionmedia.github.io/mocha/), Chai (http://chaijs.com/), or Sinon (http://sinonjs.org/) statements here
 *
 * @author Jeff Reichenberg
 *
 */
define(['jquery', 'toggle-switch'], function ($) {

    describe('Provides a JQuery plugin', function(){

        it('should load the bootstrap-switch plugin', function() {
            expect($('*').bootstrapSwitch).not.to.equal(null);
            expect($('*').bootstrapSwitch).not.to.equal(undefined);
        });

        it('should expose a toggleSwitch JQuery plugin', function() {
            expect($('*').toggleSwitch).not.to.equal(null);
            expect($('*').toggleSwitch).not.to.equal(undefined);
        });
    });

    describe('Init a toggle switch with options', function() {

        var tSwitch, $cb;

        before(function() {
            $cb = $('<input type="checkbox"/>');
            tSwitch = $cb.toggleSwitch();
        });

        it('should instance a toggle-switch', function() {
            expect(tSwitch).to.exist;
            expect(tSwitch.$switch).to.exist;
        });

        it('should toggle a toggle-switch', function() {
            tSwitch.$switch.setState(true);
            expect($cb.prop('checked')).to.equal(true);
        });
    });

});