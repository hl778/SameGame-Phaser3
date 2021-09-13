const {merge} = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin'); // minify
const CopyPlugin = require('copy-webpack-plugin'); //  copy assets
const base = require('./base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');

module.exports = merge(base, {
    mode: 'production',
    output: {
        filename: 'bundle.min.[chunkhash].js', // name
        path: path.resolve(__dirname, '../dist'),
        clean: true, // clean dist folder each rebuild
    },
    devtool: false,
    performance: {
        maxEntrypointSize: 900000,
        maxAssetSize: 900000,
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: {removeAll: true},
                        },
                    ],
                },
            }),
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: './public/assets', to: './assets'},
                {from: './manifest.webmanifest', to: './'},
            ],
        }),
        new MiniCssExtractPlugin({
            filename:"[name].[chunkhash].css"
        }),
    ],
});
