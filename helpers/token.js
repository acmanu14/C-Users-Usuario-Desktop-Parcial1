"use strict"

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = require("MiContraseñaSecreta");

function obtenerTokenUsers(users){
    var payload = {
        sub: users._Id,
        nameUser: users.nameUser,
        lastnameUser: users.lastnameUser,
        emailUser: users.emailUser,
        iat: moment().unix(),
        exp: moment().add(30, "minutes").unix()    
    };
    return jwt.encode(payload, secret);
}

function validarTokenUsers(req, resp, nextStep){
    try{
        var tokenEnviadoporUsers = req.headers.authorization;
        var tokenLimpio = tokenEnviadoporUsers.replace("Bearer ", "");
        var payload = jwt.decode(tokenLimpio, secret);
        req.headers.usersId = payload.sub();
        nextStep();
    }catch(ex){
        resp.status(403).send({message: "Token no valido"})
    }
}

module. exports = {obtenerTokenUsers, validarTokenUsers}