var expect = chai.expect;

define(['jquery', 'modules'], function ($) {

    describe('Provides a JQuery plugin', function(){
        it('should expose the modules jQuery plugin', function() {
            expect($('*').collapsible).not.to.be.undefined;
        });

        it('should instantiate the modules jQuery plugin', function() {
            expect($('*').collapsible()).not.to.be.undefined;
        });
    });

    describe('Provides an API', function(){
        before(function(){
            $('body').append(' \
                <section class="module actionable"> \
                <header class="module-header"> \
                <div class="btn-group pull-right"> \
                    <button class="btn dropdown-toggle btn-mini" data-toggle="dropdown"><i class="icon-chevron-down"></i></button> \
                    <ul class="dropdown-menu"> \
                        <li><a href="#">Action</a></li> \
                        <li><a href="#">Another action</a></li> \
                        <li><a href="#">Something else here</a></li> \
                        <li class="divider"></li> \
                        <li><a href="#">Separated link</a></li> \
                    </ul> \
                </div> \
            Header \
            </header> \
            <div class="module-body in">Body</div> \
            <footer class="module-footer">Footer</footer> \
            </section>');

            $('.module.actionable').collapsible();
        });

        it('should allow show through header click', function() {
            expect($('.module.actionable').find('.module-header').trigger('click')).not.to.be.undefined;
        });

        it('should allow hide through header click', function() {
            expect($('.module.actionable').find('.module-header').trigger('click')).not.to.be.undefined;
        });

        it('should stop propogation of events when header a tag click', function() {
            expect($('.module.actionable').find('.module-header a').trigger('click')).not.to.be.undefined;
        });
    });
});
