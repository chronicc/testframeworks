const {By, Browser, Builder, Key} = require('selenium-webdriver');
const assert = require('assert');

const env = process.env.ENVIRONMENT || 'local';
const {browsers, setupDriver, teardownDriver} = require('./_setup-' + env);

describe('Form Range Input', function () {
  browsers.forEach((browser) => {
    let driver;

    before(async () => {
      driver = await setupDriver(browser);
    });
    after(async () => await teardownDriver(driver));

    it(browser + ': Should move the handle to the right on the range input', async function () {
      await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

      let title = await driver.getTitle();
      assert.equal('Web form', title);

      await driver.manage().setTimeouts({implicit: 500});

      let rangeElement = await driver.findElement(By.name('my-range'));
      await rangeElement.sendKeys(Key.ARROW_RIGHT);
      let rangeValue = await rangeElement.getAttribute('value');
      assert.equal('6', rangeValue);
    });

    it(browser + ': Should move the handle to the left on the range input', async function () {
      await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

      let title = await driver.getTitle();
      assert.equal('Web form', title);

      await driver.manage().setTimeouts({implicit: 500});

      let rangeElement = await driver.findElement(By.name('my-range'));
      await rangeElement.sendKeys(Key.ARROW_LEFT);
      let rangeValue = await rangeElement.getAttribute('value');
      assert.equal('4', rangeValue);
    });
  });
});
