const mysql=require("mysql2");
const db=mysql.createPool({
    connectionLimit:10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
});

exports.view=(req,res)=>{
    console.log("hi");
    db.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query("select * from users",(err,rows)=>{
            connection.release();
            if(!err){
                console.log("Good");
                res.render("adduser",{rows});
            }
            else{
                console.log("Error in Listening Data"+err);
            }
        });
    });
    
};