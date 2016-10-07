define([ 'jquery', 'trays'], function ($) {

    describe('Provides a JQuery plugin', function(){
        it('should expose the spinner jQuery plugin', function() {
            expect($('*').iidsFilterTray).not.to.be.undefined;
        });
    });

    describe('Provides a tray', function(){
        it('should allow initiailization', function() {
            expect($('*').iidsFilterTray()).not.to.be.undefined;
        });
    });

    describe('Provides tray actions', function(){
        var tray, $cb;

        before(function() {
            $cb = $('<div class="tray filter-tray top collapse"><button type="button" class="btn-link" data-toggle="filter-rule-remove"></button><button type="button" class="btn-link" data-toggle="filter-rule-add"></button></div>');
            tray = $cb.iidsFilterTray();
        });

        it('should allow showing', function() {
            expect(tray.trigger('shown')).not.to.be.undefined;
        });

        it('should allow hiding', function() {
            expect(tray.trigger('hide')).not.to.be.undefined;
        });

        it('should allow its remove button to be clicked', function() {
            expect(tray.find('[data-toggle="filter-rule-remove"]').trigger('click')).not.to.be.undefined;
        });

        it('should allow its add button to be clicked', function() {
            expect(tray.find('[data-toggle="filter-rule-add"]').trigger('click')).not.to.be.undefined;
        });
    });
});
