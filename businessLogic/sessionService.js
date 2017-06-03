
var repository = require('../dataAccess/repository.js');
exports.validateUser = function(data, callback){
    var paramsString = "'" +data.username+"'"+','+"'"+data.password+"'";
    repository.executeQuery({
        spName: 'sp_login',
        params: paramsString
    }, 
    function(success, data2) {
        if(success) {
            if(data2[0].sp_login == -1) {
                callback({
                    status: false, 
                    message: 'Usuario o contraseña no válida',
                    data: {}
                });
            }
            else {
                callback({
                    status: true, 
                    message: 'Usuario válido',
                    data: data2[0].sp_login
                });
            }
        } 
        else {
            callback({
                status: false, 
                message: 'Ha ocurrido un error, no se ha validado la sesión',
                data: {}
            });
        }
    });    
};