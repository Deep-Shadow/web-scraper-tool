import { WebScraper } from "../../src";

(async () => {
    const scraper = new WebScraper({
        outputFormat: "xml",
        headers: {
            "Accept-Language": "en-US,en;q=0.9",
            "X-Custom-Header": "MyScraper/1.0"
        },
        deviceType: "mobile",
        maxConcurrentRequests: 3,
        minDelayBetweenRequests: 2000,
        maxDelayBetweenRequests: 8000
    });

    const result = await scraper.scrape("https://api.example.com/mobile-data");
    console.log("Mobile-optimized result:", result);
})();
