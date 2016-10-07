describe('My Visualization Passing from one tab to other', function() {

	it('should click on my Data Tab', function () {
		browser.driver.sleep(1000);
		visualPage.myDataTab().click()
			.then(function () {
				expect(visualPage.myDataTab().isPresent()).toBe(true);
		});
	});
	it('should click on My Visualization Tab', function () {
		visualPage.myVisualTab().click()
			.then(function () {
				expect(visualPage.myVisualTab().isPresent()).toBe(true);
		});
	});
	it('should click on my Data Tab again', function () {
		visualPage.myDataTab().click()
			.then(function () {
				expect(visualPage.myDataTab().isPresent()).toBe(true);
		});
	});
	it('should click on My Visualization Tab again', function () {
		visualPage.myVisualTab().click()
			.then(function () {
				expect(visualPage.myVisualTab().isPresent()).toBe(true);
		});
	});

});

describe('My Visualization Opening up the Add Visualization Modal and configuring it', function() {

	it('should click on + Add Visualization', function () {
		visualPage.addVisual().click()
			.then(function () {
				expect(visualPage.vModalTitle().isPresent()).toBe(true);
		});
	});
	it('should close the modal', function () {
		visualPage.cancelVisual().click();
	});
	it('should open the modal again', function () {
		visualPage.addVisual().click()
			.then(function () {
				expect(visualPage.vModalTitle().isPresent()).toBe(true);
			});
	});

	describe('Add Visualization Modal checking for Validation', function() {

		it('should click on ChartType and pick Geo Location', function () {
			visualPage.ChartType().click()
				.then(function () {
					visualPage.ChartTypeOptions().click();
				});
		});
		it('should click on title and type in main Title', function () {
			visualPage.title().click()
				.then(function () {
					visualPage.title().sendKeys('Main Title');
				});
		});
		it('should click on subtitle and type in sub Title', function () {
			visualPage.subtitle().click()
				.then(function () {
					visualPage.subtitle().sendKeys('Sub Title');
				});
		});
		it('should click on collection and type in marker 1', function () {
			visualPage.markerName().click()
				.then(function () {
					visualPage.markerName().sendKeys('Marker 1');
				});
		});
		it('should click on Table and pick first choose', function () {
			visualPage.table().click()
				.then(function () {
					visualPage.tableOptions().click()
				});
		});
		it('should click on Street and choose a option', function () {
			visualPage.Street().click()
				.then(function () {
					visualPage.StreetOptions().click()
				});
		});
		it('should click on City and choose a option', function () {
			visualPage.City().click()
				.then(function () {
					visualPage.CityOptions().click()
				});
		});
		it('should click on State and choose a option', function () {
			visualPage.State().click()
				.then(function () {
					visualPage.StateOptions().click()
				});
		});
		it('should click on ZipCode and choose a option', function () {
			visualPage.ZipCode().click()
				.then(function () {
					visualPage.ZipCodeOptions().click()
				});
		});
		it('should click on Country and choose a option', function () {
			visualPage.Country().click()
				.then(function () {
					visualPage.CountryOptions().click()
				});
		});
		it('should click on Table and choose a option', function () {
			visualPage.table().click()
				.then(function () {
					visualPage.tableOptions().click()
				});
		});
		it('should click on Label and choose a option', function () {
			visualPage.Label().click()
				.then(function () {
					visualPage.LabelOptions().click()
				});
		});
		it('should click on Information and choose a option', function () {
			visualPage.Information().click()
				.then(function () {
					visualPage.InformationOptions().click()
				});
		});
		it('should click on Create button and map should load', function () {
			visualPage.createVisual().click();
		});
	});
});