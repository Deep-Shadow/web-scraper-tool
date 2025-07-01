import { WebScraper } from "../../src";
import fs from "fs";

async function aggregateNews(sources: string[]) {
    const scraper = new WebScraper({
        outputFormat: "html",
        minDelayBetweenRequests: 3000
    });

    const articles = [];

    for (const source of sources) {
        const result = await scraper.scrape(source);
        if (result.success) {
            articles.push({
                source,
                content: result.data
            });
        }
    }

    fs.writeFileSync("news_aggregate.json", JSON.stringify(articles, null, 2));
}

aggregateNews([
    "https://news-site1.com/latest",
    "https://news-site2.com/headlines",
    "https://news-site3.com/today"
]);
