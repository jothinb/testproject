var expect = chai.expect;

define(['brandkit'], function (brand) {

    describe('Provides a Monochrome pallete', function(){
        it('should provide the color black', function() {
            console.log( brand.monochromePalette.black + " vs " + '#13161a')
            expect(brand.monochromePalette.black).to.equal('#13161a');
        });

        it('should provide the color gray darkest', function() {
            expect(brand.monochromePalette.grayDarkest).to.equal('#26272b');
        });

        it('should provide the color gray darker', function() {
            expect(brand.monochromePalette.grayDarker).to.equal('#3f4145');
        });

        it('should provide the color gray dark', function() {
            expect(brand.monochromePalette.grayDark).to.equal('#5c5f63');
        });

        it('should provide the color gray', function() {
            expect(brand.monochromePalette.gray).to.equal('#999c9f');
        });

        it('should provide the color gray light', function() {
            expect(brand.monochromePalette.grayLight).to.equal('#bfc2c5');
        });

        it('should provide the color gray lighter', function() {
            expect(brand.monochromePalette.grayLighter).to.equal('#e1e2e5');
        });

        it('should provide the color gray lightest', function() {
            expect(brand.monochromePalette.grayLightest).to.equal('#f0f1f2');
        });

        it('should provide the color offwhite', function() {
            expect(brand.monochromePalette.offwhite).to.equal('#f7f8fa');
        });

        it('should provide the color white', function() {
            expect(brand.monochromePalette.white).to.equal('#fff');
        });

    });

    describe('Provides an Accent pallete', function(){
        it('should provide the color cyan', function() {
            expect(brand.accentPalette.cyan).to.equal('#08a5e1');
        });

        it('should provide the color orange', function() {
            expect(brand.accentPalette.orange).to.equal('#ed8000');
        });

        it('should provide the color green', function() {
            expect(brand.accentPalette.green).to.equal('#76b900');
        });

        it('should provide the color purple', function() {
            expect(brand.accentPalette.purple).to.equal('#711371');
        });

        it('should provide the color red', function() {
            expect(brand.accentPalette.red).to.equal('#ee3324');
        });

        it('should provide the color cyanLight', function() {
            expect(brand.accentPalette.cyanLight).to.equal('#6bc9ed');
        });

        it('should provide the color orange light', function() {
            expect(brand.accentPalette.orangeLight).to.equal('#f4b366');
        });

        it('should provide the color green light', function() {
            expect(brand.accentPalette.greenLight).to.equal('#add566');
        });

        it('should provide the color purple light', function() {
            expect(brand.accentPalette.purpleLight).to.equal('#aa71aa');
        });

        it('should provide the color red light', function() {
            expect(brand.accentPalette.redLight).to.equal('#f5857c');
        });

        it('should provide the color cyan dark', function() {
            expect(brand.accentPalette.cyanDark).to.equal('#056083');
        });

        it('should provide the color orange dark', function() {
            expect(brand.accentPalette.orangeDark).to.equal('#ca4d00');
        });

        it('should provide the color green dark', function() {
            expect(brand.accentPalette.greenDark).to.equal('#446b00');
        });

        it('should provide the color purple dark', function() {
            expect(brand.accentPalette.purpleDark).to.equal('#420b42');
        });

        it('should provide the color red dark', function() {
            expect(brand.accentPalette.redDark).to.equal('#8a1e15');
        });

        it('should provide the color blue', function() {
            expect(brand.accentPalette.blue).to.equal('#3b73b9');
        });

        it('should provide the color blue light', function() {
            expect(brand.accentPalette.blueLight).to.equal('#89abd5');
        });

        it('should provide the color blue dark', function() {
            expect(brand.accentPalette.blueDark).to.equal('#22436b');
        });
    });

    describe('Provides Typography', function(){
        it('should provide a sans font family', function() {
            expect(brand.typography.sansFontFamily).to.equal('"ge-sans", "Helvetica Neue", Helvetica, Arial, sans-serif');
        });

        it('should provide a serif font family', function() {
            expect(brand.typography.serifFontFamily).to.equal('"ge-serif", Georgia, serif');
        });

        it('should provide a mono font family', function() {
            expect(brand.typography.monoFontFamily).to.equal('"ge-sans", "Helvetica Neue", Helvetica, Arial, sans-serif');
        });

        it('should provide a brand font family', function() {
            expect(brand.typography.brandFontFamily).to.equal('"ge-inspira", "Helvetica Neue", Helvetica, Arial, sans-serif');
        });

        it('should provide a base font size', function() {
            expect(brand.typography.baseFontSize).to.equal('14px');
        });

        it('should provide a base line height', function() {
            expect(brand.typography.baseLineHeight).to.equal('20px');
        });

        it('should provide a text color', function() {
            expect(brand.typography.textColor).to.equal('#3f4145');
        });

    });
});
