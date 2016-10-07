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
 * @class Unit test spec
 *
 * Use any Mocha (http://visionmedia.github.io/mocha/), Chai (http://chaijs.com/), or Sinon (http://sinonjs.org/) statements here
 *
 * @author Jeff Reichenberg
 *
 */
define(['jquery', 'slider'], function ($) {
    
    var _sliderDomStr = '<input class="slider" type="range" min="0" max="1000" value="500" data-slider-steps="1000" data-slider-highlight="red" data-slider-tickmarks="4" data-slider-scale="5" data-slider-label-position="left" data-slider-label-value="" data-slider-snap="true" data-slider-label-suffix=" Rpm" data-slider-button-position="together" />';

    describe('Provides a JQuery plugin', function(){

        it('should expose a slider JQuery plugin', function(){
            expect($('*').slider).to.exist;
        });

        it('should instance a slider', function(){
            var $dom = $('<input class="slider" type="range" min="0" max="500" value="150" />');
            $dom.slider();
            expect($dom.siblings('.slider')).to.have.lengthOf(1);
        });
    });

    describe('Slider creation with settings', function(){

        var slider, $dom;

        before(function() {
            $dom = $(_sliderDomStr);
        });

        it('should allow creation with settings', function(){
            expect( slider = $dom.slider( {
                onCreate: function() {},
                onChange: function(arg) {},
                onSlide: function() {},
                onStart: function() {},
                onStop: function() {}
            })).not.to.be.null
        });

    });

    describe('Exercise value changing API', function(){

        it('should increment the value', function(){
            var $dom = $(_sliderDomStr);
            $dom.slider();
            var slider = $dom.data('slider-object');
            slider.incrementValue();
            expect(slider.value).to.equal(501);
        });

        it('should decrement the value', function(){
            var $dom = $(_sliderDomStr);
            $dom.slider();
            var slider = $dom.data('slider-object');
            slider.decrementValue();
            expect(slider.value).to.equal(499);
        });

    });

    describe('Exercise callbacks', function() {

        var slider, $dom;

        var createSpy = sinon.spy();
        var startSpy = sinon.spy();
        var stopSpy = sinon.spy();
        var changeSpy = sinon.spy();

        before(function () {
            $dom = $(_sliderDomStr);
            $dom.slider({
                onCreate: createSpy,
                onChange: changeSpy,
                onStart: startSpy,
                onStop: stopSpy
            });
            slider = $dom.data('slider-object');
        });

        it('should call the create callback', function () {
            expect(createSpy.calledOnce).to.equal(true);
        });

        it('should call the change callback', function () {
            slider.incrementValue();
            expect(changeSpy.calledOnce).to.equal(true);
        });

        it('should call the start callback', function () {
            slider.trackDown({which: 1, clientX: 750, target: {}});
            expect(startSpy.calledOnce).to.equal(true);
        });

        it('should call the stop callback', function () {
            slider.trackUp({which: 1, clientX: 750, target: {}});
            expect(stopSpy.calledOnce).to.equal(true);
        });

    });

    describe('Exercise position calculation functions', function(){

        it('should return the correct ratio for a value', function(){
            var $dom = $(_sliderDomStr);
            $dom.slider();
            var slider = $dom.data('slider-object');
            var ratio = slider.getRatioFromValue(500);
            ratio = Math.ceil(ratio * 100) / 100; // need to round
            expect(ratio).to.equal(0.5);
        });

        it('should return the correct position for a ratio', function(){
            var $dom = $(_sliderDomStr);
            $('body').append($dom);//insert so it has a width
            $dom.slider();
            var slider = $dom.data('slider-object');
            expect(slider.getPositionFromRatio(0.5)).to.equal(192);
        });

        it('should return the correct position for a value', function(){
            var $dom = $(_sliderDomStr);
            $dom.slider();
            var slider = $dom.data('slider-object');
            expect(slider.getPositionFromValue(500)).to.equal(50);
        });

    });
});