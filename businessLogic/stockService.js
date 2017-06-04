var repository = require('../dataAccess/repository.js');

exports.allStocks = function(callback){
    repository.executeQuery({
        spName: 'sp_getStocks',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay registro de inventario"
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


exports.addStock = function(data, callback){

    var paramsString =      data.idProduct+','+
                            data.amount+','+
                            data.minAmount+','+
                            data.maxAmount+','+
                        "'"+data.graven+"'";
                       

    repository.executeQuery({
        spName:  'sp_addStock',
        params: paramsString
    },
    function(success, data) {
        if(success) {
            if(data[0].sp_addStock == 0) {
                callback({
                    success: false, 
                    message: 'Ya existe un inventario asociado a ese producto',
                    data: {}
                });
            }
            else{
                
                callback({
                    success: true, 
                    message: 'Se ha registrado la informacion del inventario de manera exitosa',
                    data: data[0].sp_addStock
                });
               
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha registrado el inventario',
                data: {}
            });
        }
    });    
};

exports.allProductsNotStock = function(callback){
    repository.executeQuery({
        spName: 'sp_getProductsNoStock',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay productos sin inventario"
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



exports.disableStock = function(data, callback){

    repository.executeQuery({
        spName:  'sp_disableStock',
        params: data.id
    },
    function(success, data) {
        if(success) {
            if(data[0].sp_disableStock == 0) {
                callback({
                    success: false, 
                    message: 'Ese inventario no existe en el sistema',
                    data: {}
                });
            }
            else{
                
                callback({
                    success: true, 
                    message: 'Se ha deshabilitado el inventario de manera exitosa',
                    data: data[0].sp_disableStock
                });
               
            }
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha deshabilitado el inventario',
                data: {}
            });
        }
    });    
};


exports.updateStock = function(data, callback){
    var paramsString =      data.id+','+
                            data.amount+','+
                            data.minamount+','+
                            data.maxamount+','+
                        "'"+data.graven+"'";

    repository.executeQuery({
        spName:  'sp_updateStock',
        params: paramsString
    },
    function(success, data) {
        if(success) {                
            callback({
                success: true, 
                message: 'Se ha actualizado la informacion del inventario de manera exitosa',
                data: {}
            });
        } 
        else {
            callback({
                success: false, 
                message: 'Ha ocurrido un error, no se ha actualizado el inventario',
                data: {}
            });
        }
    });    
};

exports.getStock = function(data, callback){
    repository.executeQuery({
        spName: 'sp_getStock',
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
                message: "No se pudo obtener la información del inventario"
            });
        }
    });
};

