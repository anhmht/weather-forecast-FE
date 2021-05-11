"use strict";
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkerPlugin = require('worker-plugin');
var webpack = require("webpack");
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const devMode = process.env.NODE_ENV !== 'production';

const random = new Date().getTime();

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        app: "./src/main.ts"
    },
    target: "web",
    output: {
        path: config.build.assetsRoot,
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].js",
        publicPath:
            process.env.NODE_ENV === "production"
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
    },

    resolve: {
        extensions: [".js", ".ts", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src")
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules|vue\/src/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            appendTsSuffixTo: ["//.vue$/"]
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: vueLoaderConfig
            },
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "file-loader",
                options: {
                    name: "[path]/[name].[ext]",
                    esModule: false
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "file-loader"
            },
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            // esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WorkerPlugin(),
        new VueLoaderPlugin({}),
        new MiniCssExtractPlugin({
            filename: devMode
                ? "app/css/[name]." + random + ".css"
                : "app/css/app.[name].[hash]." + random + ".css",
            chunkFilename: devMode
                ? "app/css/[id]." + random + ".css"
                : "app/css/[name].[hash]." + random + ".css",
            ignoreOrder: true
        })
    ]
};
