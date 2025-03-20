"use strict"

var users = require("../models/users");
var express = require("express");
var authController = require("../controller/authentication");
var router = express.Router();
var routers = require("./routes");
application.use(routers);
var bcrypt = require("bcryptjs");
const { obtenerTokenUsers } = require("../helpers/token");


router.post("./registerUsers", authController.registerUsers);
router.post("./logIn", authController.logIn);

module. exports = router;

const {nameUser, passwordUser, roleUser} = req.body;


function registerUsers(req, resp){
    var newUsers = new users();
    var parametros = req.body;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(parametros.password,roleUser, salt);

    newUsers.nameUser = parametros.nameUser;
   newUsers.lastnameUser = parametros.lastnameUser;
    emailUser = parametros.emailUser;
    passwordUser = hash;
    roleUser = parametros.roleUser;

    newUsers.save().then(
        (usersSaved) => {
            resp.status(200).send({usersCreated: usersSaved});
        },
        err => {
            resp.status(500).send({message: "No se pudo crear el usuario, intente más tarde"});

        }
    )
}

function logIn(req, resp){
    var parametros = req.body;

    var emailIngresado = parametros.email;
    var passwordIngresado = parametros.password;

    users.findOne({email: emailIngresado}).then(
        (UsersFound) => {
            if(UsersFound == null){
                resp.status(403).send({message: "El usuario no existe"});
            }else if(bcrypt.compareSync(passwordIngresado, UsersFound.password)){
                resp.status(200).send({message: "El usuario se ha logueado correctamente", token: token.obtenerTokenUsers(UsersFound)});

                

            }else {
                resp.status(403).send({message: "La contraseña digitada no es valida"});
                const token = jwt.sign({nameUser, roleUser: nameUser.roleUser});
                resp.status().send({message: "El rol está seguro"})

            }
            module. exports = router;    
        },
        err => {
            resp.status(500).send({message: "Su usuario no se ha podido verificar, por favor intente más tarde"});
        }
    )

}

module. exports = {registerUsers, logIn}

function Artclo(req, resp){
    const { tituloArtclo, descripcion, precio } = req.body;
    newArtclo.save().then(
        (ArtcloSaved) => {
            resp.status({message: "El articulo ha sido creado con exito"})


        }, 
        err => {
            resp.status(500).send({message: "Ha sido erroneo crear el articulo, intente más tarde" });
        }
        
        
    )
        

}



    
    
