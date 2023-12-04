import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';

let webActions: WebActions;

export class SubexHome {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly FINANCE_LINK: Locator;
    readonly TECH_LINK: Locator;
    readonly MARKETING_LINK: Locator;
    readonly BLOG_LINK: Locator;
    readonly REQUEST_DEMO: Locator;
    readonly SCHEDULE_DEMO: Locator;
    readonly EMAIL_INPUT: Locator;
    readonly ERROR: Locator;
    readonly DEFAULT_WAIT_IN_MS: number = 2 * 1000

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.FINANCE_LINK = page.locator('a:visible', { hasText: "Finance" });
        this.TECH_LINK = page.locator('a:visible', { hasText: "Technology" });
        this.MARKETING_LINK = page.locator('a:visible', { hasText: "Marketing" });
        this.BLOG_LINK = page.locator('a:visible', { hasText: "Blog" });
        this.REQUEST_DEMO = page.locator('a:visible', { hasText: "Request Demo" });
        this.SCHEDULE_DEMO = page.locator('//button[@type="submit"]');
        this.EMAIL_INPUT = page.locator('//input[@type="email"]');
        this.ERROR = page.locator('//div', { hasText: "One or more fields have an error. Please check and try again." });
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto("/");
    }

    async clickOnFinanceLink(): Promise<void> {
        await this.FINANCE_LINK.click();
        await this.page.waitForTimeout(this.DEFAULT_WAIT_IN_MS);
    }

    async clickOnTechLink(): Promise<void> {
        await this.TECH_LINK.click();
        await this.page.waitForTimeout(this.DEFAULT_WAIT_IN_MS);
    }

    async clickOnMarketingLink(): Promise<void> {
        await this.MARKETING_LINK.click();
        await this.page.waitForTimeout(this.DEFAULT_WAIT_IN_MS);
    }

    async clickOnBlogLink(): Promise<void> {
        await this.MARKETING_LINK.click();
        await this.page.waitForTimeout(this.DEFAULT_WAIT_IN_MS);
    }

    async clickOnRequestDemo(): Promise<void> {
        await this.REQUEST_DEMO.first().click();
        await this.page.waitForTimeout(this.DEFAULT_WAIT_IN_MS);
    }

    async scheduleDemo(): Promise<void> {
        await expect(this.EMAIL_INPUT.first()).toBeVisible({ timeout: 5000 })
        await this.EMAIL_INPUT.first().fill('example@example.com');
        await this.page.waitForTimeout(this.DEFAULT_WAIT_IN_MS);
        await this.page.locator('//input[@type="text"]').first().fill('Jo Bloggs');
        await this.page.waitForTimeout(this.DEFAULT_WAIT_IN_MS);
        await this.SCHEDULE_DEMO.click();
        await this.page.waitForTimeout(this.DEFAULT_WAIT_IN_MS);
    }

    async errorReported(): Promise<number> {
        return await this.ERROR.count();
    }

}