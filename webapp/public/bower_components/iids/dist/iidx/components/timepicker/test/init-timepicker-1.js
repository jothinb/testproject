require.config(
	{
		baseUrl: '../'
	});

require(
	[
		'jquery',
		'timepicker'
	], function($) {

		$('#timepicker1').timepicker({explicitMode:true,retainInvalid:true});

	});