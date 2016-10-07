define([ 'jquery', 'spinner'], function ($) {

    describe('Provides a JQuery plugin', function(){
        it('should expose the spinner jQuery plugin', function() {
            expect($('*').spin).not.to.be.undefined;
        });
    });

    describe('Provides a spinner', function(){
        it('should allow initiailization', function() {
            expect($('*').spin()).not.to.be.undefined;
        });

        it('should allow initiailization with options', function() {
            expect($('*').spin({'lines': 10})).not.to.be.undefined;
        });
    });
});
