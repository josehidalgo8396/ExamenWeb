var pg = require('pg'); 

exports.createConnection = function() {
    var client = new pg.Client({
        user: "djxgbmukawetdt",
        password: "3d4c55633d9d47df26039c3ee6950f78f29ae9ee89dce37a33136cb7b7004f4d",
        database: "debdoelct4btft",
        port: 5432,
        host: "ec2-23-23-234-118.compute-1.amazonaws.com",
        ssl: true
    });
    return client;
};





