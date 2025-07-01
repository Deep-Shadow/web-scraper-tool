import { WebScraper } from "../../src";
import { Logger } from "../../src/utils/Logger";

interface Product {
    name: string;
    price: number;
    inStock: boolean;
}

async function monitorPrices(url: string, interval: number) {
    const scraper = new WebScraper({
        useRandomProxies: true,
        outputFormat: "json"
    });

    setInterval(async () => {
        Logger.info(`Checking prices at ${new Date().toISOString()}`);

        const result = await scraper.scrape(url);
        if (result.success) {
            const product: Product = result.data;
            Logger.success(
                `Current price for ${product.name}: $${product.price}`
            );
        }
    }, interval);
}

monitorPrices("https://ecommerce.com/api/product/123", 3600000);
