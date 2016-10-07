var expect = chai.expect;

define(['jquery', 'module', 'jumpnav'], function ($) {

    describe('Provides a JQuery plugin', function(){
        it('should expose the jumpnav jQuery plugin', function() {
            expect($('*').jumpnav).not.to.be.undefined;
        });

        it('should instantiate the jumpnav jQuery plugin', function() {
            $('body').append('<div class="span12 jumpnav"></div>');
            expect($('*').jumpnav()).not.to.be.undefined;
        });
    });

    describe('Responds to events', function(){
        before(function(){
            $('body').append('<div class="span12 jumpnav"><ul class="clearfix nav"><li><a href="#overview">Overview</a></li></ul></div><div><div class="jumpcontent"><div id="overview" class="block"><h2 class="voice-brand">Overview</h2></div>');
            $('.jumpnav').jumpnav();
        });

        it('should update the scroll', function() {
            expect($( window ).trigger('scroll')).to.not.be.empty;
        });

        it('should load', function() {
            expect($( window ).trigger('load')).to.not.be.empty;
        });

        it('should offer hash change handler', function() {
            window.location.hash = '#overview'
            expect($( window ).trigger('hashchange')).to.not.be.empty;
        });

    });

    describe('Is Clickable', function(){
        before(function(){
            $('body').append('<div class="span12 jumpnav"><ul class="clearfix nav"><li><a href="#overview">Overview</a></li></ul></div><div><div class="jumpcontent"><div id="overview" class="block"><h2 class="voice-brand">Overview</h2></div>');
            $('.jumpnav').jumpnav();
        });

        it('should be clickable', function() {
            expect($('.jumpnav a').click().length).to.equal(2);
        });
    });

    describe('Has defaults', function(){
        it('should not exclude tablet', function() {
            expect($('*').jumpnav.defaults.excludes.tablet).to.equal(false);
        });

        it('should not exclude phone', function() {
            expect($('*').jumpnav.defaults.excludes.phone).to.equal(false);
        });
    });
});
