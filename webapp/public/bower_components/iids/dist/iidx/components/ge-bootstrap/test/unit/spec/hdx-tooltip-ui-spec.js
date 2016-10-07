'use strict';

define(['node_modules/js-fixtures/fixtures', 'jquery', 'module'], function (fixtures, $, module) {

    describe('test fixture page should have right elements on it', function(done){
        var $$;
        before(function(done) {
            this.timeout(15000);
            var modbase = module.uri.substr(0, module.uri.indexOf("/test") );
            fixtures.path = modbase + '/test/fixtures/hdx';
            fixtures.load('tooltip.html', function() {
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
        describe('----------Tooltip Testcase1: jQuery should be on the test page', function(){
            it('$$ shouldnt be undefined', function(){
              expect($$).to.exist;
            });
          });
        describe('----------Tooltip Testcase2: Tooltip should be displayed at Top, Bottom, Right and Left placements', function () {
	        it('Renders Top tooltip with correct text', function() {
	           	expect($$('.topTooltip')).to.not.be.undefined;
	            expect($$('.topTooltip').text()).to.equal('Tooltip on top');
	        });

	        it('Renders Bottom tooltip with correct text', function() {
	           	expect($$('.bottomTooltip')).to.not.be.undefined;
	            expect($$('.bottomTooltip').text()).to.equal('Tooltip on bottom');
	        });
	        
	        it('Renders Right tooltip with correct text', function() {
	           	expect($$('.rightTooltip')).to.not.be.undefined;
	            expect($$('.rightTooltip').text()).to.equal('Tooltip on right');
	        });
	        
	        it('Renders Left tooltip with correct text', function() {
	           	expect($$('.leftTooltip')).to.not.be.undefined;
	            expect($$('.leftTooltip').text()).to.equal('Tooltip on left');
	            console.log('mylog:' + $$('.leftTooltip').text());
	        });
        });

	    describe("'----------Tooltip Testcase3: Tooltip should be displayed at Top placements", function () {    
	        it('Renders Top tooltip on mouse over', function() {
	            var tooltipObj = $$(".topTooltip");
	            tooltipObj.on('mouseover',function(){
	    			console.log('on mouseover cb');
	    			assert(true);
	    			
	    		}).mouseover();
	        });
	    });

	    describe("'----------Tooltip Testcase4: Tooltip should be displayed at Bottom placements", function () { 
	        it('Renders Bottom tooltip on mouse over', function() {
	            var tooltipObj = $$(".bottomTooltip");
	            tooltipObj.on('mouseover',function(){
	    			console.log('on mouseover cb');
	    			assert(true);
	    			
	    		}).mouseover();
	        });
	    });
    
	    describe("'----------Tooltip Testcase5: Tooltip should be displayed at Right placements", function () {    
	        it('Renders Right tooltip on mouse over', function() {
	            var tooltipObj = $$(".rightTooltip");
	            tooltipObj.on('mouseover',function(){
	    			console.log('on mouseover cb');
	    			assert(true);
	    			
	    		}).mouseover();
	        });
	    });

	    
	    describe("'----------Tooltip Testcase5: Tooltip should be displayed at Left placements", function () {    
	        it('Renders Left tooltip on mouse over', function() {
	            var tooltipObj = $$(".leftTooltip");
	            tooltipObj.on('mouseover',function(){
	    			console.log('on mouseover cb');
	    			assert(true);
	    			
	    		}).mouseover();
	        });
	    });
    
    });
});