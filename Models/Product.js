import mongoose, { Schema } from "mongoose";
import product from "../Models/Product.js";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      options: [
        "dresses",
        "shoes",
        "accessories",
        "watches",
        "trousers",
        "mens-wear",
        "jackets",
      ],
    },
    sizes: {
      type: String,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
