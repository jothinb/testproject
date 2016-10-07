require.config({
    baseUrl: '../',
    paths: {
        jquery: 'components/jquery/jquery',
        bootstrap: 'components/bootstrap/js',
        'twitter-bootstrap-wizard': 'jquery.bootstrap.wizard'
    },
    shim: {
        'bootstrap/tab': ['jquery']
    }
});
