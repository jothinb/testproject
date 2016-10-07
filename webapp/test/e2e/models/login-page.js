'use strict';

var LoginPage = function () {
	var username = by.id('username');
	var password =by.id('password');
	var loginButton = by.id('loginButton');
	var dashboardLink =by.linkText("Dashboard");

	this.login = function () {
		browser.driver.findElement(username).sendKeys('demo');
		browser.driver.findElement(password).sendKeys('demo');
		browser.driver.findElement(loginButton).click().then(function () {
			browser.driver.wait(function () {
				return browser.driver.isElementPresent(dashboardLink);
			}, 15000);
		});
		browser.driver.wait(function () {
			return browser.driver.isElementPresent(dashboardLink);
		}, 15000);
	};
};

module.exports = new LoginPage();