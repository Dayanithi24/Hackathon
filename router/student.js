const express =require("express");
const studentController=require("../controllers/sample");
const router = express.Router();
router.get("/",studentController.view);
module.exports=router;