import { expect, Locator, Page } from "@playwright/test";
import * as csv from '@fast-csv/parse';

export class Helper {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async pause(ms: number) {
        await this.page.waitForTimeout(ms); // wait for x milliseconds
    }

    async clickWithFallback(locator: Locator) {
        try {
            await locator.click({ timeout: 5000 });
            return;
        } catch {
            // Firefox can occasionally hang after actionability checks.
        }

        try {
            await locator.click({ timeout: 5000, force: true });
            return;
        } catch {
            await locator.dispatchEvent('click');
        }
    }

    async getLinkOnCSV(rowNum: number, header: string) {
        // sample:  await this.page.goto(await this.h.getLinkOnCSV([row],[headerValue]));
        let myObject: any = new Promise((resolve) => {
            let dataArray: JSON[] = [];
            csv.parseFile("./test-data/linkFile.csv", { headers: true })
                .on("data", (data) => {
                    dataArray.push(data);
                })
                .on("end", () => {
                    resolve(dataArray);
                });
        });
        let output = await myObject;
        let dataVal = output[rowNum][header];
        return dataVal;
    }

    getRandomNumber(min: number = 1, max: number = 5): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    buildInternalUrls(paths: string[]) {
        const origin = new URL(this.page.url()).origin;
        return paths.map((path) => `${origin}${path.startsWith('/') ? path : `/${path}`}`);
    }

    async verifyUrlsApiResponses(
        urls: string[],
        options?: { timeout?: number; urlType?: string }
    ) {
        const timeout = options?.timeout ?? 15000;
        const urlType = options?.urlType ?? 'URL';

        for (const url of urls) {
            const response = await this.page.request.get(url, { timeout });
            expect(response.status(), `Expected ${urlType} to be reachable: ${url}`).toBeGreaterThanOrEqual(200);
            expect(response.status(), `Expected ${urlType} to be reachable: ${url}`).toBeLessThan(400);
        }
    }

    async verifyInternalPathsApiResponses(
        paths: string[],
        options?: { timeout?: number }
    ) {
        const urls = this.buildInternalUrls(paths);
        await this.verifyUrlsApiResponses(urls, { timeout: options?.timeout ?? 15000, urlType: 'internal URL' });
    }
}
