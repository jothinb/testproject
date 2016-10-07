'use strict';

define(['node_modules/js-fixtures/fixtures', 'jquery', 'module'], function (fixtures, $, module) {
  describe('renders labels with different states', function(){
    var $$;
    before(function(done) {
        this.timeout(15000);
        var modbase = module.uri.substr(0, module.uri.indexOf("/test") );
        fixtures.path = modbase + '/test/fixtures/hdx';
        fixtures.load('labels-badges.html', function() {
            $('#' + fixtures.containerId).width('100%');
            $('#' + fixtures.containerId).height('100%');
            $('#' + fixtures.containerId).css({ opacity: 1 });
            // wait for require dependencies
            setTimeout(function(){
                $$ = fixtures.window().$;
                done();
            }, 1000);
        });
    });

    after(function(){
        // remove cleanup if you'd like to debug
        fixtures.cleanUp();
        fixtures.clearCache();
    });

    it('Should default with gray background', function() {
        expect( $$('.label')).to.not.be.undefined;
    });

    //Labels
    describe('----------Label Testcase1:Test label background color for different types of buttons', function(){
        it('label background is appropriate', function() {
        	expect( $$('.label').css('background-color')).to.equal('rgb(121, 121, 121)');
        	expect( $$('.label.label-inverse').css('background-color')).to.equal('rgb(243, 243, 243)');
        });
    });
    describe('----------Label Testcase2:Test label foreground color for different types of buttons', function(){
        it('label foreground is appropriate', function() {
        	expect( $$('.label').css('color')).to.equal('rgb(255, 255, 255)');
        	expect( $$('.label.label-success').css('color')).to.equal('rgb(255, 255, 255)');
        	expect( $$('.label.label-warning').css('color')).to.equal('rgb(255, 255, 255)');
        	expect( $$('.label.label-important').css('color')).to.equal('rgb(255, 255, 255)');
        	expect( $$('.label.label-info').css('color')).to.equal('rgb(255, 255, 255)');
        	expect( $$('.label.label-inverse').css('color')).to.equal('rgb(121, 121, 121)');
        });
    });
    //Badges
    describe('----------Badges Testcase1:Test badge background color for different types of buttons', function(){
        it('Badge background is appropriate', function() {
        	expect( $$('.badge').css('background-color')).to.equal('rgb(121, 121, 121)');
        	expect( $$('.badge.badge-inverse').css('background-color')).to.equal('rgb(243, 243, 243)');
        });
    });
    describe('----------Badges Testcase2:Test badge foreground color for different types of buttons', function(){
        it('Badge foreground is appropriate', function() {
        	expect( $$('.badge').css('color')).to.equal('rgb(255, 255, 255)');
        	expect( $$('.badge.badge-success').css('color')).to.equal('rgb(255, 255, 255)');
        	expect( $$('.badge.badge-warning').css('color')).to.equal('rgb(255, 255, 255)');
        	expect( $$('.badge.badge-important').css('color')).to.equal('rgb(255, 255, 255)');
        	expect( $$('.badge.badge-info').css('color')).to.equal('rgb(255, 255, 255)');
        	expect( $$('.badge.badge-inverse').css('color')).to.equal('rgb(121, 121, 121)');
        });
    });
    
  });

});
