var expect = chai.expect;

define(['brandkit'], function (brand) {

    describe('Provides a Monochrome pallete', function(){
        it('should provide the color black', function() {
            expect(brand.monochromePalette.black).to.equal('#141414');
        });

        it('should provide the color gray darkest', function() {
            expect(brand.monochromePalette.grayDarkest).to.equal('#2b2b2b');
        });

        it('should provide the color gray darker', function() {
            expect(brand.monochromePalette.grayDarker).to.equal('#414141');
        });

        it('should provide the color gray dark', function() {
            expect(brand.monochromePalette.grayDark).to.equal('#575757');
        });

        it('should provide the color gray', function() {
            expect(brand.monochromePalette.gray).to.equal('#868686');
        });

        it('should provide the color gray light', function() {
            expect(brand.monochromePalette.grayLight).to.equal('#bcbcbc');
        });

        it('should provide the color gray lighter', function() {
            expect(brand.monochromePalette.grayLighter).to.equal('#d4d4d4');
        });

        it('should provide the color gray lightest', function() {
            expect(brand.monochromePalette.grayLightest).to.equal('#e9e9e9');
        });

        it('should provide the color offwhite', function() {
            expect(brand.monochromePalette.offwhite).to.equal('#f5f5f5');
        });

        it('should provide the color white', function() {
            expect(brand.monochromePalette.white).to.equal('#fff');
        });

    });

    describe('Provides an Accent pallete', function(){
        it('should provide the color cyan', function() {
            expect(brand.accentPalette.cyan).to.equal('#005CB9');
        });

        it('should provide the color orange', function() {
            expect(brand.accentPalette.orange).to.equal('#ff9821');
        });

        it('should provide the color green', function() {
            expect(brand.accentPalette.green).to.equal('#46ad00');
        });

        it('should provide the color purple', function() {
            expect(brand.accentPalette.purple).to.equal('#8669ff');
        });

        it('should provide the color red', function() {
            expect(brand.accentPalette.red).to.equal('#de2533');
        });

        it('should provide the color yellow', function() {
            expect(brand.accentPalette.yellow).to.equal('#ffed45');
        });

        it('should provide the color cyanLight', function() {
            expect(brand.accentPalette.cyanLight).to.equal('#3693f8');
        });

        it('should provide the color orange light', function() {
            expect(brand.accentPalette.orangeLight).to.equal('#ffbb66');
        });

        it('should provide the color green light', function() {
            expect(brand.accentPalette.greenLight).to.equal('#75d835');
        });

        it('should provide the color purple light', function() {
            expect(brand.accentPalette.purpleLight).to.equal('#9c97ff');
        });

        it('should provide the color red light', function() {
            expect(brand.accentPalette.redLight).to.equal('#ff5c5c');
        });

        it('should provide the color yellow dark', function() {
            expect(brand.accentPalette.yellowDark).to.equal('#ffcf45');
        });

        it('should provide the color cyan dark', function() {
            expect(brand.accentPalette.cyanDark).to.equal('#00366e');
        });

        it('should provide the color orange dark', function() {
            expect(brand.accentPalette.orangeDark).to.equal('#e55c00');
        });

        it('should provide the color green dark', function() {
            expect(brand.accentPalette.greenDark).to.equal('#1d5f11');
        });

        it('should provide the color purple dark', function() {
            expect(brand.accentPalette.purpleDark).to.equal('#595194');
        });

        it('should provide the color red dark', function() {
            expect(brand.accentPalette.redDark).to.equal('#b61225');
        });

        it('should provide the color yellow light', function() {
            expect(brand.accentPalette.yellowLight).to.equal('#fff98d');
        });

        it('should provide the color blue', function() {
            expect(brand.accentPalette.blue).to.equal('#005bb8');
        });

        it('should provide the color blue light', function() {
            expect(brand.accentPalette.blueLight).to.equal('#3693f8');
        });

        it('should provide the color blue dark', function() {
            expect(brand.accentPalette.blueDark).to.equal('#00366e');
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
            expect(brand.typography.monoFontFamily).to.equal('Inconsolata, Consolas, monospace');
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
            expect(brand.typography.textColor).to.equal('#414141');
        });

    });
});
