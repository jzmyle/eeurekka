const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

// Carregar certificados SSL
const server = https.createServer({
    key: fs.readFileSync('path/to/your/server.key'),
    cert: fs.readFileSync('path/to/your/server.cert')
});

const wss = new WebSocket.Server({ server });

// Manipular conexões WebSocket
wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Recebido: ${message}`);
        // Broadcast para todos os clientes conectados
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.send('Conectado ao WebSocket seguro!');
});

// Iniciar servidor HTTPS
server.listen(443, () => {
    console.log('Servidor HTTPS está ouvindo na porta 443');
});
