var pathToJS = '';
if (document.URL.indexOf('components/toggle-switch') != -1) {
    pathToJS = 'components/toggle-switch/';
}

require.config({
  baseUrl: '/',
  paths: {
    'toggle-switch': pathToJS + 'src/js/toggle-switch',
    'oo-utils': 'components/oo-utils/src/js/oo-utils',
    'bootstrap-switch': 'components/bootstrap-switch/static/js/bootstrap-switch',
    jquery: 'components/jquery/jquery'
  },
    shim: {
        'bootstrap-switch': ['jquery']
    }
});
