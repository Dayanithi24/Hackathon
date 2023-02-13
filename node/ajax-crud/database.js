const mysql = require('mysql2');

var connection = mysql.createConnection({
	host : 'localhost',
	database : 'elective-course',
	user : 'root',
	password : 'Gayathri@2404'
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;