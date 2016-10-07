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
 * @author Martin Wragg
 *
 */
define(['jquery', 'map-search-component/indexer', 'map-markers-component/map-markers', 'map-markers-component/map-d3-overlay', 'map-core-component/pubsub'], function ($, indexer, markers, mapOverlay) {

    describe('Provides a JQuery plugin', function(){
        it('should be able to instantiate', function(){
          expect(indexer).to.not.be.null;
        });
    });

    describe('Provides event handlers', function(){
        var mapDSoverlay;
        var collection;
        var indexOptions;

        before(function(done){
            $.ajax({
                url : 'base/test/unit/spec/GeoJSON_example.json',
                async : true,
                dataType: "json"
            }).done(function(data) {
                // Preprocess the data to add icon styles
                $.each(data.features, function(key, val){
                    this.metadata = {};
                    this.metadata.icon = "\ue68a";
                    this.metadata.iconPos = {"x":-8,"y": 4};
                    var stt =  this.properties.Status;
                    if (( stt !== undefined ) && ( stt == 'Off Duty')){
                        this.metadata.state = 'warning';
                    }
                });

                // Template for the popover
                var richPopover = '<div class="popover top" data-popover-id="{{popoverId}}"><div class="arrow"></div><header class="panel-header"><div class="left"><i class="icon-truck"></i></div><div class="popover-title panel-title voice voice-brand"><h3>Crew</h3></div><div class="right voice voice-brand"><p>{{Number}}</p></div></header><div class="popover-content panel-content"><ul class="inline"><li class="vertical-divider"><strong>Crew Type</strong><br/><strong>Status</strong><br/><strong>Crew Leader</strong></li><li class="vertical-divider">{{Type}}<br/>{{Status}}<br/>{{Leader}}</li></ul></div><footer class="panel-footer"><div class="secondary"><a class="btn btn-map"><i class="icon-phone"></i></a></div><div class="primary"><a class="btn btn-map"><i class="icon-star"></i>Bookmark</a><a class="btn btn-map"><i class="icon-pencil"></i></a></div></footer></div>';

                var markerOptions = { popovers: true,
                    popoverTemplate: richPopover };

                // Specify the data fields used by the search dropdown
                indexOptions =  { indexAttribs : [ "Leader" ],
                    secondaryAttribs : [ "Type", "Number" ],
                    facet : "Status" };

                // Create the data vector layer
                var dummymap = { div: { parentElement: "test" }, addLayer: function() {} };
                collection = markers.addMarkers(data, dummymap, markerOptions, 'Crews', indexOptions);
                mapDSoverlay = new mapOverlay(collection, dummymap, name, true, indexOptions).done(function(){ });
                done();
            }).error( function(err) {
                console.log(err.toString())
            });

        });

        it('should be able to add to index', function(){
            expect($.publish('overlayVisibilityChanged', [0, true])).to.not.be.null;
        });

        it('should be able to initialize marker layer', function(){
            expect($.publish('markerLayerInitialised', [mapDSoverlay])).to.not.be.null;
        });
    });

    describe('Provides an API', function(){
        it('should be able to go to an asset', function(){
            expect(indexer.gotoAsset("test", "test")).to.not.be.null;
        });

        it('should be able to do a search index', function(){
            expect(indexer.searchIndex("test", false, 10)).to.not.be.null;
        });

        it('should be able to do a search index and allow a default max results', function(){
            expect(indexer.searchIndex("test", false)).to.not.be.null;
        });
    });

});
