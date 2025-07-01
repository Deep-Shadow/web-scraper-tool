export * from "../interfaces/IProxy";
export * from "../interfaces/IScraperOptions";

declare module "*.json" {
    const value: any;
    export default value;
}

export type OutputFormat = "json" | "html" | "xml" | "txt";

export interface IScraperResult {
    success: boolean;
    data?: any;
    error?: string;
    statusCode?: number;
    retries?: number;
    proxyUsed?: IProxy | null;
    executionTime?: number;
    headers?: Record<string, string>;
}
