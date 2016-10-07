define(['angular', 'angular-mocks'], function(angular) {
    describe('The SlugService', function() {
        var SlugService;

        beforeEach(module('predix.configurable-dashboard'));

        beforeEach(inject(function(_SlugService_) {
            SlugService = _SlugService_;
        }));

        it('doesnt change already slugified strings', function() {
            var b4 = 'my-slug-string';
            var aft = SlugService.makeAngularSlug(b4);
            expect(aft).toEqual('my-slug-string');
        });

        it('does change all underscores to hypens', function() {
            var b4 = 'my_slug_string';
            var aft = SlugService.makeAngularSlug(b4);
            expect(aft).toEqual('my-slug-string');
        });

        it('slugs a PascalCaseString', function() {
            var b4 = 'ThisIsPascalCaseIThink';
            var aft = SlugService.makeAngularSlug(b4);
            expect(aft).toEqual('this-is-pascal-case-i-think');
        });

        it('slugs a camelCaseString', function() {
            var b4 = 'tableDataOYEA';
            var aft = SlugService.makeAngularSlug(b4);
            expect(aft).toEqual('table-data-o-y-e-a');
        });

        it('converts all underscores and spaces to dashes', function() {
            var b4 = 'if-i_do this';
            var aft = SlugService.makeAngularSlug(b4);
            expect(aft).toEqual('if-i-do-this');
        });
    });
});