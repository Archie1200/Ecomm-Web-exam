const express= require("express");
const router = express.Router();
const {isLoggedIn}=require("../../middleware");
const User=require("../../models/User");


router.post("/product/:productid/like",isLoggedIn, async(req,res)=>{
      const {productid}= req.params;
      const user=req.user;

      const isLiked=user.wishList.includes(productid);
      
      const option=isLiked ? "$pull": "$addToSet";

      req.user=await User.findByIdAndUpdate(req.user._id,{[option]:{wishList:productid}},{new:true});
        
})





 
//get:to fetch the data.
//post:to make server side changes