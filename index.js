const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
    server.setBroadcast(true);
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind();

const message = Buffer.from('Hello?');

server.send('', 1040, '255.255.255.255');