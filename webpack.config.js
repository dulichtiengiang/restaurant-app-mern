const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const config = {
    // entry: ["./src/index.js", "./src/sass/index.scss"],
    entry: __dirname + "/src",
    output: {
        // path: path.join(__dirname, "dist"), //! __dirname lấy directory project
        path: "/",
        filename: "index.bundle.js",
    },
    // devServer: {
    //     port: 3010,
    //     watchContentBase: true,
    // },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin()],
};
module.exports = config;
