import { WebScraper } from "../../src";
import { Logger } from "../../src/utils/Logger";

(async () => {
    try {
        Logger.info("Starting simple scrape example");

        const scraper = new WebScraper();
        const result = await scraper.scrape("https://example.com");

        Logger.success("Scrape completed successfully");
        console.log(result.data);
    } catch (error) {
        Logger.error("Error in simple scrape", error);
    }
})();
