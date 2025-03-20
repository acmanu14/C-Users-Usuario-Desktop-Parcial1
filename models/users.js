"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema({
    UsersSchema: {"administrador" : "Standard"},
    default: "Standard",

})

module.exports = mongoose.model("users", usersSchema);

var artcloSchema = new mongoose.Schema({
    tituloArticulo: String,
    descripcion: String,
    precio: Number,
  });
  module.exports = mongoose.model('Artclo', artcloSchema);

var UsersSchema = Schema({
    nameUser: String,
    lastnameUser: String,
    emailUser: String,
    passwordUser: String,
    roleUser: String
    

});

module.exports = mongoose.model('User', userSchema);


module.exports = mongoose.model("Users", UsersSchema);