var stockService   = require('../businessLogic/stockService.js');


exports.getAllStocks = function(dRequest, dResponse) {
    var data = stockService.allStocks(function(data){
        dResponse.send(data);
    });
};


exports.getStock = function(dRequest, dResponse) {
    var data = stockService.getStock(dRequest.params, function(data){
        dResponse.send(data);
    });
};

exports.getProductsNotStock = function(dRequest, dResponse) {
    var data = stockService.allProductsNotStock(function(data){
        dResponse.send(data);
    });
};

exports.addStock= function(dRequest, dResponse) {
    var data = stockService.addStock(dRequest.body, function(data) {
        dResponse.send(data);
    });
};


exports.updateStock= function(dRequest, dResponse) {
    var data = stockService.updateStock(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.disableStock= function(dRequest, dResponse) {
    var data = stockService.disableStock(dRequest.body, function(data) {
        dResponse.send(data);
    });
};