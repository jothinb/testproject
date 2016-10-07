'use strict';


define(['jquery', 'contextmenu'], function ($) {

    describe('Provides a JQuery plugin', function(){

        it('should load the contextmenu plugin', function() {
            //console.log( "datapicker-test", $('*').datapicker);
            expect($('.contextmenu').contextmenu).not.to.equal(null);
            expect($('.contextmenu').contextmenu).not.to.equal(undefined);
        });

        it('should expose a contextmenu JQuery plugin', function() {
            expect($('.contextmenu').contextmenu).not.to.equal(null);
            expect($('.contextmenu').contextmenu).not.to.equal(undefined);
        });

    });

});