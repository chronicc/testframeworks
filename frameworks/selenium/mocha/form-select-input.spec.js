const {By, Browser, Builder, Select} = require('selenium-webdriver');
const assert = require("assert");

const env = process.env.ENVIRONMENT || 'local';
const {browsers, setupDriver, teardownDriver} = require('./_setup-' + env);

describe('Form Select Input', function () {
  browsers.forEach((browser) => {
    let driver;

    before(async () => {
      driver = await setupDriver(browser);
    });
    after(async () => await teardownDriver(driver));

    it(browser + ': Should select different options', async function () {
      await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

      let title = await driver.getTitle();
      assert.equal("Web form", title);

      await driver.manage().setTimeouts({implicit: 500});

      const selectElement = await driver.findElement(By.name('my-select'));
      const select = new Select(selectElement);
      const submitButton = await driver.findElement(By.css('button'));

      const option1 = await driver.findElement(By.css('option[value="1"]'));
      const option2 = await driver.findElement(By.css('option[value="2"]'));
      const option3 = await driver.findElement(By.css('option[value="3"]'));

      await select.selectByVisibleText('One');
      assert.equal(true, await option1.isSelected());

      await select.selectByValue('2');
      assert.equal(true, await option2.isSelected());

      await select.selectByIndex(3);
      assert.equal(true, await option3.isSelected());

      await submitButton.click();

      let message = await driver.findElement(By.id('message'));
      let value = await message.getText();
      assert.equal("Received!", value);
    });
  });
});
