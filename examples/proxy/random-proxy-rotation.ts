import { WebScraper } from "../../src";

(async () => {
    const scraper = new WebScraper({
        useRandomProxies: true,
        proxyRotationInterval: 300000
    });

    // First request
    const result1 = await scraper.scrape("https://protected-site.com/page1");
    console.log("First proxy:", result1.proxyUsed);

    // Second request will likely use different proxy
    const result2 = await scraper.scrape("https://protected-site.com/page2");
    console.log("Second proxy:", result2.proxyUsed);
})();
