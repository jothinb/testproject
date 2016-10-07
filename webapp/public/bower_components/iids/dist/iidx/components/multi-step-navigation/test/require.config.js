var pathToJS = '';
if (document.URL.indexOf('components/multi-step-navigation') != -1) {
    pathToJS = 'components/multi-step-navigation/';
}

require.config({
	  paths: {
		  'twitter-bootstrap-wizard': 'components\\twitter-bootstrap-wizard\\jquery.bootstrap.wizard',
            jquery: 'components\\jquery\\jquery',
            'multi-step-navigation': pathToJS + 'js\\multi-step-navigation',
            'ge-bootstrap': 'components\\ge-bootstrap\\js\\ge-bootstrap',
            'bootstrap': 'components/bootstrap/js'
	        
	  }
	});

