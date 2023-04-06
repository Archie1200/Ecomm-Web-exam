
const mongoose = require("mongoose");


const productSchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{
            type:String,
            trim:true,
    },
    price:{
        type:Number,
        Min:0,
        default:0
    },
    desc:{
        type:String,
        trim:true
    },
    author:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User"
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
});
//In routes product.js before execution of findByIdAndDelete(triggers findOneAndDelete) , mongoose will run this middleware first.
// productSchema.pre("findOneAndDelete",async function(data){
//     console.log(data);
// });

// Mongoose middleware function to delete all the  associated reviews on a product.

productSchema.post("findOneAndDelete",async function(product){
    if(product.reviews.length>0){
        //checks for every document in review
        await Review.deleteMany({_id :{$in:product.reviews}});
    }
})


const Product= mongoose.model('Product',productSchema);
module.exports=Product;
