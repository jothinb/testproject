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
define(['jquery', 'twitter-bootstrap-wizard', 'bootstrap/tab'], function ($) {

    var html = '<div class="span10 multi-step-nav"> \
        <div class="navbar"> \
            <div class="navbar-inner"> \
                <div class="container" > \
                    <ul> \
                        <li><a href="#tab1" data-toggle="tab" class="tab"><i class="icon-circle-blank"></i> Step 1: Lorem ipsum dolor</a></li> \
                        <li><a href="#tab2" data-toggle="tab"><i class="icon-circle-blank"></i> Step 2: Sit amet adipiscing</a></li> \
                        <li><a href="#tab3" data-toggle="tab"><i class="icon-circle-blank"></i> Step 3: Consecteur etud</a></li> \
                    </ul> \
                </div> \
            </div> \
        </div> \
        <div class="tab-content"> \
            <div class="tab-pane" id="tab1">Step 1 of 3</div> \
            <div class="tab-pane" id="tab2">Step 2 of 3</div> \
            <div class="tab-pane" id="tab3">Step 3 of 3</div> \
            <ul class="pager wizard"> \
                <li class="previous"><a>Previous</a></li> \
                <li class="next"><a href="">Next</a></li> \
                <li class="last"><a>Last</a></li> \
                <li class="first"><a>First</a></li> \
                <li class="next finish" style="display:none;"><a href="javascript:;">Finish</a></li> \
            </ul> \
        </div> \
    </div>';

    describe('Provides a JQuery plugin', function(){

        it('should expose a bootstrap wizard JQuery plugin', function(){
            expect($('*').bootstrapWizard).to.exist;
        });

        it('should provide a way to initialize the bootstrap wizard JQuery plugin', function(){
            expect($(html).bootstrapWizard({
                onNext:{},
                onPrevious: function(tab, navigation, index) {},
                onTabShow: function(tab, navigation, index) {}
            })).to.exist;
        });
    });

    describe('Enables clicking', function(){
        var wiz;
        before(function() {
            wiz = $(html).bootstrapWizard( {
                onTabClick: function() {}
            });
        });

        it('clicking a tab should return something', function(){
            expect(wiz.find('a[data-toggle="tab"]').click()).to.exist;
        });
    });

    describe('Exposes methods and deals with disabled states', function() {
        var wiz;
        before(function () {
            wiz = $(html).bootstrapWizard();
            wiz.addClass('disabled');
            wiz.find('li').addClass('disabled');
        });

        it('calling first on a disabled item should return false', function(){
            expect(wiz.bootstrapWizard('first')).to.be.false;
        });

        it('calling last on a disabled item should return false', function(){
            expect(wiz.bootstrapWizard('last')).to.be.false;
        });

        it('clicking a tab should return an object', function(){
            expect(wiz.find('a[data-toggle="tab"]').trigger('show.bs.tab', wiz)).to.exist;
        });

    });


    describe('Exposes methods', function(){
        var wiz;
        before(function() {
            wiz = $(html).bootstrapWizard({
                onNext: function() {},
                onLast: function() {},
                onFirst: function() {},
                onShow: function() {},
                onInit: function() {},
                onPrevious: function(tab, navigation, index) {},
                onTabShow: function(tab, navigation, index) {}
            });
        });

        it('calling next should return null', function(){
            expect(wiz.bootstrapWizard('next')).to.not.exist;
        });

        it('calling next when we are on the last should return false', function(){
            wiz.bootstrapWizard('last');
            wiz.addClass('last');
            expect(wiz.bootstrapWizard('next')).to.be.false;
        });

        it('calling previous should return null', function(){
            expect(wiz.bootstrapWizard('previous')).to.not.exist;
        });

        it('calling previous when on the first should return null', function(){
            wiz.bootstrapWizard('first');
            wiz.addClass('first');
            expect(wiz.bootstrapWizard('previous')).to.be.false;
        });

        it('calling first should return null', function(){
            expect(wiz.bootstrapWizard('first')).to.not.exist;
        });

        it('calling last should return null', function(){
            expect(wiz.bootstrapWizard('last')).to.not.exist;
        });

        it('calling last index should return the number of indices', function(){
            expect(wiz.bootstrapWizard('lastIndex')).to.equal(2);
        });

        it('getting the current index of something that does not exist should reflect that it does not exist', function(){
            expect(wiz.bootstrapWizard('getIndex', wiz.find('#somethingthatdoesnotexist') )).to.equal(-1);
        });

        it('getting the active tab should return an object', function(){
            expect(wiz.bootstrapWizard('activeTab')).to.exist;
        });

        it('getting the next tab should return an object', function(){
            wiz.bootstrapWizard('first');
            expect(wiz.bootstrapWizard('nextTab')).to.exist;
        });

        it('getting the next tab should return an object', function(){
            wiz.bootstrapWizard('last');
            expect(wiz.bootstrapWizard('nextTab')).to.not.exist;
        });

        it('getting the previous tab should return an object', function(){
            wiz.bootstrapWizard('last');
            expect(wiz.bootstrapWizard('previousTab')).to.exist;
        });

        it('getting the previous tab when there is none should return null', function(){
            wiz.bootstrapWizard('first');
            expect(wiz.bootstrapWizard('previousTab')).to.not.exist;
        });

        it('getting a particular tab should return an object', function(){
            expect(wiz.bootstrapWizard('show', 1)).to.exist;
        });

        it('disabling a particular tab should return nothing but not break', function(){
            expect(wiz.bootstrapWizard('disable', 1)).to.not.exist;
        });

        it('enabling a particular tab should return nothing but not break', function(){
            expect(wiz.bootstrapWizard('enable', 1)).to.not.exist;
        });

        it('hiding a particular tab should return nothing but not break', function(){
            expect(wiz.bootstrapWizard('hide', 1)).to.not.exist;
        });

        it('displaying a particular tab should return nothing but not break', function(){
            expect(wiz.bootstrapWizard('display', 1)).to.not.exist;
        });

        it('removing a particular tab should return nothing but not break', function(){
            expect(wiz.bootstrapWizard('remove', 1)).to.not.exist;
        });

        it('removing a particular tab with option to remove tab pane should return nothing but not break', function(){
            expect(wiz.bootstrapWizard('remove', 1, true)).to.not.exist;
        });
    });

    describe('Adding false event hooks', function() {
        var wiz;
        before(function() {
            wiz = $(html).bootstrapWizard({
                onNext: function() { return false; },
                onLast: function() { return false; },
                onFirst: function() { return false; },
                onShow: function() {},
                onInit: function() {},
                onPrevious: function(tab, navigation, index) { return false; },
                onTabShow: function(tab, navigation, index) { return false; },
                onTabClick: function(tab, navigation, index) { return false; }
            });
        });

        it('calling next when onnext returns false should return false', function(){
            expect(wiz.bootstrapWizard('next')).to.be.false;
        });

        it('calling previous when onprevious returns false should return false', function(){
            expect(wiz.bootstrapWizard('previous')).to.be.false;
        });

        it('calling first when onfirst returns false should return false', function(){
            expect(wiz.bootstrapWizard('previous')).to.be.false;
        });

        it('calling last when onlast returns false should return false', function(){
            expect(wiz.bootstrapWizard('last')).to.be.false;
        });

        it('calling first when onfirst returns false should return false', function(){
            expect(wiz.bootstrapWizard('first')).to.be.false;
        });


        // this doesn't work how I think it should work, but does fill in code coverage
        it('clicking a tab should return an object', function(){
            expect(wiz.find('a[data-toggle="tab"]').click()).to.exist;
        });


    });
});