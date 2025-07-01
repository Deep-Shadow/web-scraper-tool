import { WebScraper } from "../../src";

(async () => {
    const scraper = new WebScraper();
    const result = await scraper.scrape("https://api.example.com/data", "json");

    if (result.success) {
        console.log("Formatted JSON data:", result.data);
    } else {
        console.error("Failed:", result.error);
    }
})();
