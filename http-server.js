let express = require('express');
let path = require('path');
let app = express();

let PORT = 8080;

app.use(express.static(path.join(__dirname, 'views')));
app.get('/', function(req, res){
    res.sendFile('index.html', {root: './views/'});
});
app.listen(PORT);

console.log('Server started at 127.0.0.1:8080')