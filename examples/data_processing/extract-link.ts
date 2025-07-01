import { WebScraper } from "../../src";
import { DataFormatter } from "../../src/utils/DataFormatter";

(async () => {
    const scraper = new WebScraper();
    const result = await scraper.scrape("https://example.com");

    if (result.success) {
        const links = DataFormatter.extractLinks(
            result.data,
            "https://example.com"
        );
        console.log("Found links:", links);
    }
})();
