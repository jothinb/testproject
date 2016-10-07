'use strict';


define(['jquery', 'datepicker'], function ($) {

    describe('Provides a JQuery plugin', function(){

        it('should load the datapicker plugin', function() {
            //console.log( "datapicker-test", $('*').datapicker);
            expect($('.datepicker').datepicker).not.to.equal(null);
            expect($('.datepicker').datepicker).not.to.equal(undefined);
        });

        it('should expose a datapicker JQuery plugin', function() {
            expect($('.datepicker').datepicker).not.to.equal(null);
            expect($('.datepicker').datepicker).not.to.equal(undefined);
        });

    });

});