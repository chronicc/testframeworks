const {Browser, Builder} = require('selenium-webdriver');

module.exports = {
  browsers: [Browser.CHROME, Browser.FIREFOX, Browser.EDGE],
  setupDriver: async function (browser) {
    let driver = await new Builder()
    .forBrowser(browser)
    .build();
    return driver;
  },
  teardownDriver: async function (driver) {
    await driver.quit()
  }
};
