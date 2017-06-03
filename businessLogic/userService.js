
var repository = require('../dataAccess/repository.js');

exports.allUsers = function(callback){
    repository.executeQuery({
        spName: 'sp_getUsers',
        params: ''
    }, 
    function(success, data) {
        if(success) {
            if (data.length == 0){
                callback(
                {
                    success: false,
                    data: null,
                    message: "No hay registro de usuarios"
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


exports.addUser = function(data, callback){
    var paramsString = "'" +data.username+"'"+"," +"'" + data.password +"'"+","+data.rol+",1";
    repository.executeQuery({
        spName: 'sp_addUser',
        params: paramsString
    }, 
    function(success, data) {
        if(success) {
            var data = data[0].sp_adduser;
            if(data == 1) {
                callback(
                {
                    success: true,
                    data: null,
                    message: "El usuario se agregó correctamente"
                });
            }
            else{
                callback(
                {
                    success: false,
                    data: null,
                    message: "El usuario ya existe"
                });
            }
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "Por favor asegúrese de que los datos ingresados estén correctos."
            });
        }
    }); 
};

exports.updateUser = function(data, callback){
    var paramsString = "'" +data.username+"'"+","+"'" + data.password +"'" +","+data.rol;
    repository.executeQuery({
        spName: 'sp_updateUser',
        params: paramsString
    }, 
    function(success, data) {
        if(success) {
            var data = data[0].sp_updateuser;
            if(data == 1) {
                callback(
                {
                    success: true,
                    data: null,
                    message: "El usuario se actualizó correctamente"
                });
            }
            else{
                callback(
                {
                    success: false,
                    data: null,
                    message: "El usuario no se puede modificar"
                });
            }
        } 
        else 
        {
            callback(
            {
                success: false,
                data: null,
                message: "Por favor asegúrese de selecionar un usuario antes de actualizar o que el nombre del usuario no está en uso"
            });
        }
    }); 
};

exports.disableUser = function(data, callback){
    var paramsString = "'"+data.usuario+"'";
    repository.executeQuery({
        spName: 'sp_disableUser',
        params: paramsString
    }, 
    function(success, data) {
        if(success) {
            callback(
            {
                success: true,
                data: null,
                message: "El usuario se deshabilitó correctamente"
            });
        } 
        else 
        {
            callback(
            {
                success: false,
                data: null,
                message: "Error deshabilitando el usuario"
            });
        }
    }); 
};


exports.changePassword = function(data, callback) {
    var paramsString = "'" +data.usuario+"'"+","+"'" + data.currentPassword +"'" +"," +"'" + data.newPassword +"'";
    repository.executeQuery({
        spName: 'sp_cambiarContrasena',
        params: paramsString
    }, 
    function(success, data) {
        if(success) {
            var data = data[0].sp_cambiarcontrasena;
            if(data == 1) {
                callback(
                {
                    success: true,
                    data: null,
                    message: "La contraseña se actualizó correctamente"
                });
            }
            else{
                callback(
                {
                    success: false,
                    data: null,
                    message: "La contraseña actual es incorrecta"
                });
            }
        } 
        else{
            callback(
            {
                success: false,
                data: null,
                message: "Error actualizando la contraseña"
            });
        }
    }); 
};