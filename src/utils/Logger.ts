import chalk from "chalk";
import config from "../config";

const getTimestamp = () => new Date().toLocaleTimeString();

export class Logger {
    public static info(message: string, context?: object): void {
        console.log(`[${getTimestamp()}] ${chalk.blue("[INFO]")} ${message}`);
        if (context) console.dir(context, { depth: null, colors: true });
    }

    public static success(message: string, context?: object): void {
        console.log(
            `[${getTimestamp()}] ${chalk.green("[SUCCESS]")} ${message}`
        );
        if (context) console.dir(context, { depth: null, colors: true });
    }

    public static warn(message: string, context?: object): void {
        console.log(`[${getTimestamp()}] ${chalk.yellow("[WARN]")} ${message}`);
        if (context) console.dir(context, { depth: null, colors: true });
    }

    public static error(message: string, error?: Error): void {
        console.log(`[${getTimestamp()}] ${chalk.red("[ERROR]")} ${message}`);
        if (error) {
            console.error(chalk.red(error.stack || error.message));
        }
    }

    public static debug(message: string, context?: object): void {
        if (process.env.DEBUG === "true") {
            console.log(
                `[${getTimestamp()}] ${chalk.magenta("[DEBUG]")} ${message}`
            );
            if (context) console.dir(context, { depth: null, colors: true });
        }
    }

    public static requestDebug(requestConfig: any): void {
        if (process.env.DEBUG === "true") {
            console.log(`[${getTimestamp()}] ${chalk.cyan("[REQUEST]")}`, {
                url: requestConfig.url,
                method: requestConfig.method,
                headers: requestConfig.headers,
                proxy: requestConfig.proxy
            });
        }
    }
}
