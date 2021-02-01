const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		res.render("index", {products:products})
	},
 	search: (req, res) => {
		let searchResults = [];
		for (let i = 0; i < products.length; i++){
			if(products[i].name.includes(req.query.keywords))
				searchResults.push(products[i]);	
		}
		res.render("results", {searchResults:searchResults})
	}, /*
	search: (req, res) => {
		
		let searchResults =products.filter(product=>product.name);
		for (let i = 0; i < products.length; i++){
			if(products[i].name.includes(req.query.keywords))
				searchResults.push(products[i]);	
		}
		res.render("results", {searchResults:searchResults})
	}, */
};

module.exports = controller;
