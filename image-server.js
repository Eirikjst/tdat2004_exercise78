const screenshot = require('screenshot-desktop');
let ws = require('ws');
let WEBSOCKET_PORT = 8082;
let SCREENSHOT_INTERVAL = 70; //milliseconds, fps=1000/SCREENSHOT_INTERVAL

let socketServer = new ws.Server({port: WEBSOCKET_PORT, perMessageDeflate: false})
socketServer.connectionCount = 0;
socketServer.on('connection', function(socket, upgradeReq){
    socketServer.connectionCount++;
    //let streamHeader = new Buffer(8);
    //streamHeader.write('jsmp');
    //streamHeader.writeUInt16BE(640);
    //streamHeader.writeInt16BE(480);
    //socket.send(streamHeader, {binary:true});
    console.log(
		'New WebSocket Connection: ', 
        (upgradeReq || socket.upgradeReq).socket.remoteAddress,
        (upgradeReq || socket.upgradeReq).socket.remotePort,
		(upgradeReq || socket.upgradeReq).headers['user-agent'],
		'('+socketServer.connectionCount+' total connections)'
    );
    socket.on('close', function(code, message){
        socketServer.connectionCount--;
        console.log('Disconnected WebSocket ('+socketServer.connectionCount+' total)');
    });
});

socketServer.broadcast = function(data) {
    socketServer.clients.forEach(function each(client){
        if (client.readyState === ws.OPEN){
            client.send('data:image/jpg;base64,'+data.toString('base64'));
        }
    });
};

function take_screenshot(){
    screenshot().then((img) => {
        socketServer.broadcast(img);
    }).catch((err) => {
        console.log('Error: '+err);
    });
}

setInterval(take_screenshot, SCREENSHOT_INTERVAL);

console.log('Awaiting WebSocket connections on ws://127.0.0.1:'+WEBSOCKET_PORT);