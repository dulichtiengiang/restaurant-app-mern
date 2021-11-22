//! models
const Product = require("../models/product");

exports.getNewArrivals = async (req, res) => {
    //! Trường hợp Request không đẩy sortBy và limit mặc định lên được thì:
    //! default: sortBy: 'desc' limit: 3
    const sortBy = req.query.sortBy ? req.query.sortBy : "decs"; //! make BE Default: descending Giảm dần
    const limit = req.query.limit ? parseInt(req.query.limit) : 3; //! make BE Default

    console.log(`sortBy: `, sortBy, `- limit: `, limit);

    try {
        const newArrivals = await Product.find({}).sort({ createdAt: sortBy }).limit(limit);
        res.status(200).json({ newArrivals });
    } catch (error) {
        console.log("ERROR filterController.getNewArrivals", error);

        res.status(500).json({
            errorMessage: "Xin vui lòng thử lại sau <3",
        });
    }
};

exports.searchByQueryType = async (req, res) => {
    console.log("RES filterController.searchByQueryType");
    const { type, query } = req.body;
    console.log(`type :`, type, `- query: `, query);
    try {
        let products;
        switch (type) {
            case "text":
                products = await Product.find({ $text: { $search: query } }); //! indexes. productName -> "text"
                break;
            case "category":
                products = await Product.find({ productCategory: query });
                break
        }
        //! Nếu không tìm ra sản phẩm (!products.length > 0) thì get tất cả sản phẩm
        if (!products.length > 0) {
            products = await Product.find({});
        }

        res.json({ products });

    } catch (error) {
        console.log("ERROR filterController.searchByQueryType", error);
        res.status(500).json({
            errorMessage: "Xin vui lòng thử lại sau <3",
        });
    }
};
