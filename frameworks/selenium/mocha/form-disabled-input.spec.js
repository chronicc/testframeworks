const {By, Browser, Builder} = require('selenium-webdriver');
const assert = require('assert');

const env = process.env.ENVIRONMENT || 'local';
const {browsers, setupDriver, teardownDriver} = require('./_setup-' + env);

describe('Form Disabled Input', function () {
  browsers.forEach((browser) => {
    let driver;

    before(async () => {
      driver = await setupDriver(browser);
    });
    after(async () => await teardownDriver(driver));

    it(browser + ': Should not enter a value in the disabled text input', async function () {
      await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

      let title = await driver.getTitle();
      assert.equal('Web form', title);

      await driver.manage().setTimeouts({implicit: 500});

      let textElement = await driver.findElement(By.name('my-disabled'));
      try {
        await textElement.sendKeys('Selenium');
        throw new Error('The element should not be enabled');
      } catch (err) {
        assert.equal('ElementNotInteractableError', err.name);
      }
    });
  });
});
