
'use strict';

define(['node_modules/js-fixtures/fixtures', 'jquery', 'module'], function (fixtures, $, module) {
  describe('Test Default Buttons UI', function () {

    var $$;
    before(function(done) {
        this.timeout(15000);
        var modbase = module.uri.substr(0, module.uri.indexOf("/test") );
        fixtures.path = modbase + '/test/fixtures/hdx';
        fixtures.load('defaultButtons.html', function() {
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


    describe('----------Default Button Testcase1: Test default button font size', function(){
        it('font size is 14px', function() {
             expect($$('.btn').css('font-size')).to.equal('14px');
        });
    });
    describe('----------Default Button Testcase2:Test default button background color for different types of buttons', function(){
        it('Default button background is appropriate', function() {
        	expect($$('.btn').css('background-color')).to.equal('rgb(243, 243, 243)');
	        expect($$('.btn.btn-primary').css('background-color')).to.equal('rgb(89, 89, 89)');
	        expect($$('.btn.btn-info').css('background-color')).to.equal('rgb(0, 152, 214)');
	        expect($$('.btn.btn-success').css('background-color')).to.equal('rgb(107, 157, 0)');
	        expect($$('.btn.btn-warning').css('background-color')).to.equal('rgb(234, 118, 0)');
	        expect($$('.btn.btn-danger').css('background-color')).to.equal('rgb(238, 54, 37)');
	        expect($$('.btn.btn-inverse').css('background-color')).to.equal('rgb(255, 255, 255)');
        });

    });
    describe('----------Default Button Testcase3:Test default button foreground color for different types of buttons', function(){
        it('Default Button foreground is appropriate', function() {
        	expect($$('.btn').css('color')).to.equal('rgb(121, 121, 121)');
            expect($$('.btn.btn-primary').css('color')).to.equal('rgb(255, 255, 255)');
            expect($$('.btn.btn-info').css('color')).to.equal('rgb(255, 255, 255)');
            expect($$('.btn.btn-success').css('color')).to.equal('rgb(255, 255, 255)');
            expect($$('.btn.btn-warning').css('color')).to.equal('rgb(255, 255, 255)');
            expect($$('.btn.btn-danger').css('color')).to.equal('rgb(255, 255, 255)');
        	expect($$('.btn.btn-inverse').css('color')).to.equal('rgb(121, 121, 121)');
        });
    });
    
    describe('----------Default Button Testcase4:Test mini button styles', function(){
        it('Mini button font-size is 10px and size is ', function() {
            expect($$('.btn.btn-xs').css('font-size')).to.equal('10px');
        });
    });
    describe('----------Default Button Testcase5:Test small button styles', function(){
        it('Small button font-size is 11px and size is ', function() {
            expect($$('.btn.btn-sm').css('font-size')).to.equal('12px');
        });
    });
    describe('----------Default Button Testcase6:Test large button styles', function(){
        it('Large button font-size is 19px and size is ', function() {
            expect($$('.btn.btn-lg').css('font-size')).to.equal('14px');
        });
    });
    
    //disabled styles
    describe('----------Default Button Testcase7:Test large button disabled styles', function(){
        it('Large button disabled has white foreground and background of darkgray', function() {
            expect($$('.btn.btn-lg.disabled').css('color')).to.equal('rgb(255, 255, 255)');
            expect($$('.btn.btn-lg.disabled').css('background-color')).to.equal('rgb(172, 172, 172)');
        });
    });
    
    //Button Groups
    
  });
});
