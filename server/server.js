const WebSocket = require('ws');


const server = new WebSocket.Server({port: 8080});

const list = [];
const map = new Map();
messageLength = 20;

server.on('connection', (ws) => {
    console.log('A new client connected!');
    synList(ws);

    ws.on('message', (packet) => {

        const message = handlePackets(JSON.parse(packet).packet, ws);
        if (message) {
            handleMessage(message);
        }

        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(packet);
            }
        });
    });

    ws.on('close', () => {
        console.log('A client disconnected');
    });
});

function handlePackets(packet, ws) {
    sendAcknowledgement(packet, ws);
    if (packet.total === 1) {
        return JSON.parse(packet.content);
    } else {
        const messageId = packet.messageId;
        let messageObj = map.get(messageId);
        if (!messageObj) {
            messageObj = {total: packet.total, contents: []};
        }
        messageObj.contents.push({content: packet.content, index: packet.index});
        map.set(messageId, messageObj);
        if (messageObj.total === messageObj.contents.length) {
            const contents = messageObj.contents.sort((p1, p2) => {
                if (p1.index > p2.index) {
                    return 1;
                } else {
                    return -1;
                }
            }).map(i => i.content);
            map.delete(messageId);
            return JSON.parse(contents.join(''));
        }

    }
    // console.log(JSON.stringify(packet))
}

function handleMessage(message) {

    if (message.type === 'newFeature') {
        list.push(message.item);
    } else if (message.type === 'configFeature') {
        list.forEach(item => {
            if (item.instanceId === message.instanceId) {
                item.configs = message.config;
            }
        })
    } else if (message.type === 'removeFeature') {
        const index = list.findIndex(item => item.instanceId === message.instanceId);
        if (index >= 0) {
            list.splice(index, 1);
        }
    } else if (message.type === 'dataFeature') {
        list.forEach(item => {
            if (item.instanceId === message.instanceId) {
                item.data = message.data;
            }
        })
    } else if (message.type === 'lockFeature') {
        list.forEach(item => {
            if (item.instanceId === message.instanceId) {
                item.lock = message.lock;
            }
        })
    }
}

function sendAcknowledgement(packet, ws) {
    const acknowledgement = {
        messageId: packet.messageId,
        index: packet.index,
        total: packet.total
    }
    const socket = {packet: acknowledgement, id: ''}
    ws.send(JSON.stringify(socket));
}


function synList(ws) {
    const message = {
        type: 'listSync',
        list: list
    }

    const messageId = generateShortUID(10);
    const messageChunks = JSON.stringify(message).match(new RegExp(`.{1,${messageLength}}`, 'g'));
    if (messageChunks && messageChunks.length > 0) {
        for (let i = 0; i < messageChunks.length; i++) {
            const packet = {
                messageId,
                index: i + 1,
                total: messageChunks.length,
                content: messageChunks[i]
            }
            const socket = {packet, id: ''}
            ws.send(JSON.stringify(socket));
        }
    }


}

function generateShortUID(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}


console.log('WebSocket server is running on ws://localhost:8080');