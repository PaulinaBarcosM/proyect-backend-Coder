import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "La cantidad mínima es 1"],
          validate: {
            validator: Number.isInteger,
            message: "La cantidad debe ser un número entero",
          },
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;
