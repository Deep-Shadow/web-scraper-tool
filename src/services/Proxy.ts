import axios from "axios";
import { Logger } from "../utils/Logger";
import { IProxy } from "../interfaces/IProxy";
import { Delay } from "../utils/Delay";
import { Security } from "../utils/Security";

const PROXY_API_URL =
    "https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all";

export class Proxy {
    private static cachedProxies: IProxy[] = [];
    private static lastFetchTime: number = 0;

    public static async getRandomProxy(): Promise<IProxy> {
        try {
            if (
                this.cachedProxies.length === 0 ||
                Date.now() - this.lastFetchTime > 3600000
            ) {
                await this.fetchProxiesFromAPI();
            }

            const randomIndex = Math.floor(
                Math.random() * this.cachedProxies.length
            );
            return this.cachedProxies[randomIndex];
        } catch (error: unknown) {
            Logger.error(
                "Failed to get random proxy",
                error instanceof Error ? error : new Error(String(error))
            );
            throw error;
        }
    }

    private static async fetchProxiesFromAPI(): Promise<void> {
        try {
            Logger.info("Fetching fresh proxies from API...");
            await Delay.randomDelay();

            const response = await axios.get(PROXY_API_URL, {
                timeout: 15000,
                headers: Security.getSecureHeaders()
            });

            const proxyList = response.data
                .split("\r\n")
                .filter((line: string) => line.trim());

            this.cachedProxies = proxyList.map((proxy: string) => {
                const [host, port] = proxy.split(":");
                return {
                    host,
                    port: parseInt(port),
                    protocol: "http",
                    anonymityLevel: "high",
                    lastChecked: new Date().toISOString()
                };
            });

            this.lastFetchTime = Date.now();
            Logger.success(
                `Successfully fetched ${this.cachedProxies.length} fresh proxies`
            );
        } catch (error: unknown) {
            Logger.error(
                "Failed to fetch proxies from API",
                error instanceof Error ? error : new Error(String(error))
            );
            throw error;
        }
    }

    public static async validateProxy(proxy: IProxy): Promise<boolean> {
        try {
            const testUrl = "http://httpbin.org/ip";
            const response = await axios.get(testUrl, {
                proxy: {
                    host: proxy.host,
                    port: proxy.port
                },
                timeout: 10000
            });

            return response.status === 200;
        } catch {
            return false;
        }
    }
}
