'use strict';

define(['node_modules/js-fixtures/fixtures', 'jquery', 'module'], function (fixtures, $, module) {
  describe('renders input with round corners', function(){
    var $$;
    before(function(done) {
        this.timeout(15000);
        var modbase = module.uri.substr(0, module.uri.indexOf("/test") );
        fixtures.path = modbase + '/test/fixtures/hdx';
        fixtures.load('forms-controls.html', function() {
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

    it('----------Form controls Testcase1:input form should default with round corners', function() {
        expect( $$('.input-xlarge').css('border-top-left-radius')).to.equal('4px');
    });

    
  });
});
