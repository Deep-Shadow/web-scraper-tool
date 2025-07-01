import { WebScraper } from "../../src";
import { Logger } from "../../src/utils/logger";

const urls = [
    "https://example.com/page1",
    "https://example.com/page2",
    "https://example.com/page3"
];

(async () => {
    try {
        Logger.info("Starting multiple requests with random proxies example");

        const scraper = new WebScraper({
            useRandomProxies: true,
            retryCount: 5
        });

        const results = await WebScraper.batchScrape(
            urls,
            {
                outputFormat: "xml"
            },
            2
        );

        Logger.success("All requests completed");
        console.log(results);
    } catch (error) {
        Logger.error("Error in multiple requests example", error);
    }
})();
