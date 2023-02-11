const mysql2 = require("mysql2");
const jwt =require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const db=mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
});
exports.login=(req,res)=>{
    try{
        // console.log(req.body);
        const {Roll_No, Password} = req.body;
        // console.log(Roll_No);
        if(!Roll_No || !Password){
            return res.status(400).render("login",{msg: "Please Enter Roll Number and Password ",msg_type:"error" });
        }
        else{
            //console.log("hi");
            db.query('select * from users where ROLL=?',[Roll_No],async(error,results)=>{
                
                // console.log(results.length);
                if(results.length<=0){
                return res.status(401).render("login",{msg: "Email or Password Incorrect....",msg_type:"error" });
            }  
            else{
                if(Password.localeCompare(results[0].PASS)!=0){
                    return res.status(401).render("login",{msg: "Email or Password Incorrect....",msg_type:"error" });}
                    else { 
                    //  const id=results[0].userid;
                    //  const token=jwt.sign({ id: id},process.env.JWT_SECRET,{
                    //     expiresIn: process.env.JWT_EXPIRES_IN,
                    //  });
                    //  console.log("The Token is " + token);
                    //  const cookieOption={
                    //     expires : new Date( Date.now() + process.env.JWT_COOKIE_EXPIRES),
                    //        httpOnly: true,
                    //  };
                    //  res.cookie("Daya",token,cookieOption);
                     res.status(200).redirect("/home");
                   }
                }
                
                
            });
        }
    }
    catch(error){
        console.log(error);
    }
};
exports.register=(req,res)=>{
    console.log(req.body);
    const { roll,name, email,date,mno, Password, confirm_Password } = req.body;
    console.log(roll);
    db.query('select EMAIL from users where email=?',[email],async(error,results)=>{
       if(error){
        console.log(error);
        return;
       }
       if(results.length > 0){
        return res.render("register",{msg: "User id already taken",msg_type:"error" });
       }
       else if(Password !== confirm_Password){
        return res.render("register",{msg: "Password do not match",msg_type:"error" });
       }
      db.query('insert into users set ?',{ ROLL: roll, NAME: name, EMAIL: email, DOB:date, MOBILE:mno, PASS: Password },(error,results)=>{
          if(error){
            console.log(error);
          }
          else{
            //console.log(results);
            return res.render("register",{msg: "Registration Successfully",msg_type:"good" });
          }
      });      
    });
};
exports.isLoggedIn = async (req,res,next)=>{
    console.log(req.cookies);
    //next();
    if(req.cookies.Daya){
     try{
      const decode=await promisify(jwt.verify)(
      req.cookies.joes,process.env.JWT_SECRET
      );
     // console.log(decode);
      db.query("select * from users where id=?",[decode.id],(err,results)=>{
        console.log(results);
        if(!results){
            return next();
        }
        else{
        res.user=results[0];
       // console.log("use1")
        return next();
        }
       });
     }
      catch(error){
        console.log(error);
        return next();
     }
    }
    else{
        next();
    }   
};
