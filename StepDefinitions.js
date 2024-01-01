const { Given, When, Then } = require('cucumber');
const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');

let driver;

Given('I navigate to the retirement calculator website', async function () {
    const chromeOptions = new Options();
    chromeOptions.addArguments('--start-maximized');
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();
    await driver.get('https://www.securian.com/insights-tools/retirement-calculator.h');
});

When('I enter the retirement details', async function () {
    await driver.findElement(By.id('current-age')).sendKeys('40');
    await driver.findElement(By.id('retirement-age')).sendKeys('68');
    await driver.findElement(By.id('current-income')).click();
    await driver.findElement(By.id('current-income')).sendKeys('100000');
    await driver.findElement(By.id('spouse-income')).sendKeys('75000');
    await driver.findElement(By.id('current-total-savings')).click();
    await driver.findElement(By.id('current-total-savings')).sendKeys('500000');
    await driver.findElement(By.id('current-annual-savings')).click();
    await driver.findElement(By.id('current-annual-savings')).sendKeys('10');
    await driver.findElement(By.id('savings-increase-rate')).click();
    await driver.findElement(By.id('savings-increase-rate')).sendKeys('0.25');
    await driver.findElement(By.xpath("//label[text()='Yes'][@for='yes-social-benefits']")).click();
    await driver.sleep(3000);
    const marriedRadio = await driver.findElement(By.xpath("//input[@id='married']"));
        await driver.executeScript("arguments[0].scrollIntoView(false)", marriedRadio);
        await driver.executeScript("arguments[0].click()", marriedRadio);

        await driver.findElement(By.id('social-security-override')).click();
        await driver.findElement(By.id('social-security-override')).sendKeys('4000');
        await driver.findElement(By.xpath("//a[text()='Adjust default values']")).click();
        await driver.sleep(3000);
        await driver.findElement(By.id('additional-income')).click();
        await driver.findElement(By.id('additional-income')).sendKeys('500');
        await driver.findElement(By.id('retirement-duration')).sendKeys('20');
        await driver.findElement(By.xpath("//label[text()='Yes'][@for='include-inflation']")).click();
        
        const inflationRate = await driver.findElement(By.xpath("//input[@id='expected-inflation-rate']"));
        await driver.executeScript("arguments[0].scrollIntoView(false)", inflationRate);
        await driver.executeScript("arguments[0].click()", inflationRate);

        await driver.findElement(By.xpath("//input[@id='expected-inflation-rate']")).sendKeys('75');
        await driver.findElement(By.xpath("//input[@id='retirement-annual-income']")).sendKeys('75');
        await driver.findElement(By.id('pre-retirement-roi')).sendKeys('8');
        await driver.findElement(By.id('post-retirement-roi')).sendKeys('5');
        await driver.findElement(By.xpath("//button[text()='Save changes']")).click();

        const buttonCalculate = await driver.findElement(By.xpath("//button[text()='Calculate']"));
        await driver.executeScript("arguments[0].scrollIntoView(false)", buttonCalculate);
        await buttonCalculate.click();
        await driver.sleep(3000);

        

});

When('I click on calculate', async function () {
    await driver.findElement(By.xpath("//button[text()='Calculate']")).click();
});

Then('I verify minimum retirement and savings', async function () {
    const minimumRetirement = await driver.findElement(By.xpath("//th[text()='Minimum needed to retire']//preceding-sibling::td")).getText();
    console.log('Minimum needed to retire: ', minimumRetirement);

    const saved = await driver.findElement(By.xpath("//th[text()='What you have saved']//preceding-sibling::td")).getText();
    console.log('What you have saved: ', saved);

    await driver.quit();
});
