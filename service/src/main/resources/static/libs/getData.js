var unitData = null;
var getUnitData = function() {
	$.ajax({
		url: "http://localhost:8080/oasis/unit/type/C?location=all"
	}).then(function(data) {
		unitData=data;
	});
};

var craneData = null;
var getCraneData = function() {
	$.ajax({
		url: "http://localhost:8080/oasis/crane"
	}).then(function(data) {
		craneData=data;
	});
};

var locationData = null;
var getLocationData = function() {
	$.ajax({
		url: "http://localhost:8080/oasis/location/class/80"
	}).then(function(data) {
		locationData=data;
	});
}