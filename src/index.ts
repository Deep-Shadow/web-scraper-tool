import fs from "fs";
import path from "path";

import config from "./config";
import { Logger } from "./utils/Logger";
import { Security } from "./utils/Security";
import { DataFormatter } from "./utils/DataFormatter";
import { IScraperOptions, IScraperResult } from "./types";
import { Request } from "./services/Request";

export class WebScraper {
    constructor(private options: Partial<IScraperOptions> = {}) {}

    public async scrape(
        url: string,
        outputFormat?: "json" | "html" | "xml" | "txt"
    ): Promise<IScraperResult> {
        const scrapeOptions: IScraperOptions = {
            url,
            outputFormat: outputFormat || config.outputFormat,
            ...this.options
        };

        Logger.info(`Starting scrape for: ${url}`);
        Logger.debug(`Options: ${JSON.stringify(scrapeOptions, null, 2)}`);

        const handler = new Request(scrapeOptions);
        const result = await handler.scrape();

        if (result.success) {
            await this.saveResult(url, result.data, scrapeOptions.outputFormat);
            Logger.success(`Scrape completed successfully for: ${url}`);
        } else {
            Logger.error(`Scrape failed for: ${url}`);
        }

        return result;
    }

    private async saveResult(
        url: string,
        data: any,
        format: "json" | "html" | "xml" | "txt" = "json"
    ): Promise<void> {
        try {
            if (!fs.existsSync(config.outputDir)) {
                fs.mkdirSync(config.outputDir, { recursive: true });
            }

            const domain = Security.sanitizeInput(
                new URL(url).hostname.replace("www.", "")
            );
            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            const filename = `${domain}_${timestamp}.${format}`;
            const filePath = path.join(config.outputDir, filename);

            const content = DataFormatter.format(data, format);
            fs.writeFileSync(filePath, content);

            Logger.info(`Result saved to: ${filePath}`);
        } catch (error) {
            Logger.error(`Failed to save result: ${error}`);
            throw error;
        }
    }

    public static async batchScrape(
        urls: string[],
        options: Partial<IScraperOptions> = {},
        batchSize = 5
    ): Promise<IScraperResult[]> {
        const results: IScraperResult[] = [];

        for (let i = 0; i < urls.length; i += batchSize) {
            const batch = urls.slice(i, i + batchSize);
            const batchResults = await Promise.all(
                batch.map(url => new WebScraper(options).scrape(url))
            );
            results.push(...batchResults);
        }

        return results;
    }
}
