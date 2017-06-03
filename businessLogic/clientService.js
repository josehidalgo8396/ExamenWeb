var repository = require('../dataAccess/repository.js');

exports.createClient = function(data, callback){
    var paramsString = data.idNumber + ",'"+data.name + "','" + data.lastName + "','" + data.birth + "','" +
                        data.direction + "','" + data.status + "'," + data.gender + "," + data.discount;
    repository.executeQuery({
        spName: 'sp_addClient',
        params: paramsString
    }, 
    function(success, data) {
        if(success) {
            if (data.sp_addclient == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "Ya existe un cliente con esa cédula"
                });
            }
            else{
                callback(
                {
                    success: true,
                    message: "El cliente se agregó de manera correcta",
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

exports.getAllClients = function(callback){

    repository.executeQuery({
        spName: 'sp_getClients',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay clientes registrados"
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

exports.disableClient = function(data, callback){
    repository.executeQuery({
        spName: 'sp_disableClient',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            callback(
            {
                success: true,
                message: "El cliente se deshabilitó correctamente",
                data: {}
            });
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

exports.getClient = function(data, callback){
    repository.executeQuery({
        spName: 'sp_getClient',
        params: data.id
    }, 
    function(success, data) {
        if(success) {
            if(data.length == 0) {
                callback(
                {
                    success: false,
                    message: "No se ha encuentrado el cliente ",
                    data: {}
                });
            }
            else{
                callback(
                {
                    success: true,
                    message: "Operación exitosa",
                    data: data[0]
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

exports.updateClient = function(data, callback){
    var paramsString = data.idnumber + ",'"+data.name + "','" + data.lastname + "','" + data.birth + "','" +
                        data.direction + "','" + data.status + "'," + data.gender + "," + data.discount;
    repository.executeQuery({
        spName: 'sp_updateClient',
        params: paramsString
    }, 
    function(success, data) {
        if(success) {
            callback(
            {
                success: true,
                message: "El cliente se editó de manera correcta",
                data: data
            });
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
