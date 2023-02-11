const express= require("express");
const mysql2 = require("mysql2");
const doenv=require("dotenv");
const path=require("path");
const hbs=require("hbs");
//const routes=require("./router/student");
const cookieParser=require("cookie-parser");
const app=express();
doenv.config({
    path:'./.env',
});
const db=mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
});
db.connect(function(err){
    if(err) throw err;
    console.log("connected");
});
//app.use('/',routes);
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.urlencoded({extended: false }));
const location=path.join(__dirname,"./public");
app.use(express.static(location));
app.set("view engine","hbs");
const particalsPath=path.join(__dirname,"./views/partials");
hbs.registerPartials(particalsPath);
app.use('/',require('./router/pages.js'));
app.use('/auth',require('./router/auth'));
app.listen(4000,()=>{
    console.log("server started @port 4000");
});