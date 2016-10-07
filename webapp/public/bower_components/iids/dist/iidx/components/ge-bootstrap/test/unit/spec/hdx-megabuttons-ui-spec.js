'use strict';

define(['node_modules/js-fixtures/fixtures', 'jquery', 'module'], function (fixtures, $, module) {

    describe('Test mega button font size', function(){
        var $$;
        before(function(done) {
            this.timeout(15000);
            var modbase = module.uri.substr(0, module.uri.indexOf("/test") );
            fixtures.path = modbase + '/test/fixtures/hdx';
            fixtures.load('megaButtons.html', function() {
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

        after(function(done){
            // remove cleanup if you'd like to debug
            fixtures.cleanUp();
            fixtures.clearCache();
            done();
        });
        
        describe('----------Mega Buttons Testcase1:Test mega button font size', function(){
	        it('Mega button font size is 17px', function() {
	          expect($$('.btn-mega').css('font-size')).to.equal('17px');
	        });
	    });

        describe('----------Mega Buttons Testcase2:Test mega button background color for different types of buttons', function(){
		    it('Mega button background is white', function() {
		    	expect($$('.btn.btn-mega').css('background-color')).to.equal('rgb(255, 255, 255)');
		        expect($$('.btn.btn-mega.btn-success').css('background-color')).to.equal('rgb(255, 255, 255)');
		        expect($$('.btn.btn-mega.btn-warning').css('background-color')).to.equal('rgb(255, 255, 255)');
		        expect($$('.btn.btn-mega.btn-danger').css('background-color')).to.equal('rgb(255, 255, 255)');
		    });
        });
        
        describe('----------Mega Buttons Testcase3:Test mega button foreground color for different types of buttons', function(){
            it('Mega Button foreground is appropriate', function() {
            	expect($$('.btn.btn-mega').css('color')).to.equal('rgb(121, 121, 121)');
                expect($$('.btn.btn-mega.btn-success').css('color')).to.equal('rgb(107, 157, 0)');
                expect($$('.btn.btn-mega.btn-warning').css('color')).to.equal('rgb(234, 118, 0)');
                expect($$('.btn.btn-mega.btn-danger').css('color')).to.equal('rgb(238, 54, 37)');
            });
        });
        
        describe('----------Mega Buttons Testcase4:Test disabled Mega button styles', function(){
            it('Mega button opacity for disabled button is 0.5', function() {
            	expect($$('.btn.btn-mega.disabled').css('opacity')).to.equal('0.5');
            	expect($$('.btn.btn-mega.disabled').css('border-bottom-color')).to.equal('rgb(220, 220, 220)');       	
            });
        });
       
    });



});
