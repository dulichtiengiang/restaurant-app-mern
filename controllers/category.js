const Category = require("../models/category");

exports.create = async (req, res) => {
    const { category } = req.body; //! name Category
    // console.log('category: ', category);
    try {
        const existCategory = await Category.findOne({ category });
        if (existCategory) {
            console.log(`Loại: ${category} đã được tạo`);
            return res
                .status(400)
                .json({ errorMessage: `Loại: ${category} đã được tạo` });
        }
        //! create Category instance
        let newCategory = new Category();
        newCategory.category = category;

        newCategory = await newCategory.save();

        res.status(200).json({
            category: newCategory,
            successMessage: `Bạn đã thêm Loại: ${newCategory.category} thành công`,
        });
        console.log("categoryController.create | newCategory: ", newCategory);
    } catch (error) {
        res.status(500).json({
            errorMessage: "Xin vui lòng thử lại sau <3",
        });
        console.log("categoryController.create | error: ", error);
    }
};

exports.readAll = async (req, res) => {
    try {
        const categories = await Category.find({}); //! [{obj}, {obj}, {obj}, ...]
        res.status(200).json({ categories });
    } catch (error) {
        console.log("categoryController.readAll | error: ", error);
        res.status(500).json({
        errorMessage: "Xin vui lòng thử lại sau <3",
        });
    }
};

exports.delete = async (req, res)  => {
    console.log("DELETE productController.delete");
    const { categoryId } = req.params;
    console.log(`categoryId: `, categoryId);
    try {
        const oldCategory = await Category.findOneAndDelete({ _id: categoryId });
        res.status(200).json({ oldCategory });
    } catch (error) {
        console.log("ERROR productController.delete: ", error);
        res.status(500).json({
        errorMessage: "Xin vui lòng thử lại sau <3",
        });
    }
}
