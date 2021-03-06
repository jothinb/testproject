/* global requirejs, define */
/* jshint camelcase: false */
/* jshint unused: false */
/**
 * This file sets up the basic module libraries you'll need
 * for your application.
 */
requirejs.onError = function (err) {
	'use strict';

	//console.log(err.requireType);
	if (err.requireType === 'timeout') {
		//console.error('modules: ' + err.requireModules);
	}
	throw err;
};
/**
 * RequireJS Config
 * This is configuration for the entire application.
 */
require.config({
	enforceDefine: false,
	xhtml: false,
	//Cache buster
	//urlArgs : '_=' + Date.now(),
	waitSeconds: 15,
	config: {
		text: {
			env: 'xhr'
		}
	},
	paths: {
		/*
		 * Predix V modules paths
		 */
		bower_components: '../bower_components',

		/** Configurable Dashboard required plugins **/
		'widgets-module': '../bower_components/px-contextual-dashboard/widgets-module',
		'angular-schema-form': '../bower_components/angular-schema-form/dist/schema-form', // .min
		'angular-schema-form-boostrap': '../bower_components/angular-schema-form/dist/bootstrap-decorator.min',
		'objectpath': '../bower_components/objectpath/lib/ObjectPath',
		'tv4': '../bower_components/tv4/tv4',
		'angular-schema-form-dependencies': '../bower_components/px-contextual-dashboard/dashboard/angular-schema-form-dependencies',
		'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap', // for datagrid (predix.dashboard.widgets module dependency)
        'angular-bootstrap-tpl': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
		/** end config dash required ones **/


		//VRuntime Paths
//		widgets: '/resources/com.ge.dsv.component.catalog.ComponentCatalogResourceManager',
//		directives: './directives',
		vruntime: '../bower_components/vruntime/dist/vruntime',


		// Named References
		config: './config',
		app: './app',

		//Angular App Modules
		'controllers-module': 'controllers/module',
		'directives-module': 'directives/module',
		'filters-module': 'filters/module',
		'services-module': 'services/module',
		'models-module': 'models/module',

		// angularjs + modules
		angular: '../bower_components/angular/angular',
		'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
		'angular-resource': '../bower_components/angular-resource/angular-resource',
		'angular-route': '../bower_components/angular-route/angular-route',
		'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',

		// angular ui router
		'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',

		// Required libs
		lodash: '../bower_components/lodash/dist/lodash.min',
//		Isomer: '../bower_components/isomer/dist/isomer',
		three: '../bower_components/threejs/three',
		'orbit-controls': '../bower_components/threejs/OrbitControls',
		'map-controls': '../bower_components/threejs/MapControls',
		'three-projector': '../bower_components/threejs/renderers/Projector',
		'three-svg-renderer': '../bower_components/threejs/renderers/SVGRenderer',
		'three-octree': '../bower_components/threejs/Octree',
		'd3-threeD': '../bower_components/d3-threeD/d3-threeD',
		stats: '../bower_components/statsjs/stats.min',
		tween: '../bower_components/tweenjs/tween',
		gui: '../bower_components/datguijs/dat.gui.min',
		stomp: '../bower_components/stompjs/stomp',
		sockjs: '../bower_components/sockjs/sockjs-0.3.4',
		rgbcolor: '../bower_components/canvg/rgbcolor',
		canvg: '../bower_components/canvg/canvg',

		// Require JS Plugins
		text: '../bower_components/requirejs-plugins/lib/text',
//		order: '../bower_components/requirejs-plugins/src/order',
		async: '../bower_components/requirejs-plugins/src/async',
		depend: '../bower_components/requirejs-plugins/src/depend',
		font: '../bower_components/requirejs-plugins/src/font',
		goog: '../bower_components/requirejs-plugins/src/goog',
		image: '../bower_components/requirejs-plugins/src/image',
		json: '../bower_components/requirejs-plugins/src/json',
		mdown: '../bower_components/requirejs-plugins/src/mdown',
		noext: '../bower_components/requirejs-plugins/src/noext',
		propertyParser: '../bower_components/requirejs-plugins/src/propertyParser',
		Markdown: '../bower_components/requirejs-plugins/lib/Markdown.Converter',
		css: '../bower_components/require-css/css',

		/*
		 * IIDx 2.1.0
		 * To map IIDx to workbench, please modify path, map and shim section of this require js
		 * The following section is copied from iidx require.config.js and path are re-mapped to bower_components/iids folder
		 */
		brandkit: '../bower_components/iids/dist/iidx/components/brandkit/js/iidx-brandkit',
		'cascading-list': '../bower_components/iids/dist/iidx/components/cascading-list/js/cascading-list',
		charts: '../bower_components/iids/dist/iidx/components/charts/js/charts',
		'charts-theme': '../bower_components/iids/dist/iidx/components/charts/js/charts/theme',
		'collapsible-list': '../bower_components/iids/dist/iidx/components/collapsible-list/js/collapsible-list',
		'datatables-colreorder': '../bower_components/iids/dist/iidx/components/datatables-col-reorder/index',
		'datatables-scroller': '../bower_components/iids/dist/iidx/components/datatables-scroller/index',
		contextmenu: '../bower_components/iids/dist/iidx/components/contextmenu/js/contextmenu',
		'd3-amd': '../bower_components/iids/dist/iidx/components/d3-amd/d3',
		datagrids: '../bower_components/iids/dist/iidx/components/datagrids/js/datagrids',
		datatables: '../bower_components/iids/dist/iidx/components/datatables/dist/media/js/jquery.dataTables',
		datepicker: '../bower_components/iids/dist/iidx/components/datepicker/js/datepicker',
		'declarative-visualizations': '../bower_components/iids/dist/iidx/components/declarative-visualizations/js/declarative-visualizations',
		'ge-bootstrap': '../bower_components/iids/dist/iidx/components/ge-bootstrap/js/ge-bootstrap',
//		'iids-navbar': '../bower_components/iids/dist/iidx/components/iids-navbar/js/iids-navbar',
		jquery: '../bower_components/iids/dist/iidx/components/jquery/jquery.min',
//		'jquery-csv': '../bower_components/iids/dist/iidx/components/jquery-csv/src/jquery.csv',
		'jqueryui-sortable-amd': '../bower_components/iids/dist/iidx/components/jqueryui-sortable-amd/js/jquery-ui-1.10.2.custom',
		'jQuery-contextMenu': '../bower_components/iids/dist/iidx/components/jQuery-contextMenu/src/jquery.contextMenu',
		modernizr: '../bower_components/iids/dist/iidx/components/modernizr/modernizr',
		jumpnav: '../bower_components/iids/dist/iidx/components/jumpnav/js/jumpnav',
		modules: '../bower_components/iids/dist/iidx/components/modules/js/modules',
		prettify: '../bower_components/iids/dist/iidx/components/prettify/prettify',
		respond: '../bower_components/iids/dist/iidx/components/respond/respond.src',
		'responsive-emitter': '../bower_components/iids/dist/iidx/components/responsive-emitter/js/responsive-emitter',
		'responsive-tables': '../bower_components/iids/dist/iidx/components/responsive-tables/js/responsive-tables',
		spinner: '../bower_components/iids/dist/iidx/components/spinner/js/spinner',
		trays: '../bower_components/iids/dist/iidx/components/trays/js/trays',
		spin: '../bower_components/iids/dist/iidx/components/spin.js/dist/spin',
		highcharts: '../bower_components/iids/dist/iidx/components/highcharts-amd/js/highcharts.src',
		highstock: '../bower_components/iids/dist/iidx/components/highcharts-amd/js/highstock.src',
		'highcharts-more': '../bower_components/iids/dist/iidx/components/highcharts-amd/js/highcharts-more.src',
		'bootstrap-datepicker': '../bower_components/iids/dist/iidx/components/bootstrap-datepicker/js/bootstrap-datepicker',
//		'jquery-ui-touch-punch': '../bower_components/iids/dist/iidx/components/jquery-ui-touch-punch/jquery.ui.touch-punch',
		'multi-step-navigation': '../bower_components/iids/dist/iidx/components/multi-step-navigation/js/multi-step-navigation',
		'twitter-bootstrap-wizard': '../bower_components/iids/dist/iidx/components/twitter-bootstrap-wizard/jquery.bootstrap.wizard',
		requirejs: '../bower_components/iids/dist/iidx/components/requirejs/require',
		videoplayer: '../bower_components/iids/dist/iidx/components/videoplayer/js/videoplayer',
		videojs: '../bower_components/iids/dist/iidx/components/videoplayer/js/video',
//		'map-core-component': '../bower_components/iids/dist/iidx/components/map-core/js',
		'map-core': '../bower_components/iids/dist/iidx/components/map-core/js/map-core', //backwards compatibility only, can be removed in a non-backwards compatible release w/ client paths change to 'map-core-component/map-core'
		'map-loader': '../bower_components/iids/dist/iidx/components/map-core/js/map-loader', //backwards compatibility only, can be removed in a non-backwards compatible release w/ client paths change to 'map-core-component/map-loader'
//		'map-cluster-component': '../bower_components/iids/dist/iidx/components/map-cluster/js',
		'map-cluster': '../bower_components/iids/dist/iidx/components/map-cluster/js/map-cluster', //backwards compatibility only, can be removed in a non-backwards compatible release w/ client paths change to 'map-cluster-component/map-cluster'
		'map-street-view': '../bower_components/iids/dist/iidx/components/map-core/js/map-streetview', //backwards compatibility only, can be removed in a non-backwards compatible release w/ client paths change to 'map-core-component/map-streetview'
		'map-layer-list': '../bower_components/iids/dist/iidx/components/map-layerlist/js/map-layer-list',
		'map-geolocate': '../bower_components/iids/dist/iidx/components/map-geolocate/js/map-geolocate',
//		'map-google-component': '../bower_components/iids/dist/iidx/components/map-google/js',
		'map-google': '../bower_components/iids/dist/iidx/components/map-google/js/googlemaps', //backwards compatibility only, can be removed in a non-backwards compatible release w/ client paths change to 'map-google-component/googlemaps'
//		'map-markers-component': '../bower_components/iids/dist/iidx/components/map-markers/js',
		'map-markers': '../bower_components/iids/dist/iidx/components/map-markers/js/map-markers', //backwards compatibility only, can be removed in a non-backwards compatible release w/ client paths change to 'map-markers-component/map-markers'
		'map-popovers': '../bower_components/iids/dist/iidx/components/map-popovers/js/map-popovers',
//		'map-search-component': '../bower_components/iids/dist/iidx/components/map-search/js',
		'map-search': '../bower_components/iids/dist/iidx/components/map-search/js/asset-address-search', //backwards compatibility only, can be removed in a non-backwards compatible release w/ client paths change to 'map-search-component/asset-address-search'
		'map-zoom': '../bower_components/iids/dist/iidx/components/map-zoom/js/map-zoom',
		'hogan': '../bower_components/iids/dist/iidx/components/hogan/index',
		'underscore': '../bower_components/iids/dist/iidx/components/underscore-amd/index',
		OpenLayers: '../bower_components/iids/dist/iidx/components/open-layers/dist/OpenLayers',
		'map-layerlist': '../bower_components/iids/dist/iidx/components/map-layerlist/js/map-layer-list',
//		navbar: '../bower_components/iids/dist/iidx/components/navbar/js/iids-navbar',
		'highcharts.src': '../bower_components/iids/dist/iidx/components/highcharts-amd/js/highcharts.src',
		'highstock.src': '../bower_components/iids/dist/iidx/components/highcharts-amd/js/highstock.src',
		'highcharts-more.src': '../bower_components/iids/dist/iidx/components/highcharts-amd/js/highcharts-more.src',
		'bootstrap-switch': '../bower_components/iids/dist/iidx/components/bootstrap-switch/static/js/bootstrap-switch',
		'oo-utils': '../bower_components/iids/dist/iidx/components/oo-utils/src/js/oo-utils',
		'toggle-switch': '../bower_components/iids/dist/iidx/components/toggle-switch/src/js/toggle-switch',
		'moment': '../bower_components/iids/dist/iidx/components/momentjs/min/moment.min',
//		'bootstrap-timepicker': '../bower_components/iids/dist/iidx/components/bootstrap-timepicker/index',
//		'timepicker': '../bower_components/iids/dist/iidx/components/timepicker/src/js/timepicker',
		'slider': '../bower_components/iids/dist/iidx/components/slider/js/slider',
//		'bootstrap': '../bower_components/iids/dist/iidx/components/bootstrap/js',

		// IIDx additions
		'accordion': '../bower_components/iids/dist/iidx/components/ge-bootstrap/js/ge-bootstrap/accordion',
		'bootstrap-affix': '../bower_components/iids/dist/iidx/components/bootstrap/js/affix',
		'bootstrap-alert': '../bower_components/iids/dist/iidx/components/bootstrap/js/alert',
		'bootstrap-button': '../bower_components/iids/dist/iidx/components/bootstrap/js/button',
		'bootstrap-carousel': '../bower_components/iids/dist/iidx/components/bootstrap/js/carousel',
		'bootstrap-collapse': '../bower_components/iids/dist/iidx/components/bootstrap/js/collapse',
		'bootstrap-dropdown': '../bower_components/iids/dist/iidx/components/bootstrap/js/dropdown',
		'bootstrap-modal': '../bower_components/iids/dist/iidx/components/bootstrap/js/modal',
		'bootstrap-popover': '../bower_components/iids/dist/iidx/components/bootstrap/js/popover',
		'bootstrap-scrollspy': '../bower_components/iids/dist/iidx/components/bootstrap/js/scrollspy',
		'bootstrap-tab': '../bower_components/iids/dist/iidx/components/bootstrap/js/tab',
		'bootstrap-tooltip': '../bower_components/iids/dist/iidx/components/bootstrap/js/tooltip',
		'bootstrap-transition': '../bower_components/iids/dist/iidx/components/bootstrap/js/transition',
//		'bootstrap-typeahead': '../bower_components/iids/dist/iidx/components/bootstrap/js/typeahead',

		'bar-declarative-visualizations': '../bower_components/iids/dist/iidx/components/declarative-visualizations/js/declarative-visualizations/bar',
		'donut-declarative-visualizations': '../bower_components/iids/dist/iidx/components/declarative-visualizations/js/declarative-visualizations/donut',
		'guagedeclarative-visualizations': '../bower_components/iids/dist/iidx/components/declarative-visualizations/js/declarative-visualizations/gauge',
		'spiderweb-declarative-visualizations': '../bower_components/iids/dist/iidx/components/declarative-visualizations/js/declarative-visualizations/spiderweb',
		'sortable': '../bower_components/iids/dist/iidx/components/jqueryui-sortable-amd/js/jquery-ui-1.10.2.custom',

		// Invididual chart modules so we don't load all the charts at once
		'area-chart': '../bower_components/iids/dist/iidx/components/charts/js/charts/area',
		'area-stacked-chart': '../bower_components/iids/dist/iidx/components/charts/js/charts/area-stacked',
		'bar-chart': '../bower_components/iids/dist/iidx/components/charts/js/charts/bar',
		'bar-stacked-chart': '../bower_components/iids/dist/iidx/components/charts/js/charts/bar-stacked',
		'column-chart': '../bower_components/iids/dist/iidx/components/charts/js/charts/column',
		'column-stacked-chart': '../bower_components/iids/dist/iidx/components/charts/js/charts/column-stacked',
		'donut-chart': '../bower_components/iids/dist/iidx/components/charts/js/charts/donut',
		'line-chart': '../bower_components/iids/dist/iidx/components/charts/js/charts/line',
		'pie-chart': '../bower_components/iids/dist/iidx/components/charts/js/charts/pie',
		'scatter-chart': '../bower_components/iids/dist/iidx/components/charts/js/charts/scatter',
		'spiderweb-chart': '../bower_components/iids/dist/iidx/components/charts/js/charts/spiderweb',
		'spiderweb-comparison-chart': '../bower_components/iids/dist/iidx/components/charts/js/charts/spiderweb-comparison',
		'spiderweb-tiny-chart': '../bower_components/iids/dist/iidx/components/charts/js/charts/spiderweb-tiny',
		'stock-chart': '../bower_components/iids/dist/iidx/components/charts/js/charts/stock'

		/*
		 * End of IIDx path re-map
		 */
	},
	/*
	 * IIDx use ge-bootstrap internally in their system
	 * The follow section use ge-bootstrap map to remap ge-bootstrap path to the path alias above
	 * Therefore all IIDx internal ge-bootstrap reference link will not be broken
	 */
	map: {
		'ge-bootstrap': {
			'bootstrap/affix': 'bootstrap-affix',
			'bootstrap/alert': 'bootstrap-alert',
			'bootstrap/button': 'bootstrap-button',
			'bootstrap/carousel': 'bootstrap-carousel',
			'bootstrap/collapse': 'bootstrap-collapse',
			'bootstrap/dropdown': 'bootstrap-dropdown',
			'bootstrap/modal': 'bootstrap-modal',
			'bootstrap/popover': 'bootstrap-popover',
			'bootstrap/scrollspy': 'bootstrap-scrollspy',
			'bootstrap/tab': 'bootstrap-tab',
			'bootstrap/tooltip': 'bootstrap-tooltip',
			'bootstrap/transition': 'bootstrap-transition',
			'bootstrap/typeahead': 'bootstrap-typeahead'
		}
	},
	priority: [
		'jquery',
		'angular',
		'angular-resource',
		'angular-route',
		'three',
		'stats',
		'bootstrap'
	],
	shim: {
		app: {
			deps: ['three','orbit-controls','map-controls','three-projector','three-svg-renderer',
				'three-octree',
				'canvg',
				'rgbcolor',
				'stats','tween','sockjs','stomp','gui']
		},
		vruntime: {
			deps: ['jquery', 'angular']
		},
		'angular': {
			deps: ['jquery','three','stats'],
			exports: 'angular'
		},
		'angular-route': ['angular'],
		'angular-resource': ['angular', 'angular-route', 'angular-ui-router'],
		'angular-mocks': {
			deps: ['angular', 'angular-route', 'angular-resource', 'angular-ui-router'],
			exports: 'mock'
		},
		'angular-ui-router': ['angular'],
		'angular-sanitize': ['angular'],
		'angular-bootstrap': {
			deps: ['angular', 'angular-route', 'angular-ui-router']
		},
		'angular-bootstrap-tpl': {
			deps: ['angular', 'angular-route', 'angular-ui-router']
		},
		'directives/v-runtime.directives': {
			deps: ['angular']
		},
		underscore: {
			exports: '_'
		},
		/*
		 * IIDx shim
		 * This section shim require for IIDx
		 */
		OpenLayers: {
			exports: 'OpenLayers'
		},
		'jquery-csv': [
			'jquery'
		],
		'bootstrap-switch': ['jquery'],
		'bootstrap-timepicker': ['jquery'],
		'col-reorder-amd': {
			deps: ['jquery', 'datatables']
		},
		'datagrids/datagrids-col-vis': {
			deps: ['jquery', 'datatables']
		},
		'bootstrap-transition': {
			deps: ['jquery'],
			exports: 'bootstrap-transition'
		},
		'bootstrap-affix': ['jquery'],
		'bootstrap-alert': ['jquery'],
		'bootstrap-button': ['jquery'],
		'bootstrap-carousel': ['jquery', 'bootstrap-transition'],
		'bootstrap-collapse': ['jquery', 'bootstrap-transition'],
		'bootstrap-dropdown': ['jquery'],
		'bootstrap-modal': {
			deps: ['jquery', 'bootstrap-transition'],
			exports: '$.fn.modal'
		},
		'bootstrap-popover': ['jquery', 'bootstrap-tooltip'],
		'bootstrap-scrollspy': ['jquery'],
		'bootstrap-tab': ['jquery'],
		'bootstrap-typeahead': ['jquery'],
		'bootstrap-tooltip': {
			deps: ['jquery', 'bootstrap-transition'],
			exports: 'tooltip'
		},


		//Add depends to bootstrapper to load the angular app
		bootstrapper: {
			deps: [
				'app',
				'directives-module',
				'filters-module',
				'services-module',
				'models-module',
				'controllers-module',
				'routes'
			]
		},
		//angular schema form
		'angular-schema-form': ['angular', 'angular-sanitize', 'angular-schema-form-dependencies'],
		'angular-schema-form-boostrap': ['angular-schema-form'],

		'three': { exports: 'THREE' },
		'orbit-controls': { deps: ['three'] },
		'map-controls': { deps: ['three-projector'] },
		'three-projector': { deps: ['three'] },
		'three-svg-renderer': { deps: ['three'] },
		'three-octree': {deps: ['three'] },
		'canvg': { deps: ['rgbcolor'] },
		'rgbcolor': { deps: ['three'] },
		'stats': { exports: 'Stats' },
		'tween': { exports: 'TWEEN' },
		'gui': {exports: 'dat'},
		'stomp': { exports: 'Stomp' },
		'sockjs': { exports: 'SockJS' },
		'd3-threeD': { deps: ['d3-amd'] }
	}
});
