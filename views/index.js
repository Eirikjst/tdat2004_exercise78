let connect = null;

$(document).bind('ready', function(){
    connect = new connect('127.0.0.1',8000);
    connect.initSocket();
});

function Connection(serverIP, serverPORT){
    this.socket = null;
    this.serverIP = serverIP;
    this.serverPORT = serverPORT;
}

Connection.prototype.initSocket = function(){
    this.socket = io.connect('http://'+this.serverIP+"+"+this.serverPORT);

    this.socket.on('connect', function(){
        console.log("Socket connected to http://"+connect.serverIP+":"+socket.serverPORT);
    });

    this.socket.on('disconnect', function(exception){
        if (exception){
            console.log(exception);
        }
        console.log("Socket disconnected")
    });
}