import { Logger } from "./Logger";
import config from "../config";

export class Delay {
    public static async randomDelay(): Promise<void> {
        const delay =
            Math.floor(
                Math.random() *
                    (config.maxDelayBetweenRequests -
                        config.minDelayBetweenRequests +
                        1)
            ) + config.minDelayBetweenRequests;

        Logger.debug(`Applying random delay: ${delay}ms`);
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    public static async fixedDelay(ms: number): Promise<void> {
        Logger.debug(`Applying fixed delay: ${ms}ms`);
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export const randomDelay = Delay.randomDelay;
