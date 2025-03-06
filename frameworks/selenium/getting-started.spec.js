const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require('assert');

(async function firstTest() {
    let driver;

    try {
        // Start the session
        // https://www.selenium.dev/documentation/webdriver/drivers/
        driver = await new Builder().forBrowser(Browser.CHROME).build();

        // Open web page in browser
        // https://www.selenium.dev/documentation/webdriver/interactions/navigation/
        await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

        // Request browser information
        // https://www.selenium.dev/documentation/webdriver/interactions/
        let title = await driver.getTitle();

        // Establish Waiting Strategy
        // https://www.selenium.dev/documentation/webdriver/waits/
        await driver.manage().setTimeouts({implicit: 500});

        // Find an element
        // https://www.selenium.dev/documentation/webdriver/elements/
        let textBox = await driver.findElement(By.name('my-text'));
        let submitButton = await driver.findElement(By.css('button'));

        // Take action on element
        // https://www.selenium.dev/documentation/webdriver/elements/interactions/
        await textBox.sendKeys('Selenium');
        await submitButton.click();

        // Request element information
        // https://www.selenium.dev/documentation/webdriver/elements/information/
        let message = await driver.findElement(By.id('message'));
        let value = await message.getText();
        assert.equal("Received!", value);
    } catch (e) {
        console.log(e);
    } finally {
        // Close the session
        // https://www.selenium.dev/documentation/webdriver/drivers/#quitting-sessions
        await driver.quit();
    }
}())
