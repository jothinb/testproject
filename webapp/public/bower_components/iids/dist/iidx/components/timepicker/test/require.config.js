require.config({
  baseUrl: '../../',
  paths: {
    'jquery': 'lib/jquery/jquery',
    'timepicker': 'js/timepicker',
    'oo-utils': 'lib/oo-utils/src/js/oo-utils',
    'bootstrap-timepicker': 'lib/bootstrap-timepicker/js/bootstrap-timepicker'
  },
  'shim': {
      'bootstrap-timepicker': ['jquery']
  }
});