import { IProxy } from "./IProxy";

export interface IScraperOptions {
    url: string;
    outputFormat?: "json" | "html" | "xml" | "txt";
    headers?: Record<string, string>;
    proxy?: IProxy;
    useRandomProxies?: boolean;
    retryCount?: number;
    timeout?: number;
    minDelayBetweenRequests?: number;
    maxDelayBetweenRequests?: number;
    maxConcurrentRequests?: number;
    maxRedirects?: number;
    followRedirects?: boolean;
    deviceType?: "desktop" | "mobile" | "tablet";
}
