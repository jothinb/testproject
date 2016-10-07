describe('Login', function() {

	var username = by.id('username');
	var password =by.id('password');
	var loginButton = by.id('loginButton');
	var dashboardLink =by.linkText("Dashboard");

	it('should launch to TSO page ', function () {
		browser.driver.findElement(username).sendKeys('demo');
		browser.driver.findElement(password).sendKeys('demo');
		browser.driver.findElement(loginButton).click();
	});
});

