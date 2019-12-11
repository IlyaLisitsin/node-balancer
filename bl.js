const net = require('net');

const portsArr = [4545, 2323, 5656];

net.createServer(localSocket => {
    localSocket.on('connect', () => {
        console.log('LOCAL CONNECT')
    });

    localSocket.setKeepAlive();

    localSocket.on('drain', () => {
        console.log('LOCAL DRAIN')
    });

    localSocket.on('data', data => {
        const port = portsArr[Math.floor(Math.random() * portsArr.length)];
        // const port = 2323;

        console.log({ ...process.memoryUsage(), port })
        const remoteSocket = new net.Socket();
        remoteSocket.setKeepAlive(true, 5000);
        remoteSocket.connect(port, '127.0.0.1');

        remoteSocket.write(data);

        remoteSocket.on('data', data => {
            localSocket.writable && localSocket.write(data);
        });

        remoteSocket.on('close', () => {
            // console.log('REMOTE SOCKET END')
            localSocket.end();
        });

        localSocket.on('close', () => {
            // console.log('LOCAL SOCKET END')
            remoteSocket.end();
        });
    });

    // localSocket.on('drain', () => {
    //     console.log('LOCAL DRAIN')
    // })

}).listen(1212);
