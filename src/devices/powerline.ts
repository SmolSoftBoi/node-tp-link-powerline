import { EventEmitter } from 'events';

import { Logger } from '@epickris/node-logger';
import { IDevice } from 'local-devices';
import ping from 'ping';

import { Client } from '../client';

/** Log */
const log = Logger.withPrefix('Powerline');

/** Powerline */
export class Powerline extends EventEmitter {

    /** Client */
    private client: Client;

    /**
     * @param device Device
     */
    constructor(
        protected readonly device: IDevice
    ) {
        super();

        this.client = new Client(`http://${device.ip}`);
    }
    
    /** Get Name */
    get name(): string {
        return this.device.name;
    }

    /** Get Mac */
    get mac(): string {
        return this.device.mac;
    }

    /** Get IP Address */
    get ipAddress(): string {
        return this.device.ip;
    }

    /** Ping */
    async ping(): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            try {
                ping.promise.probe(this.device.ip);
                resolve();
            } catch (error) {
                log.error(error);

                reject(error);
            }
        });

        return promise;
    }
}