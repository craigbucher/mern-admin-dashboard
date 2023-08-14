import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    // should be 'required' and have validations in real implementation:
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }  // "always good to have timestamps"
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;