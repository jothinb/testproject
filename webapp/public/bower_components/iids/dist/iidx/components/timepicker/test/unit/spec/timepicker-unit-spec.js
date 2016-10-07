'use strict';

define([ 'jquery', 'timepicker' ], function ($, timepicker) {

    describe('Provides a JQuery plugin', function(){
        it('should expose the timepicker jQuery plugin', function() {
            expect($('*').timepicker).not.to.be.undefined;
        });

        it('should initialize', function() {
            expect($('<div class="input-append bootstrap-timepicker"><input id="timepicker1" type="text" class="input-small"><span class="add-on"><i class="icon-time"></i></span></div>').timepicker()).not.to.be.undefined;
        });
    });
});