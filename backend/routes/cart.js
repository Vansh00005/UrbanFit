const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//
router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the cart with the given userId
    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: "Error updating cart", details: err.message });
  }
});


//CREATE

router.post("/",async (req, res) => {   //removed verify token
  try {
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json({ error: "Error creating cart", details: err.message });
  }
});

//UPDATE
// router.put("/:id",  async (req, res) => {   //removed verify tokena nd auth
//   try {
//     const updatedCart = await Cart.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedCart);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//DELETE
router.delete("/:id", async (req, res) => {      verifyTokenAndAuthorization
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/finds/:userId", async (req, res) => {   //removed verify tokena and auth
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/",verifyTokenAndAdmin, async (req, res) => {  //verifyTokenAndAdmin
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;