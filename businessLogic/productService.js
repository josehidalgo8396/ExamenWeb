var repository = require('../dataAccess/repository.js');

exports.allProducts = function(callback){
    repository.executeQuery({
        spName: 'sp_getProducts',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay registro de productos"
                });
            }
            else{
                callback(
                    {
                        success: true,
                        message: "Operación exitosa",
                        data: data
                    });
            }
        } 
        else 
        {
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo establecer la conexión a la base de datos"
            });
        }
    });
};


exports.addProduct = function(data, callback){

    var paramsString =  "'"+data.name+"',"+
                        "'"+data.brand+"',"+
                        "'"+data.family+"',"+
                        "'"+data.house+"',"+
                        "'"+data.type+"',"+
                        "'"+data.department+"',"+
                        "'"+data.unit+"',"+
                            data.tax;
    repository.executeQuery({
        spName:  'sp_addProduct',
        params: paramsString
    },
    function(success, data) {
        if(success) {
            if(data[0].sp_addProduct == 0) {
                callback({
                    success: false, 
                    message: 'Ya existe un producto con ese nombre',
                    data: {}
                });
            }
            else{
                
                callback({
                    success: true, 
                    message: 'Se ha registrado la informacion del producto de manera exitosa',
                    data: data[0].sp_addProduct
                });
               
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha registrado el producto',
                data: {}
            });
        }
    });    
};

exports.disableProduct = function(data, callback){

    repository.executeQuery({
        spName:  'sp_disableProduct',
        params: data.id
    },
    function(success, data) {
        if(success) {
            if(data[0].sp_disableProduct == 0) {
                callback({
                    success: false, 
                    message: 'Ese producto no existe en el sistema',
                    data: {}
                });
            }
            else{
                
                callback({
                    success: true, 
                    message: 'Se ha deshabilitado el producto de manera exitosa',
                    data: data[0].sp_disableProduct
                });
               
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha deshabilitado el producto',
                data: {}
            });
        }
    });    
};


exports.updateProduct = function(data, callback){
    var paramsString =      data.id+","+
                        "'"+data.name+"',"+
                        "'"+data.brand+"',"+
                        "'"+data.family+"',"+
                        "'"+data.house+"',"+
                        "'"+data.type+"',"+
                        "'"+data.department+"',"+
                        "'"+data.unit+"',"+
                            data.tax;
    repository.executeQuery({
        spName:  'sp_updateProduct',
        params: paramsString
    },
    function(success, data) {
        if(success) {                
            callback({
                success: true, 
                message: 'Se ha actualizado la informacion del producto de manera exitosa',
                data: {}
            });
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha actualizado el producto',
                data: {}
            });
        }
    });    
};

exports.getProduct = function(data, callback){
    repository.executeQuery({
        spName: 'sp_getProduct',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            callback({
                success: true, 
                message: "Operación exitosa",
                data: data[0]
            });
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "No se pudo obtener la información del producto"
            });
        }
    });
};