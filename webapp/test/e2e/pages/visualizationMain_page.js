var visualPage = function() {

	this.myDataTab = function () {return element(by.css('a[href="#/tso-mydata"]'))};
	this.myVisualTab = function () {return element(by.css('a[href="#/tso"]'))};

	this.addVisual = function () { return element(by.css('[ng-click="addVisual()"]'))};

	this.vModalTitle = function(){ return element(by.id('myModalLabel'));};
	this.DatasetError = function(){ return element(by.id('DatasetError'));};
	this.cancelVisual = function () { return element(by.css('[ng-click="cancelVisual()"]'))};
	this.createVisual = function () { return element(by.css('[ng-click="createVisual()"]'))};

	this.ChartType = function(){ return element(by.id('ChartType'));};
	this.ChartTypeOptions = function(){ return element(by.css('#ChartType > option:nth-child(2)'));};
	this.title = function(){ return element(by.id('title'));};
	this.subtitle = function(){ return element(by.id('subtitle'));};
	this.markerName = function(){ return element(by.id('markerName'));};
	this.table = function(){ return element(by.id('table'));};
	this.tableOptions = function(){ return element(by.css('#table > option:nth-child(2)'));};
	this.Street = function(){ return element(by.id('Street'));};
	this.StreetOptions = function(){ return element(by.css('#Street > option:nth-child(3)'));};
	this.City = function(){ return element(by.id('City'));};
	this.CityOptions = function(){ return element(by.css('#City > option:nth-child(4)'));};
	this.State = function(){ return element(by.id('State'));};
	this.StateOptions = function(){ return element(by.css('#State > option:nth-child(5)'));};
	this.ZipCode = function(){ return element(by.id('ZipCode'));};
	this.ZipCodeOptions = function(){ return element(by.css('#ZipCode > option:nth-child(6)'));};
	this.Country = function(){ return element(by.id('Country'));};
	this.CountryOptions = function(){ return element(by.css('#Country > option:nth-child(7)'));};
	this.Label = function(){ return element(by.id('Label'));};
	this.LabelOptions = function(){ return element(by.css('#Label > option:nth-child(2)'));};
	this.Information = function(){ return element(by.id('Information'));};
	this.InformationOptions = function(){ return element(by.css('#Information > option:nth-child(2)'));};



};

module.exports = new visualPage();