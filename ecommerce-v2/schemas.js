const Joi = require("joi");

//For Server-Side Validation before reaching mongoose layer validation:


module.exports.productSchema=Joi.object({
    name:Joi.string().required(),
    img:Joi.string().required(),
    price:Joi.number().min(0).required(),
    desc:Joi.string().required()
  });
module.exports.reviewSchema= Joi.object({
    rating:Joi.number().min(1).max(5),
    comment:Joi.string().required()
})

