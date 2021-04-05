import { EventEmitter } from 'events';

import { Logger } from '@epickris/node-logger';
import ping from 'ping';

import { Client } from '../client';

/** Log */
const log = Logger.withPrefix('Powerline');

/** Powerline */
export class Powerline extends EventEmitter {

    /** Client */
    private client: Client;

    /**
     * @param ipAddress IP Address
     */
    constructor(
        protected readonly ipAddress: string
    ) {
        super();

        this.client = new Client(`http://${ipAddress}`);
    }

    /** Ping */
    async ping(): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            try {
                ping.promise.probe(this.ipAddress);
                resolve();
            } catch (error) {
                log.error(error);
                
                reject(error);
            }
        });

        return promise;
    }
}