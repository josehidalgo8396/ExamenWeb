var clientService = require('../businessLogic/clientService.js');

exports.createClient = function(dRequest, dResponse) {
    var data = clientService.createClient(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.getAllClients = function(dRequest, dResponse) {
    var data = clientService.getAllClients(function(data) {
        dResponse.send(data);
    });
};

exports.disableClient = function(dRequest, dResponse) {
    var data = clientService.disableClient(dRequest.params, function(data) {
        dResponse.send(data);
    });
};

exports.getClient = function(dRequest, dResponse) {
    var data = clientService.getClient(dRequest.params, function(data) {
        dResponse.send(data);
    });
};

exports.updateClient = function(dRequest, dResponse) {
    var data = clientService.updateClient(dRequest.body, function(data) {
        dResponse.send(data);
    });
};