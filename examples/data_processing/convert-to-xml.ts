import { WebScraper } from "../../src";
import { DataFormatter } from "../../src/utils/DataFormatter";

(async () => {
    const scraper = new WebScraper();
    const result = await scraper.scrape("https://api.example.com/data", "json");

    if (result.success) {
        const xmlData = DataFormatter.toXml(result.data, "apiResponse");
        console.log("XML Output:");
        console.log(xmlData);
    }
})();
