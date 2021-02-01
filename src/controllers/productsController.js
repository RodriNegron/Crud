const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", {products:products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		productFound=products.find(product=>(product.id==req.params.id));
		res.render("detail", {productFound:productFound})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		
		let productToEdit=products.find(product=>(product.id==req.params.id));

		res.render("product-edit-form", {productToEdit:productToEdit})
	},

	// Update - Method to update
	update: (req, res) => { 
		
		let productToEdit=products.find(product=>(product.id==req.params.id));

 		let newArray = products.map(product=>{

			 if(product.id==productToEdit.id){
				product.name =req.body.name;
				product.price =req.body.price;
				product.discount =req.body.discount;
				product.category =req.body.category;
				product.description =req.body.description;
			 }
			 return product;
		 })

		 let productJson = JSON.stringify(newArray);
		 fs.writeFileSync('./src/data/productsDataBase.json', productJson);
		

		res.redirect("/");
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;