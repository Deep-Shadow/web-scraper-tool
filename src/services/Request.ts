import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosProxyConfig
} from "axios";
import { IProxy } from "../interfaces/IProxy";
import { IScraperOptions, IScraperResult } from "../types";
import { Logger } from "../utils/Logger";
import { Delay } from "../utils/Delay";
import { Security } from "../utils/Security";
import { DataFormatter } from "../utils/DataFormatter";
import { Proxy } from "./Proxy";
import config from "../config";

export class Request {
    private axiosInstance: AxiosInstance;
    private retryCount: number = 0;

    constructor(private options: IScraperOptions) {
        this.axiosInstance = axios.create();
    }

    public async init(): Promise<void> {
        this.axiosInstance = await this.createAxiosInstance();
    }

    private async createAxiosInstance(): Promise<AxiosInstance> {
        const axiosConfig: AxiosRequestConfig = {
            timeout: this.options.timeout || config.timeout,
            maxRedirects: this.options.maxRedirects || config.maxRedirects,
            headers: {
                ...Security.getSecureHeaders(),
                ...this.options.headers
            }
        };

        if (this.options.proxy || this.options.useRandomProxies) {
            const proxyConfig = await this.getProxyConfig();
            if (proxyConfig) {
                axiosConfig.proxy = proxyConfig;
            }
        }

        return axios.create(axiosConfig);
    }

    private async getProxyConfig(): Promise<AxiosProxyConfig | false> {
        let proxy = this.options.proxy;

        if (this.options.useRandomProxies) {
            proxy = await Proxy.getRandomProxy();
        }

        if (!proxy) return false;

        return {
            host: proxy.host,
            port: proxy.port,
            auth:
                proxy.username && proxy.password
                    ? {
                          username: proxy.username,
                          password: proxy.password
                      }
                    : undefined,
            protocol: proxy.protocol || "http"
        } as AxiosProxyConfig;
    }

    public async scrape(): Promise<IScraperResult> {
        if (!this.axiosInstance.defaults.timeout) {
            await this.init();
        }

        const startTime = Date.now();

        try {
            await Delay.randomDelay();

            const response = await this.axiosInstance.get(this.options.url);

            return {
                success: true,
                data: this.formatResponse(response),
                statusCode: response.status,
                proxyUsed: this.options.proxy || null,
                executionTime: Date.now() - startTime,
                headers: this.sanitizeHeaders(response.headers)
            };
        } catch (error: any) {
            return this.handleError(error, startTime);
        }
    }

    private sanitizeHeaders(headers: any): Record<string, string> {
        const result: Record<string, string> = {};
        for (const key in headers) {
            if (headers[key] && typeof headers[key] === "string") {
                result[key] = headers[key];
            }
        }
        return result;
    }

    private async handleError(
        error: any,
        startTime: number
    ): Promise<IScraperResult> {
        Logger.error(`Request failed: ${error.message}`);

        const retryCount = this.options.retryCount ?? config.retryCount ?? 3;
        
        if (this.retryCount < retryCount) {
            this.retryCount++;
            Logger.warn(`Retrying (${this.retryCount})...`);
            return this.scrape();
        }

        return {
            success: false,
            error: error.message,
            statusCode: error.response?.status,
            retries: this.retryCount,
            proxyUsed: this.options.proxy || null,
            executionTime: Date.now() - startTime
        };
    }

    private formatResponse(response: AxiosResponse): any {
        const format = this.options.outputFormat ?? config.outputFormat ?? "json";
        return DataFormatter.format(response.data, format);
    }
}