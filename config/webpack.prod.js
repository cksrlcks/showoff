const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");

const paths = require("./paths");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    devtool: false,
    output: {
        path: paths.build,
        publicPath: "/",
        filename: "assets/js/[name].[contenthash].bundle.js"
    },
    plugins: [
        // css압축
        new MiniCssExtractPlugin({
            filename: "assets/css/[name].[contenthash].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: false
                        }
                    },
                    "sass-loader"
                ]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
        splitChunks: {
            chunks: "all",
            maxInitialRequests: 20,
            maxAsyncRequests: 20,
            minSize: 40,
            automaticNameDelimiter: "-",
            cacheGroups: {
                // 캐싱할 파일들
                vendors: {
                    name: "react",
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    chunks: "all"
                },
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: "runtime"
        }
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
});
