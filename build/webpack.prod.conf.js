'use strict'
process.traceDeprecation = true
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const random = new Date().getTime();
const env = process.env.NODE_ENV === 'testing' ?
  require('../config/test.env') :
  require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
    mode: "production",
    module: {
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
        },
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSPlugin({})]
    },
    plugins: [env],
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        publicPath: "/", // github-page: "/weather-forecast-FE/",
        filename: utils.assetsPath("js/[name].[chunkhash]." + random + ".js"),
        chunkFilename: utils.assetsPath(
            "js/[name].[chunkhash]." + random + ".js"
        )
    },
    plugins: [
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, "../dist/index.html"),
            template: "index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: "none"
        }),
        // keep module.id stable when vender modules does not change
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../static"),
                    to: "static"
                }
            ]
        }),
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /fr|nl-be|uk|en-gb/
        )
    ]
});

module.exports = webpackConfig
