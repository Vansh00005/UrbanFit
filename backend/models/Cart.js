const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true},
    productId:{type:String,required: true},
    quantity:{type:Number},
    price:{type:Number},
    size:{type:String,default:"M"},
    img:{type:String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);