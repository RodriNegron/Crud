const fs = require("fs");
const path = require("path");
var bcrypt = require('bcryptjs');


const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
let usersList = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const {validationResult} = require ("express-validator");

const userController = {
    register: (req,res)=>{
        res.render("register");
    },

    create: (req, res) => {

		let errors = validationResult(req);
		
		if(errors.isEmpty()){
			
			let newUser ={
				description: req.body.userName,
				password: req.body.password
			}
			
			usersList.push(newUser);
			let userJson = JSON.stringify(usersList, null, 2);
			fs.writeFileSync('./src/data/usersDataBase.json', userJson);
			res.redirect("/");
		}else{

			res.render("register", {errors: errors.mapped(), oldUserData: req.body});
		}
	},
	login: (req,res) =>{
		return res.render("login");

	},
	processLogin: (req,res) =>{
		let errors = validationResult(req)
		if(errors.isEmpty()){
			let foundUser;

			for (let i = 0; i < usersList.length; i++) {
				if(usersList[i].name==req.body.userName){
					/* if(bcrypt.compareSync(req.body.password, usersList[i].password)){
						foundUser = usersList[i];
					} */
					res.send("exito");
				}
			}

			if(foundUser){
				return res.render("login", {errors: [
					{msg:"credenciales invalidas"}
				]});
			}else{
				req.session.logedUser= foundUser;
			} 

		}else{
			return res.render("login", {errors: errors.mapped(), oldData:req.body});
		}
	}
}

module.exports = userController;