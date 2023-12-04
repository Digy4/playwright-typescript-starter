import test from '@lib/BaseTest';
import {expect} from "@playwright/test";

// We can use Steps like in Cucmber format as shown below

test(`@Subex Verify Subex Home Page - Fail`, async ({ subexHomePage }) => {
    await test.step(`Navigate to Application`, async () => {
        await subexHomePage.navigateToURL();
    });
    await test.step(`Click on Finance link`, async () => {
        await subexHomePage.clickOnFinanceLink();
    });
    await test.step(`Schedule Demo`, async () => {
        await subexHomePage.scheduleDemo();
    });
    await test.step(`Error Reported`, async () => {
        let count = await subexHomePage.errorReported();
        await expect(count).toBeGreaterThan(0);
    });
});