const {productSchema}= require("./schemas");
const {reviewSchema}= require("./schemas");
const passport= require("passport");
const plm= require("passport-local-mongoose");
const Product=require("./models/Product");

module.exports.validateProduct=(req,res,next)=>{
     const {name,img,price,desc}=req.body;
     const {error}= productSchema.validate({name,img,price,desc});

     if(error){
          return res.render("error");
     }
     next();
}
module.exports.validateReview=(req,res,next)=>{
    const {rating,comment}=req.body;
    const {error}= reviewSchema.validate({rating,comment});

    if(error){
         return res.render("error");
    }
    next();
}


module.exports.isSeller=(req,res,next)=>{
     if(!req.user.role || req.user.role==="buyer"){
          req.flash("You have don't have permissions");
          return res.redirect("/home");
     }
     next();
} 

module.exports.isProductAuthor= async (req,res,next)=>{
     const {id} =req.params; //this is Product Id.
     const product= await Product.findById(id);
     //product.author gives ObjectId??
     if(!(product.author && product.author.equals(req.user._id))){
          req.flash("You have don't have permissions");
          return res.redirect(`/products/${id}`);
     } 
     next();
}
module.exports.isLoggedIn = (req,res,next)=>{

    if(!req.isAuthenticated()){

        req.flash("error", "You need to Log-In first!")
         return res.redirect("/login");   
    }

    next();

}