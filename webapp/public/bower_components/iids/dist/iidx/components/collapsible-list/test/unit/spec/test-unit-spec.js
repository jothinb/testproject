'use strict';


define(['jquery', 'collapsible-list'], function ($) {

    describe('Provides a JQuery plugin', function(){

        it('should load the collapsible-list plugin', function() {
            //console.log( "datapicker-test", $('*').datapicker);
            expect($('.collapsible-list')).not.to.equal(null);
            expect($('.collapsible-list')).not.to.equal(undefined);
        });
/*
        it('should expose a contextmenu JQuery plugin', function() {
            expect($('.collapsible-list').collapsible-list).not.to.equal(null);
            expect($('.collapsible-list').collapsible-list).not.to.equal(undefined);
        });
*/
    });

});