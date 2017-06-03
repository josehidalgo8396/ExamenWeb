var express       = require('express'),
    app           = express(),
    server        = require('http').createServer(app),
    bodyParser    = require('body-parser'),
    sessionController     = require('./controllers/sessionController.js');


app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/app'));
//send the main page
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/common/views/home.html');
});

app.post('/login', sessionController.login);


server.listen(process.env.PORT || 5000, function(){
    console.log('Listening at port 5000...');
});