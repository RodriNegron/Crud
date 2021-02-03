const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {

		let newProduct ={
			id: (products.length++), //!! buscar el id del ultimo elemento del json y sumarle 1
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description
		}

		products.push(newProduct);
		let productJson = JSON.stringify(products, null, 2);
		fs.writeFileSync('./src/data/productsDataBase.json', productJson);
		res.redirect("/");
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

		 let productJson = JSON.stringify(newArray, null, 2);
		 fs.writeFileSync('./src/data/productsDataBase.json', productJson);
		 		

		res.redirect("/");
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productToDelete=products.find(product=>(product.id==req.params.id));
		products= products.filter(product=>(product.id != productToDelete.id));
		let productJson = JSON.stringify(products, null, 2);
		fs.writeFileSync('./src/data/productsDataBase.json', productJson);

		 //revisar iD's

		res.redirect("/");
	}
};

module.exports = controller;