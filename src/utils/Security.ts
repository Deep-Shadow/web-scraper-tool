export class Security {
    public static getSecureHeaders(): Record<string, string> {
        return {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Cache-Control": "max-age=0"
        };
    }

    public static sanitizeInput(input: string): string {
        return input.replace(/[<>"'&]/g, "");
    }

    public static isUrlSafe(url: string): boolean {
        try {
            const parsed = new URL(url);
            return ["http:", "https:"].includes(parsed.protocol);
        } catch {
            return false;
        }
    }
}
