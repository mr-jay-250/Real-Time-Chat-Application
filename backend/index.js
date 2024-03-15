const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Server is running\n');
});

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const clients = [];

io.on('connection', (socket) => {
    console.log('New client connected');

    clients.push(socket);

    socket.on('message', (message) => {
        if (message.text.trim() !== '') {
            console.log('Message received:', message);
            io.emit('message', { ...message, from: socket.id });
        } else {
            console.error('Empty message received');
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
        socket.removeAllListeners();
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
