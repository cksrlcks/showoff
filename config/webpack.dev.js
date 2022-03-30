const paths = require("./paths");

const Webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

let proxy = {};

if (process.env.REACT_APP_LOCAL_DEV) {
    proxy = {
        // 백앤드서버 프록시 필요할때
        // "/api/**": {
        //   target: "https://www.somebackend.com/",
        //   secure: false,
        //   changeOrigin: true
        // },
    };
}

const devConfig = {
    mode: "development",
    devtool: "inline-source-map",
    stats: "errors-only",
    devServer: {
        historyApiFallback: true,
        static: paths.build,
        open: true,
        compress: true,
        hot: true,
        watchFiles: ["src/**/*.js"],
        proxy,
        port: 3000
    },
    plugins: [
        // HOT RELOADING
        new Webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = merge(common, devConfig);
