import { WebScraper } from "../../src";

async function scrapePaginated(baseUrl: string, pages: number) {
    const scraper = new WebScraper({
        minDelayBetweenRequests: 2000,
        maxDelayBetweenRequests: 5000
    });

    for (let i = 1; i <= pages; i++) {
        const url = `${baseUrl}?page=${i}`;
        const result = await scraper.scrape(url, "json");

        if (result.success) {
            console.log(`Page ${i} data:`, result.data);
        } else {
            console.error(`Failed page ${i}:`, result.error);
        }
    }
}

scrapePaginated("https://example.com/products", 5);
