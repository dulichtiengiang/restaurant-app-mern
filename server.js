const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");

//! --routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const filterRoutes = require("./routes/filter")

//! --middleware --server
app.use(cors());
app.use(morgan("dev"));

// app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
//! --app.use --routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/filter", filterRoutes);
//! Multiple Static Directories
//! Virtual Path Prefix
app.use("/uploads", express.static("uploads"));

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
