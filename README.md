# TP-Link Powerline

This is an API and can be used to interact with TP-Link powerline devices.

## TP-Link PLC

```typescript
import { TpPlc } from 'node-tp-link-powerline';

const tpPlc = new TpPlc();

tpPlc.on('found', (device) => {
    try {
        device.ping();

        // Ping Resolved
    } catch (error) {
        // Ping Rejected
    }
});

tpPlc.getDevices();
```
