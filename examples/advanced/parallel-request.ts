import { WebScraper } from "../../src";

const urls = [
    "https://example.com/product/1",
    "https://example.com/product/2",
    "https://example.com/product/3"
];

(async () => {
    const results = await WebScraper.batchScrape(urls, {
        outputFormat: "json",
        maxConcurrentRequests: 2
    });

    results.forEach((result, index) => {
        console.log(
            `Result ${index + 1}:`,
            result.success ? "Success" : "Failed"
        );
    });
})();
