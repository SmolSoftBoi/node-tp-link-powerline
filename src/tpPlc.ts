import { createSocket } from 'dgram';
import { EventEmitter } from 'events';

import { Logger } from '@epickris/node-logger';

import * as Devices from "./devices";
import * as Events from "./events";

import find from 'local-devices';

/** Log */
const log = new Logger();

/** TP-Link PLC */
export class TpPlc extends EventEmitter {

    /** Devices */
    private devices: Record<string, Devices.Powerline> = {};

    /** Get Devices */
    async getDevices(): Promise<void> {
        const socket = createSocket('udp4');

        socket.on('error', (error) => {
            log.error(error.message);

            socket.close();
        });

        socket.on('listening', () => {
            socket.setBroadcast(true);
        });

        socket.on('message', async (_message, remoteInfo) => {
            const device = (await find(remoteInfo.address))[0];
            this.devices[device.mac] = new Devices.Powerline(device.ip);
            this.emit(Events.FOUND, this.devices[device.mac]);
        });

        socket.bind();
        socket.send('', 1040, '255.255.255.255');
    }
}