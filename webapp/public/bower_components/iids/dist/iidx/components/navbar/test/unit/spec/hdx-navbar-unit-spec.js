var expect = chai.expect;

define(['jquery', 'navbar'], function ($) {

    describe('Provides a JQuery plugin', function(){
        it('should expose the navbar jQuery plugin', function() {
            expect($('*').navbar).not.to.be.undefined;
        });

        it('should instantiate the navbar jQuery plugin', function() {
            expect($('<div></div>').navbar()).not.to.be.undefined;
        });
    });

    describe('Provides an API', function(){
        it('should expose the navbar jQuery plugin', function() {
            expect($('').navbar).not.to.be.undefined;
        });

        it('should instantiate the navbar jQuery plugin', function() {
            expect($('<div></div>').navbar()).not.to.be.undefined;
        });
    });

    describe('Provides an API', function(){

        var nav;
        before(function(){
            $('body').append(' \
                <div class="navbar navbar-static-top"> \
                <div class="navbar-inner"> \
                <div class="container"> \
                    <a class="brand" href="#"><span class="ge-logo"></span> <span>My Application Lorem Ipsum Dolor<small><i>powered by</i> GE Business</small></span></a> \
                        <div class="primary-navbar nav-collapse collapse"> \
                            <div class="container"> \
                                <ul class="nav"> \
                                    <li><a href="#">Dashboard</a></li> \
                                    <li class="dropdown"> \
                                        <a class="dropdown-toggle" href="#" data-toggle="dropdown">Primary Nav 1 <i class="icon-chevron-down"></i></a> \
                                        <ul class="dropdown-menu pull-right"> \
                                            <li><a href="#">Secondary Nav 1</a></li> \
                                            <li><a href="#">Secondary Nav 2</a></li> \
                                            <li><a href="#">Secondary Nav 3</a></li> \
                                        </ul> \
                                    </li> \
                                    <li><a href="#">Primary Nav 2</a></li> \
                                    <li class="dropdown"><a class="dropdown-toggle" href="#" data-toggle="dropdown">Primary Nav 3 <i class="icon-chevron-down"></i></a> \
                                        <ul class="dropdown-menu mega-dropdown"> \
                                            <li> \
                                                <ul class="nav"> \
                                                    <li class="nav-header"><a href="#">Secondary Nav 1</a></li> \
                                                    <li> \
                                                        <ul class="nav mega-list"> \
                                                            <li><a href="#">Tertiary Nav 1</a></li> \
                                                        </ul> \
                                                    </li> \
                                                </ul> \
                                            </li> \
                                        </ul> \
                                    </li> \
                                    <li><a href="#">Primary Nav 4</a></li> \
                                </ul> \
                            </div> \
                        </div> \
                    </div> \
            ');
            nav = $('.navbar').navbar();
        });

        it('should allow resetting the search query', function() {
            expect( nav.data().navbar.resetSearchQuery()).to.be.undefined;
        });

        it('should allow adding the mega accordion', function() {
            expect( nav.data().navbar.addMegaAccordion()).to.be.undefined;
        });

        it('should allow clicking the mega accordion', function() {
            expect( $('.mega-dropdown .nav-header a').trigger('click.mega-accordion')).not.to.be.undefined;
        });

        it('should allow removing the mega accordion', function() {
            expect( nav.data().navbar.removeMegaAccordion()).to.be.undefined;
        });

        it('should allow adding responsive elements', function() {
            expect( nav.data().navbar.addResponsiveElements()).to.be.undefined;
        });

        it('should allow removing responsive elements', function() {
            expect( nav.data().navbar.removeResponsiveElements()).to.be.undefined;
        });

        it('should allow tablet responsiveness for tablet', function() {
            expect( nav.data().navbar.respondTablet()).to.be.undefined;
        });

        it('should allow tablet responsiveness for desktop', function() {
            expect( nav.data().navbar.respondDesktop()).to.be.undefined;
        });
    });
});
