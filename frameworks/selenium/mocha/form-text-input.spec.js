const {By, Browser, Builder} = require('selenium-webdriver');
const assert = require('assert');

const env = process.env.ENVIRONMENT || 'local';
const {browsers, setupDriver, teardownDriver} = require('./_setup-' + env);

describe('Form Text Input', function () {
  browsers.forEach((browser) => {
    let driver;

    before(async () => {
      driver = await setupDriver(browser);
    });
    after(async () => await teardownDriver(driver));

    it(browser + ': Should enter a value in the text input', async function () {
      await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

      let title = await driver.getTitle();
      assert.equal('Web form', title);

      await driver.manage().setTimeouts({implicit: 500});

      let textElement = await driver.findElement(By.name('my-text'));
      await textElement.sendKeys('Selenium');

      let submitButton = await driver.findElement(By.css('button'));
      await submitButton.click();

      let message = await driver.findElement(By.id('message'));
      let value = await message.getText();
      assert.equal('Received!', value);
    });

    it(browser + ': Should enter a value in the textarea input', async function () {
      await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

      let title = await driver.getTitle();
      assert.equal('Web form', title);

      await driver.manage().setTimeouts({implicit: 500});

      let textElement = await driver.findElement(By.name('my-textarea'));
      await textElement.sendKeys('Selenium');

      let submitButton = await driver.findElement(By.css('button'));
      await submitButton.click();

      let message = await driver.findElement(By.id('message'));
      let value = await message.getText();
      assert.equal('Received!', value);
    });
  });
});
