const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: path.resolve(__dirname, '../test/test.index.js'),
    plugins: [
        new HtmlWebpackPlugin({
            template: './test/test.html',
        }), // HTML template
    ],
    devServer: {
        host: 'localhost',
        // port: '8088',
        open: true,
        client: {
            overlay: true,
        },
    }
}
