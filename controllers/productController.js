var productService   = require('../businessLogic/productService.js');


exports.getAllProducts = function(dRequest, dResponse) {
    var data = productService.allProducts(function(data){
        dResponse.send(data);
    });
};


exports.getProduct = function(dRequest, dResponse) {
    var data = productService.getProduct(dRequest.params, function(data){
        dResponse.send(data);
    });
};


exports.addProduct= function(dRequest, dResponse) {
    var data = productService.addProduct(dRequest.body, function(data) {
        dResponse.send(data);
    });
};


exports.updateProduct= function(dRequest, dResponse) {
    var data = productService.updateProduct(dRequest.body, function(data) {
        dResponse.send(data);
    });
};

exports.disableProduct= function(dRequest, dResponse) {
    var data = productService.disableProduct(dRequest.body, function(data) {
        dResponse.send(data);
    });
};
