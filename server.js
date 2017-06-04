var express       = require('express'),
    app           = express(),
    server        = require('http').createServer(app),
    bodyParser    = require('body-parser'),
    sessionController     = require('./controllers/sessionController.js'),
    userController  = require('./controllers/userController.js'),
    clientController = require('./controllers/clientController.js'),
    productController = require('./controllers/productController.js');

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

app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userController.addUser);
app.put('/users/:id', userController.updateUser);
app.put('/users/disable/:id',userController.disableUser);

app.post('/clientes', clientController.createClient);
app.get('/clientes', clientController.getAllClients)
app.get('/clientes/:id', clientController.getClient);
app.put('/clientes/deshabilitar/:id', clientController.disableClient);
app.put('/clientes/:id', clientController.updateClient);

app.get('/products',productController.getAllProducts);
app.get('/products/:id',productController.getProduct);
app.post('/products',productController.addProduct);
app.put('/products/disable/:id',productController.disableProduct);
app.put('/products/:id',productController.updateProduct);


server.listen(process.env.PORT || 5000, function(){
    console.log('Listening at port 5000...');
});