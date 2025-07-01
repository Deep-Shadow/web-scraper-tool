export interface IProxy {
    host: string;
    port: number;
    protocol?: "http" | "https" | "socks4" | "socks5";
    username?: string;
    password?: string;
    anonymityLevel?: "transparent" | "anonymous" | "elite";
    country?: string;
    lastChecked?: string;
    speed?: number;
    uptime?: number;
}
