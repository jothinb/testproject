'use strict';

define(['node_modules/js-fixtures/fixtures', 'jquery', 'module'], function (fixtures, $, module) {

    describe('test fixture page should have right elements on it', function(done){
        var $$;
        before(function(done) {
            this.timeout(15000);
            var modbase = module.uri.substr(0, module.uri.indexOf("/test") );
            fixtures.path = modbase + '/test/fixtures/hdx';
            fixtures.load('modals.html', function() {
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
        describe('----------Modal Testcase1: jQuery should be on the test page', function(){
            it('$$ shouldnt be undefined', function(){
              expect($$).to.exist;
            });
        });

        describe("----------Modal Testcase2: Modal text should be displayed", function () {
	        it('Renders Top tooltip with correct text', function() {
	           	expect($$('.btn .btn-primary')).to.not.be.undefined; 
	           	var $modalbtn = $$('[data-toggle="modal"]');
	  	      	expect( $modalbtn.text()).to.equal('Launch demo modal');
	        });
	    });

	    describe("----------Modal Testcase3: Modal should be displayed on button click", function () {    
	        it('Renders a modal dialog on button click', function() {
	           	var $modalbtn = $$('[data-toggle="modal"]');
	           	$modalbtn.on('click',function(){
	    			
    			var isHidden = $$('#myModal').hasClass('hide');
	            expect(isHidden).to.be.true;
    				    			
	    		}).click();
	        });
	    });

	        	
/*
        describe("Modal Tests", function () {
	        it('Should have Launch button on test fixture page', function(done) {
	            var $modalbtn = $$('[data-toggle="modal"]');
	            console.log('-->'+$modalbtn.text());
	      //      expect( $modalbtn.text()).to.equal('Launch demo modal');
	            
	            $modalbtn.trigger("click");
	            
	            var isHidden = $$('#myModal').hasClass('hide');
	            console.log('-->isHidden= '+isHidden);
	            expect(isHidden).to.be.true;
	        });
        });
        */
    });

});
