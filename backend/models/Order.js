const mongoose=require("mongoose")

const orderSchema = new mongoose.Schema(
    {
      userId: { type: String, required: true },
      products: [
        {
          productId: { type:String},
          quantity: { type: Number},
          price: { type: Number },
          size: { type: String },
          img: { type: String},
        },
      ],
      status:{type:String,default:"Pending"},
      amount:{type:Number},
    },
    { timestamps: true }
  );
   module.exports = mongoose.model("Order", orderSchema);