import path from "path";
import { IConfig } from "./interfaces/IConfig";

const config: Partial<IConfig> = {
    outputDir: path.join(__dirname, "../output"),
    outputFormat: "json",
    useRandomProxies: false,
    retryCount: 3,
    timeout: 30000,
    maxRedirects: 5,
    followRedirects: true,
    maxConcurrentRequests: 5,
    minDelayBetweenRequests: 1000,
    maxDelayBetweenRequests: 5000,
    proxyRotationInterval: 3600000,
    cacheEnabled: true,
    cacheTTL: 86400000
};

export default config as IConfig;