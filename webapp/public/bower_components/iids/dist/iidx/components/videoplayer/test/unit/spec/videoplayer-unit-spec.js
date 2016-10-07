'use strict';

/*
 * Copyright (c) 2013 GE Global Research. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * GE Global Research. The software may be used and/or copied only
 * with the written permission of GE Global Research or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

/**
 * @class Unit test spec for videoplayer.
 *
 * Use any Mocha (http://visionmedia.github.io/mocha/), Chai (http://chaijs.com/), or Sinon (http://sinonjs.org/) statements here
 *
 * @author Jeff Reichenberg
 *
 */
define(['videoplayer'], function () {

    describe('Provides a VideoPlayer Object', function(){

        it('should load the videoplayer', function() {
            expect(videojs).not.to.equal(null);
            expect(videojs).not.to.equal(undefined);
        });

        it('should be able to set options', function() {
            console.log(videojs.plugins)
            videojs.options.flash.swf = "js/video-js.swf";
            expect(videojs.options.flash.swf).to.equal("js/video-js.swf");
        });
    });
});