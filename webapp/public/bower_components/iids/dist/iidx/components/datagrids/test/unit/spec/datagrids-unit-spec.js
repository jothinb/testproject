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
 * @class Unit test spec for toggle-switch.
 *
 * Use any Mocha (http://visionmedia.github.io/mocha/), Chai (http://chaijs.com/), or Sinon (http://sinonjs.org/) statements here
 *
 * @author Jeff Reichenberg
 *
 */
define(['jquery', 'datagrids', 'datagrids/datagrids-row-grouping', 'datagrids/datagrids-col-vis'], function ($) {

    var _runWhenDataLoaded = function(done, $tableDom, fnToRun) {
        if ($tableDom.find('tbody tr').length > 1) {
            fnToRun();
            done();
        }
        else {
            setTimeout(function () {_runWhenDataLoaded(done, $tableDom, fnToRun);}, 100);
        }
    };

    describe('Provides a JQuery plugin', function(){

        it('should load the datatables plugin', function(){
            expect($('*').dataTable).not.to.be.null;
        });

        it('should expose an iidsBasicDataGrid JQuery plugin', function(){
            expect($('*').iidsBasicDataGrid).not.to.be.null;
        });
    });

    describe('Init a datagrid with options', function() {

        var simpleDgOptions = {
            'aoColumns': [
                { 'sTitle': 'Schedule', 'sClass': 'essential' },
                { 'sTitle': 'Account Status', 'sClass': 'essential'}
            ],
            'aaData': [
                ['foo', 'bar'],
                ['possum', 'raccoon'],
                ['peanut', 'epsilon']
            ],
            'isResponsive': true
        };

        it('should instance a datagrid', function() {
            var $dom = $('<table></table>');
            $dom.iidsBasicDataGrid(simpleDgOptions);
            var datagridObj = $dom.data('iidsBasicDataGrid');
            expect(datagridObj).to.exist; //datagrid obj
            expect(datagridObj.$table).to.exist; //datatables jquery plugin obj
        });

        it('should have the right number of rows', function() {
            var $dom = $('<table></table>');
            $dom.iidsBasicDataGrid(simpleDgOptions);
            expect($dom.find('tbody tr')).to.have.lengthOf(3);
        });

        it('should have the right number of columns', function() {
            var $dom = $('<table></table>');
            $dom.iidsBasicDataGrid(simpleDgOptions);
            expect($dom.find('thead th')).to.have.lengthOf(2);
        });
    });

    var ajaxDataMockResponse = [
        200, { "Content-Type": "application/json" }, JSON.stringify({
            "aaData": [
                {"animal": "Raccoon",  "food": "trash"},
                {"animal": "Cat", "food": "cat food"},
                {"animal": "Dog", "food": "dog food"},
                {"animal": "Cat", "food": "trash"},
                {"animal": "Zebra", "food": "grass"},
                {"animal": "Cat", "food": "grass"}
            ]
        })
    ];

    var reloadedAjaxDataMockResponse = [
        200, { "Content-Type": "application/json" }, JSON.stringify({
            "aaData": [
                {"animal": "Raccoon",  "food": "trash"}
            ]
        })
    ];

    var ajaxLoadingConfig = {
        'aoColumns': [
            { 'sTitle': 'Animal', 'mData': 'animal', 'sClass': 'essential' },
            { 'sTitle': 'Food', 'mData': 'food', 'sClass': 'essential' }
        ],
        'sAjaxSource': 'mockedAjaxResponse.json'

    };

    var fakeServer;
    beforeEach(function() {
        fakeServer = sinon.fakeServer.create();
        fakeServer.respondWith(ajaxDataMockResponse);
        fakeServer.autoRespond = true;;
    });

    afterEach(function () {
        fakeServer.restore();
    });

    describe('Load data via ajax', function () {

        it('should load object array data via ajax', function(done) {
            var $dom = $('<table></table>');
            $dom.iidsBasicDataGrid(ajaxLoadingConfig);
            _runWhenDataLoaded(done, $dom, function() {
                expect($dom.find('tbody tr')).to.have.lengthOf(6);
            });
        });

        it('should reload the same object array data via ajax', function(done) {
            var $dom = $('<table></table>');
            $dom.iidsBasicDataGrid(ajaxLoadingConfig);
            var dg = $dom.data('iidsBasicDataGrid');
            var cb = function() {
                expect($dom.find('tbody tr')).to.have.lengthOf(6);
                done();
            };
            _runWhenDataLoaded(function() {}, $dom, function() {
                dg.reloadAjax(dg.$table.fnSettings(), /*newSource*/null, cb);
            });
        });

        it('should reload a different object array data via ajax', function(done) {
            var $dom = $('<table></table>');
            $dom.iidsBasicDataGrid(ajaxLoadingConfig);
            var dg = $dom.data('iidsBasicDataGrid');
            var cb = function() {
                expect($dom.find('tbody tr')).to.have.lengthOf(1);
                done();
            };
            _runWhenDataLoaded(function() {}, $dom, function() {
                fakeServer.respondWith(reloadedAjaxDataMockResponse);
                dg.reloadAjax(dg.$table.fnSettings(), 'reloadedMockedAjaxResponse.json', cb);
            });
        });
    });

    describe('Row grouping plugin', function () {

        var $groupingSelectorControl = $('<div></div>');

        var rowGroupingDgOptions = $.extend({}, ajaxLoadingConfig, {
            'plugins': ["G"], //enable the row grouping plugin (assumes datagrids/datagrids-row-grouping.js is on the page)
            "bPaginate": false, // pagination is not compatible with row grouping
            "rowGrouping": {
                rowGroupingDropdownSelector: $groupingSelectorControl //tell the plugin where to put the row grouping control
            }
        });

        it('should group rows when the user chooses to', function(done) {
            var $dom = $('<table></table>');
            $dom.iidsBasicDataGrid(rowGroupingDgOptions);
            _runWhenDataLoaded(done, $dom, function() {
                $groupingSelectorControl.find('a').first().click();
                expect($dom.find('tr[data-grouping-row="Cat"]')).to.have.lengthOf(1);
                expect($dom.find('tr[data-grouping-row="Dog"]')).to.have.lengthOf(1);
                expect($dom.find('tr[data-grouping-row="Raccoon"]')).to.have.lengthOf(1);
                expect($dom.find('tr[data-grouping-row="Zebra"]')).to.have.lengthOf(1);
            });
        });

        var rowGroupingDgOptionsWithDefault = $.extend({}, rowGroupingDgOptions, {
            "rowGrouping": {
                rowGroupingDropdownSelector: $groupingSelectorControl, //tell the plugin where to put the row grouping control
                defaultGroupingCol: 'food'
            }
        });

        it('should group rows when a default is set in the config', function(done) {
            var $dom = $('<table></table>');
            $dom.iidsBasicDataGrid(rowGroupingDgOptionsWithDefault);
            _runWhenDataLoaded(done, $dom, function() {
                expect($dom.find('tr[data-grouping-row="trash"]')).to.have.lengthOf(1);
                expect($dom.find('tr[data-grouping-row="cat food"]')).to.have.lengthOf(1);
                expect($dom.find('tr[data-grouping-row="dog food"]')).to.have.lengthOf(1);
                expect($dom.find('tr[data-grouping-row="grass"]')).to.have.lengthOf(1);
            });
        });

        it('should expand all collapsed rows when the user chooses to', function(done) {
            var $dom = $('<table></table>');
            $dom.iidsBasicDataGrid(rowGroupingDgOptionsWithDefault);
            _runWhenDataLoaded(done, $dom, function() {
                expect($dom.find('tr.groupingRow.collapsed')).to.have.lengthOf(4);
                $groupingSelectorControl.find('[data-grouping-toggle-all="true"]').click();
                expect($dom.find('tr.groupingRow.collapsed')).to.have.lengthOf(0);
            });
        });

        it('should clear grouping when the user chooses to', function(done) {
            var $dom = $('<table></table>');
            $dom.iidsBasicDataGrid(rowGroupingDgOptionsWithDefault);
            _runWhenDataLoaded(done, $dom, function() {
                expect($dom.find('tr[data-grouping-row]')).to.have.lengthOf(4);
                $groupingSelectorControl.find('.clearGrouping').click();
                expect($dom.find('tr[data-grouping-row]')).to.have.lengthOf(0);
            });
        });
    });

    describe('Row filtering', function () {

        var filterConfig = {
            'aoColumns': [
                { 'sTitle': 'Animal', 'mData': 'animal', 'sClass': 'essential', filter: true },
                { 'sTitle': 'Food', 'mData': 'food', 'sClass': 'essential', filter: true }
            ],
            'sAjaxSource': 'mockedAjaxResponse.json'
        };

        it('should present filtering controls when configured for filtering', function (done) {
            var $dom = $('<table></table>');
            $dom.iidsBasicDataGrid(filterConfig);
            _runWhenDataLoaded(done, $dom, function() {
                expect($dom.find('thead input')).to.have.lengthOf(2);
            });
        });

    });

    describe('Column hiding', function () {

        var $colVisDropdownSelectorControl = $('<div></div>');

        var stateChangeFn = sinon.spy();

        var colVisDgOptions = $.extend({}, ajaxLoadingConfig, {
            "plugins": ["C"], //enable the Column Vis plugin (assumes datagrids/datagrids-col-vis.js is on the page)
            "oColVis": {
                colVisDropdownSelector: $colVisDropdownSelectorControl, //tell the plugin where to put the column vis control
                fnStateChange: stateChangeFn
            }
        });

        it('should create a column visibility control', function(done) {
            var $dom = $('<table></table>');
            $dom.iidsBasicDataGrid(colVisDgOptions);
            _runWhenDataLoaded(done, $dom, function() {
                expect($colVisDropdownSelectorControl.find('input:checkbox')).to.have.lengthOf(2);
            });
        });

        it('should execute hiding of columns when the change event is executed on a checkbox', function(done) {
            var $dom = $('<table></table>');
            $dom.iidsBasicDataGrid(colVisDgOptions);
            _runWhenDataLoaded(done, $dom, function() {
                var $colVisCheckboxes = $colVisDropdownSelectorControl.find('input:checkbox');

                $colVisCheckboxes.first().trigger("change");

                expect(stateChangeFn.calledOnce).to.equal(true)

            });
        });


    });

    describe('Exercise responsive functions', function() {

        var simpleDgOptions = {
            'aoColumns': [
                { 'sTitle': 'Schedule', 'sClass': 'essential' },
                { 'sTitle': 'Account Status', 'sClass': 'essential'}
            ],
            'aaData': [
                ['foo', 'bar'],
                ['possum', 'raccoon'],
                ['peanut', 'epsilon']
            ],
            'isResponsive': true
        };

        it('should not fail when responsive functions are called', function() {
            var $dom = $('<table></table>');
            $dom.iidsBasicDataGrid(simpleDgOptions);
            var datagridObj = $dom.data('iidsBasicDataGrid');
            datagridObj.respondLandscapeTablet();
            datagridObj.respondPortraitTablet();
            datagridObj.respondPhone();
        });
    });

});