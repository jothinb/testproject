var expect = chai.expect;

define(['jquery', 'multi-step-navigation'], function ($) {

    describe('Provides a JQuery plugin', function(){
        it('should expose the multistep nav jQuery plugin', function() {
            expect($('*').multiStepNavigation).not.to.be.undefined;
        });

        it('should instantiate the multistep nav jQuery plugin', function() {
            expect($('<div></div>').multiStepNavigation()).not.to.be.undefined;
        });
    });

    describe('Provides an API', function(){
        before(function(){
            $('body').append(' \
                <div class="span10 multi-step-nav multi-step-navigation" data-option="test" > \
                    <div class="navbar"> \
                    <div class="navbar-inner"> \
                        <div class="container" > \
                            <ul> \
                                <li><a id="ex1" href="#tab1" data-toggle="tab" class= "tab"><i id="ex11" class="icon-circle-blank"></i> Step 1: Lorem ipsum dolor</a></li> \
                                <li><a id="ex2" href="#tab2" data-toggle="tab"><i id="ex21" class="icon-circle-blank"></i> Step 2: Sit amet adipiscing</a></li> \
                                <li><a id="ex3"  href="#tab3" data-toggle="tab"><i id="Ex31" class="icon-circle-blank"></i> Step 3: Consecteur etud</a></li> \
                            </ul> \
                        </div> \
                    </div> \
                    </div> \
                <div class="tab-content"> \
                    <div class="tab-pane" id="tab1"> \
                    Step 1 of 3 \
                    </div> \
                    <div class="tab-pane" id="tab2"> \
                    Step 2 of 3 \
                    </div> \
                    <div class="tab-pane" id="tab3"> \
                    Step 3 of 3 \
                    </div> \
                    <ul class="pager wizard"> \
                        <li class="previous"><a>Previous</a></li> \
                        <li id="next" class="next"><a>Next</a></li> \
                        <li class="next finish" style="display:none;"><a href="javascript:;">Finish</a></li> \
                    </ul> \
                </div> \
                </div>');
            $('.multi-step-nav').multiStepNavigation();
        });

        it('should allow next button click', function() {
            expect($('#next').trigger('click')).not.to.be.undefined;
        });

        it('should allow finish button click', function() {
            expect($('.multi-step-nav .finish').trigger('click')).not.to.be.undefined;
        });

        it('should act on clicking an a tag inside the nav, preventing default event behavior', function() {
            expect($('.multi-step-nav a').trigger('click')).not.to.be.undefined;
        });
    });
});
