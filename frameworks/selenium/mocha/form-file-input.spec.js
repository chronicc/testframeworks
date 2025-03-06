const {By, until} = require('selenium-webdriver');
const remote = require('selenium-webdriver/remote');
const assert = require('assert');
const path = require('path');

const env = process.env.ENVIRONMENT || 'local';
const {browsers, setupDriver, teardownDriver} = require('./_setup-' + env);

describe('Form File Input', function () {
  let resourcesDir = __dirname + '/resources/';

  browsers.forEach((browser) => {
    let driver;

    before(async () => {
      driver = await setupDriver(browser);
      driver.setFileDetector(new remote.FileDetector());
    });
    after(async () => await teardownDriver(driver));

    it(browser + ': Should be able to upload a file successfully', async function () {
      const textFile = path.resolve(resourcesDir + 'helloworld.txt');
      await driver.manage().setTimeouts({implicit: 500});

      await driver.get('https://the-internet.herokuapp.com/upload');

      let title = await driver.getTitle();
      assert.equal('The Internet', title);

      await driver.findElement(By.id('file-upload')).sendKeys(textFile);
      await driver.findElement(By.id('file-submit')).submit();

      const revealed = await driver.findElement(By.id('uploaded-files'))
      await driver.wait(until.elementIsVisible(revealed), 2000);
      const data = await driver.findElement(By.css('h3'));

      assert.equal(await data.getText(), `File Uploaded!`);
    });
  });
});
