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
 * Bootstraps Karma testing for requireJS
 *
 * @author Jeff Reichenberg
 */

//Make an array of Test-specs to tell requirejs about.
var specs = [];
var utils = [];
var loader;

for (var file in window.__karma__.files) {
    if (/fixtureLoader\.js$/.test(file)) {
        loader = file;
    }
    else if (/\/util\//.test(file)) {
        utils.push(file);
    }
    else if (/\/spec\//.test(file)) {
        specs.push(file);
    }
    
}

var requireDeps = [loader].concat(utils).concat(specs);

console.log("RequireJs 'deps' to be loaded by the container:\n" + requireDeps.join("\n"));

//Karma-specific require config...
require.config({
    // Karma serves files from '/base'
    baseUrl: '/base',

    // ask Require.js to load these files (all our tests)
    deps: requireDeps,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});