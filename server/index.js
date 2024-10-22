import express from "express";
import { WebSocketServer } from 'ws';
import http from 'http';
import cors from "cors"

const app = express();
app.use(cors());

const port = 3000;
const server = http.createServer(app);

// WebSocket sunucusu oluşturuyoruz
const wss = new WebSocketServer({ server });

// WebSocket üzerinden gelen mesajları dinliyoruz
wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

    // Mesaj alındığında yapılacak işlem
    ws.on('message', (message) => {
        console.log('Received: %s', message);
        ws.send(`You said: ${message}`);
    });

    // Bağlantı kapanırsa
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});
