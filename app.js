const express = require('express');
const fs = require('fs');
const path = require('path');
const socket = require('socket.io');

let app = express();
let server = require('http').createServer(app);

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

function newConnection(socket) {
    console.log('new connection from:' + socket.id);
    socket.on('midi', function(data) {
        socket.broadcast.emit('externalMidi', data);
    });
}

var io = socket(server);
io.sockets.on('connection', newConnection);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Serving at localhost: ${PORT}`));
