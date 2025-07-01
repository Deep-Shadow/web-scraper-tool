import { IScraperOptions } from "./IScraperOptions";

export interface IConfig extends IScraperOptions {
    outputDir: string;
    maxConcurrentRequests: number;
    minDelayBetweenRequests: number;
    maxDelayBetweenRequests: number;
    proxyRotationInterval: number;
    cacheEnabled: boolean;
    cacheTTL: number;
}
