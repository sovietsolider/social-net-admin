const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require("fs");

const pages = fs.readdirSync("./PUG_WEBPACK").filter(name => name.endsWith(".pug"));

module.exports = {
    mode: "development",
    devtool: false,
    entry: {
        users: "./webpack_entry_point/webpack_users.js",
        friends: "./webpack_entry_point/webpack_friends.js",
        news: "./webpack_entry_point/webpack_news.js"
    },
    output: {
        path: path.resolve(__dirname, "BUILD_WEBPACK"),
        filename: "./JS/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ],
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                use: [
                    "pug-loader"
                ],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["@babel/preset-env"] }
                }
            }
        ]
    },
    plugins: [
        ...pages.map(file => new HtmlWebpackPlugin({
            template: `./PUG_WEBPACK/${file}`,
            filename: `./HTML/${file.replace(/\.pug/,'.html')}`,
            //inject: 'body',
            chunks: [file.replace(/\.pug/, "")]
        }))
    ]
}