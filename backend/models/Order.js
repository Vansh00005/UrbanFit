const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema(
    {
    userId: { type: String, required: true},
    productId:{type:String,required: true},
    quantity:{type:Number},
    price:{type:Number},
    size:{type:String},
    img:{type:String},
     },
{timestamps:true});
module.exports=mongoose.model("Order",orderSchema);