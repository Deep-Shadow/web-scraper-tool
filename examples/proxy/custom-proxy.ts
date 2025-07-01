import { WebScraper } from "../../src";

(async () => {
    const scraper = new WebScraper({
        proxy: {
            host: "your.proxy.com",
            port: 8080,
            protocol: "http",
            username: "user",
            password: "pass"
        }
    });

    const result = await scraper.scrape("https://protected-site.com");
    console.log("Proxy used:", result.proxyUsed);
})();
