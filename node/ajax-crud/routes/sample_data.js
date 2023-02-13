var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	response.render('sample_data', {title : 'Node JS Ajax CRUD Application'});

});

router.post("/action", function(request, response, next){

	var action = request.body.action;

	if(action == 'fetch')
	{
		var query = "SELECT * FROM users";

		database.query(query, function(error, data){
			response.json({
				data:data
			});

		});
	}
	if(action== 'Add')
	{
		var roll=request.body.roll;
		var name=request.body.name;
		var email=request.body.email;
		var date=request.body.date;
		var mobile=request.body.mobile;
		var password=request.body.password;

		var query = `
		INSERT INTO users 
		(ROLL, NAME, EMAIL, DOB, MOBILE, PASS) 
		VALUES ("${roll}", "${name}", "${email}", "${date}", "${mobile}","${password}")
		`;

		database.query(query, function(error, data){

			response.json({
				message : 'Data Added'
			});

		});
	}
	if(action == 'fetch_single')
	{
		var id = request.body.id;

		var query = `SELECT * FROM users WHERE id = "${id}"`;

		database.query(query, function(error, data){

			response.json(data[0]);

		});
	}

	if(action == 'Edit')
	{
		var id = request.body.userid;
		var roll = request.body.roll;
		var name = request.body.name;
		var email = request.body.email;
		var date = request.body.date;
		var mobile = request.body.mobile;
		var password = request.body.password;

		var query = `
		UPDATE users 
		SET ROLL = "${roll}", 
		NAME = "${name}", 
		EMAIL = "${email}", 
		DOB = "${date}"
		MOBILE = "${mobile}"
		PASS = "${password}"
		WHERE id = "${id}"
		`;

		database.query(query, function(error, data){
			response.json({
				message : 'Data Edited'
			});
		});
	}
	if(action == 'delete')
	{
		var id = request.body.userid;

		var query = `DELETE FROM sample_data WHERE roll = "${id}"`;

		database.query(query, function(error, data){

			response.json({
				message : 'Data Deleted'
			});

		});
	}

});

module.exports = router;
