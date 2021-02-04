// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");


// ************ Multer set (upload images) ************
const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        let folder = path.join(__dirname, "../../public/images/products");
        callback(null, folder);
    },
    filename: (req, file, callback) =>{
        let imgName = Date.now() + path.extname(file.originalname);
        callback(null,imgName)
    }
});

const fileUpload = multer({storage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', fileUpload.single("productImage"), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/detail/:id', productsController.destroy); 

module.exports = router;
