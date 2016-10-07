'use strict';

define(['node_modules/js-fixtures/fixtures', 'jquery', 'module'], function (fixtures, $, module) {

  describe('renders input with normal state', function(){
    var $$;
    before(function(done) {
        this.timeout(15000);
        var modbase = module.uri.substr(0, module.uri.indexOf("/test") );
        fixtures.path = modbase + '/test/fixtures/hdx';
        fixtures.load('forms-states.html', function() {
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

    it('----------Form states Testcase1:Should default with normal state', function() {
        expect( $$('.input-sm')).to.not.be.undefined;
        expect( $$('.input-lg')).to.not.be.undefined;
    });
    
    it('----------Form states Testcase3:Should have correct styles in focussed state', function() {
        expect( $$('.input-sm.focused').css('border-bottom-color')).to.equal('rgb(0, 152, 214)');
        expect( $$('.input-sm.focused').css('color')).to.equal('rgb(19, 19, 19)');
    });

    it('----------Form states Testcase4:Should have correct styles in uneditable-input state', function() {
        expect( $$('.input-sm.uneditable-input').css('border-bottom-color')).to.equal('rgb(220, 220, 220)');
        expect( $$('.input-sm.uneditable-input').css('color')).to.equal('rgb(121, 121, 121)');
    });
    it('----------Form states Testcase5:Should have correct styles in disabled state', function() {
        expect( $$('.input-sm.disabled').css('opacity')).to.equal('0.6499999761581421');
    });

    it('----------Form states Testcase6:Should have correct styles for the control-group success', function() {
        expect( $$('.form-group.success input[type="text"]').css('border-bottom-color')).to.equal('rgb(107, 157, 0)');
        expect( $$('.form-group.success input[type="text"]').css('color')).to.equal('rgb(121, 121, 121)');
    });
    it('----------Form states Testcase7:Should have correct styles for the control-group warning', function() {
        expect( $$('.form-group.warning input[type="text"]').css('border-bottom-color')).to.equal('rgb(234, 118, 0)');
        expect( $$('.form-group.warning input[type="text"]').css('color')).to.equal('rgb(121, 121, 121)');
    });
    it('----------Form states Testcase8:Should have correct styles for the control-group error', function() {
        expect( $$('.form-group.error input[type="text"]').css('border-bottom-color')).to.equal('rgb(238, 54, 37)');
        expect( $$('.form-group.error input[type="text"]').css('color')).to.equal('rgb(121, 121, 121)');
    });

  });


});
