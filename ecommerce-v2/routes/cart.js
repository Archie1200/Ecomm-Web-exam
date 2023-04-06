const express=require("express");
const router=express.Router();
const Product= require("../models/Product");
const Review=require("../models/Review");
const Joi= require("joi");
const {validateProduct,isLoggedIn,isSeller,isProductAuthor}= require("../middleware");
const User=require("../models/User")

router.get("/user/cart",async(req,res)=>{
    const user=await  User.findById(req.user._id).populate('cart');
    const totalAmount=user.cart.reduce((sum,curr)=>sum+curr.price,0);
    res.render("/cart/cart",{user,totalAmount});
})

router.post("/user/:productid/add",async (req,res)=>{
    const {productid} =req.params;
    const userid= req.user._id;
   const product=await Product.findById(productid);
    const user=await User.findById(userid);
    user.cart.push(product);
    await user.save(); 
    res.redirect("/user/cart");
})