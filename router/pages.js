const express =require("express");
const userController = require("../controllers/users");
const router=express.Router();
router.get(["/","/login"], (req,res) => {
    //res.send("<h1>Hello AK </h2>");
    res.render("login");
});
router.get("/register", (req,res) => {
    //res.send("<h1>Hello AK </h2>");
    res.render("register");
});
router.get("/profile",userController.isLoggedIn,(req,res) => {
   //res.render("profile");
   if(res.user){
    console.log("2");
    res.render("profile",{user:res.user});
   }
    else{
        console.log("3");
        res.redirect("/login");
    }
  
});
// router.get("/home",userController.isLoggedIn, (req,res) => {
//     console.log(res.user);
//     //res.render("home");
//     if(res.user){
//         console.log("2");
//         res.render("home",{user:res.user});
//     }
//     else{
//         console.log("3");
//         res.redirect("/login");
//     }
   
// });
router.get("/home",(req,res)=>{
    res.render("home");
});

router.get("/open_elective", (req,res) => {
    res.render("open_elective");
});
router.get("/web", (req,res) => {
    res.render("web");
});
router.get("/admin_login", (req,res) => {
    res.render("admin_login");
});
router.get("/department", (req,res) => {
    res.render("department");
});
router.get("/adminPage", (req,res) => {
    res.render("a_home");
});
router.get("/adduser", (req,res) => {
    res.render("adduser");
});
router.get("/addfaculty", (req,res) => {
    res.render("addfaculty");
});
router.get("/profElective", (req,res) => {
    res.render("profElective");
});
module.exports = router;
