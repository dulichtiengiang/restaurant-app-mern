//! models
const fs = require("fs");
const Product = require("../models/product");

exports.create = async (req, res) => {
    // console.log("req.user", req.user); //! authenticator middleware
    // console.log("req.file", req.file); //! multer middleware
    // console.log("req.body", req.body); //! request body

    try {
        //! destructure req.body req.file req.user
        const { filename } = req.file;
        const {
            productName,
            productDesc,
            productPrice,
            productCategory,
            productQty,
        } = req.body;

        let newProduct = new Product();
        newProduct.fileName = filename;
        newProduct.productName = productName;
        newProduct.productDesc = productDesc;
        newProduct.productPrice = productPrice;
        newProduct.productCategory = productCategory;
        newProduct.productQty = productQty;

        await newProduct.save();

        res.json({
            successMessage: `Món ăn ${productName} được thêm thành công`,
            product: newProduct,
        });
    } catch (error) {
        console.log("productController.create | error: ", error);
        res.status(500).json({
            errorMessage: "Xin vui lòng thử lại sau <3",
        });
    }
};

exports.read = async (req, res) => {
    console.log("productController.read <- [product] <- MongoDB");
    try {
        const { productId } = req.params; //! lấy id từ tên miền
        // console.log(`productId: `, productId);

        const product = await Product.findById(productId);
        // console.log(`product: `, product);
        res.json(product);
    } catch (error) {
        console.log(
            "ERROR productController.read <- [product] <- MongoDB: ",
            error
        );
        res.status(500).json({
            errorMessage: "Xin vui lòng thử lại sau <3",
        });
    }
};

exports.readAll = async (req, res) => {
    console.log("productController.readAll -> GET products");
    try {
        const products = await Product.find({}).populate("productCategory", "category");
        //! populate allow us to pull data with relationship between the product and the category
        //! we reference this property field (productCategory) toi field(categogy) cua Categogy Model
        //! products = [{obj}, {obj}, {obj}, ...]
        res.status(200).json({ products });
    } catch (error) {
        console.log("ERROR productController.readAll -> GET products", error);
        res.status(500).json({ errorMessage: "Xin vui lòng thử lại sau <3" });
    }
};

exports.readByCount = async (req, res) => {
    console.log("exec productController.readByCount");
    const { count } = req.params ? req.params : 1;
    try {
        const products = await Product.find({}).populate("productCategory", "category").limit(parseInt(count));
        res.status(200).json({ products });
    } catch (error) {
        console.log("ERROR productController.readAll", error);
        res.status(500).json({ errorMessage: "Xin vui lòng thử lại sau <3" });
    }
};

exports.delete = async (req, res) => {
    try {
        console.log("product Controllers | DELETE -> /api/product/:productId ");
        const { productId } = req.params;
        //! Find only one document matching the conditiondelete and callback function error
        //! note 1: delete Image
        //! note 2:
        const deletedProduct = await Product.findOneAndDelete({
            _id: productId,
        });
        //! arg 1: path of Image
        //! arg 2: callback function error
        fs.unlink(`uploads/${deletedProduct.fileName}`, (error) => {
            if (error) throw error;
            console.log(
                `Hình ảnh ${deletedProduct.fileName} được xóa thành công`
            );
        });

        res.status(200).json(deletedProduct);
    } catch (error) {
        console.log(
            "ERROR | product Controllers | DELETE -> /api/product/:id: ",
            error
        );
        res.status(500).json({
            errorMessage: "Xin vui lòng thử lại sau <3",
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { productId } = req.params;
        // console.log(`productId: `, productId);
        // console.log(`req.file: `, req.file)
        //! middlleware multer
        if (req.file !== undefined) {
            req.body.fileName = req.file.filename;
        } else {
            req.body.fileName = req.body.productImage;
        }
        // console.log("req.body", req.body);
        // console.log(filename);
        const oldProduct = await Product.findOneAndUpdate({ _id: productId }, req.body);
        
        // console.log(`oldProduct: `, oldProduct);
        
        //! Nếu attach file(formData) tới BE, và file.filename đó phải khác oldProduct.fileName
        if (req.file !== undefined && req.file.filename !== oldProduct.fileName) {
            const image = `uploads/${oldProduct.fileName}`;
            //! Nếu file image trong uploads tồn tại => lệnh xóa thực hiện
            if (fs.existsSync(image)) {
                fs.unlink(`uploads/${oldProduct.fileName}`, (error) => {
                    if (error) throw error;
                    console.log(
                        `Hình ảnh ${oldProduct.fileName} được xóa thành công`
                    );
                });
            }
        }

        res.status(200).json({
            successMessage: `Sản phẩm ${productId} được thay đổi thành công`,
            product: req.body
        });

    } catch (error) {
        console.log(
            "ERROR | product Controllers | UPDATE -> /api/product/:id: ",
            error
        );
        res.status(500).json({
            errorMessage: "Xin vui lòng thử lại sau <3",
        });
    }
};
