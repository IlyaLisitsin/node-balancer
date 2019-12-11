const http = require('http');

const portsArr = [4545, 2323, 5656];

portsArr.forEach(port => {
    http.createServer((req, res) => {
        res.write('heheheh');
        res.end();
    }).listen(port);
});

