const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema; //destructure ObjectId type
//! this is ObjectId is gonna allow us to get access to the Category, linked to the specific product.

const productSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true,
        },
        productName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 60,
        },
        productDesc: {
            type: String,
            trim: true,
        },
        productPrice: {
            type: Number,
            required: true,
        },
        productCategory: {
            type: ObjectId,
            ref: "Category", //! we need a property called ref which reference or model what we need
            require: true,
        },
        productQty: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

// add indexs to product model
productSchema.index({ productName: "text" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
