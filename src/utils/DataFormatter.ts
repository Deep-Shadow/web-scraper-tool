import { Logger } from "./Logger";

export class DataFormatter {
    public static toXml(data: any, rootName = "root"): string {
        try {
            let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n`;

            const parseObject = (obj: any, indent = "  "): string => {
                let result = "";
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const value = obj[key];
                        if (typeof value === "object" && value !== null) {
                            result += `${indent}<${key}>\n${parseObject(
                                value,
                                indent + "  "
                            )}${indent}</${key}>\n`;
                        } else {
                            result += `${indent}<${key}>${this.escapeXml(
                                value?.toString() ?? ""
                            )}</${key}>\n`;
                        }
                    }
                }
                return result;
            };

            xml += parseObject(data);
            xml += `</${rootName}>`;
            return xml;
        } catch (error: unknown) {
            Logger.error(
                "Failed to convert data to XML",
                error instanceof Error ? error : new Error(String(error))
            );
            throw error;
        }
    }

    private static escapeXml(unsafe: string): string {
        return unsafe.replace(/[<>&'"]/g, c => {
            switch (c) {
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                case "&":
                    return "&amp;";
                case "'":
                    return "&apos;";
                case '"':
                    return "&quot;";
                default:
                    return c;
            }
        });
    }

    public static format(
        data: any,
        format: "json" | "xml" | "html" | "txt"
    ): string {
        switch (format) {
            case "json":
                return JSON.stringify(data, null, 2);
            case "xml":
                return this.toXml(data);
            case "html":
                return typeof data === "string"
                    ? data
                    : `<pre>${JSON.stringify(data, null, 2)}</pre>`;
            case "txt":
                return typeof data === "string" ? data : JSON.stringify(data);
            default:
                return data.toString();
        }
    }
}
