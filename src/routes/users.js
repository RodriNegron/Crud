// ************ Require's ************
const express = require("express");
const router = express.Router();
const userController =require("../controllers/userController");

const {check} = require("express-validator");


const userCreateValidation = [
    check("userName").notEmpty().withMessage("Debes completar el nombre"),
    check("password").notEmpty().withMessage("Debes ingresar una contraseña").isLength({min:4}).withMessage("minimo 4 caracteres"),
];

router.get("/register", userController.register);

router.post("/register", userCreateValidation, userController.create);

router.get("/login", userController.login);
router.post("/login",userController.processLogin);

module.exports=router;