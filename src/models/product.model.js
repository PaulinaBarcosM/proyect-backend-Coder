import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 200 },
    price: { type: Number, required: true, min: 0 },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, maxlength: 100 },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    thumbnails: {
      type: [String],
      default: [],
      validate: {
        validator: (array) =>
          array.every(
            (url) => url.startsWith("/") || /^https?:\/\/.+/.test(url)
          ),
        message: "Las URL deben ser válidas",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
