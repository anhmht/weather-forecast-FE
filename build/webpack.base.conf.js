"use strict";
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkerPlugin = require('worker-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var webpack = require("webpack");
const CKEditorWebpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");
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
                : config.dev.assetsPublicPath,
        pathinfo: false
    },

    resolve: {
        extensions: [".js", ".ts", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src")
        },
        fallback: { crypto: false, fs: false, path: false }
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
                            appendTsSuffixTo: ["//.vue$/"],
                            transpileOnly: true
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
                include: path.resolve(__dirname, "src"),
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                type: "asset/resource",
                exclude: [
                    /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                    /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                type: "asset/resource"
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: "asset/resource",
                generator: {
                    filename: "static/font/[hash][ext][query]"
                }
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
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                use: ["raw-loader"]
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            injectType: "singletonStyleTag",
                            attributes: {
                                "data-cke": true
                            }
                        }
                    },
                    {
                        loader: "fast-css-loader",
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: styles.getPostCssConfig({
                            themeImporter: {
                                themePath: require.resolve(
                                    "@ckeditor/ckeditor5-theme-lark"
                                )
                            },
                            minify: true
                        })
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "fast-css-loader",
                    {
                        loader: "sass-loader", // compiles Sass to CSS
                        options: {
                            implementation: require.resolve("sass"),
                            sourceMap: false,
                            sassOptions: {
                                includePaths: [
                                    `${__dirname}/src/theme/main.scss`
                                ]
                            }
                            // additionalData: '@import "~@/theme/main.scss";'
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        // minimizer: [new UglifyJsPlugin()],
        runtimeChunk: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin({}),
        new WorkerPlugin(),
        new CKEditorWebpackPlugin({
            // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
            language: "en",
            translationsOutputFile: /app/
        }),
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
