const path = require("path");
const paths = require("./paths");
const dotenv = require("dotenv");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

dotenv.config();

module.exports = {
    entry: [paths.src + "/index.js"],

    output: {
        path: paths.build,
        filename: "js/bundle.js", // or [name].bundle.js
        publicPath: "/" // defulat가 auto임
    },

    plugins: [
        new CleanWebpackPlugin(),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public + "/assets",
                    //to: "assets",
                    globOptions: {
                        ignore: ["*.DS_Store"] //mac 메타데이터 파일 무시
                    },
                    noErrorOnMissing: true
                },
                {
                    from: paths.public + "/robots.txt",
                    to: ".",
                    globOptions: {
                        ignore: ["*.DS_Store"]
                    },
                    noErrorOnMissing: true
                },
                {
                    from: paths.public + "/_redirects",
                    to: ".",
                    globOptions: {
                        ignore: ["*.DS_Store"]
                    },
                    noErrorOnMissing: true
                },
                {
                    from: paths.public + "/firebase-messaging-sw.js",
                    to: ".",
                    globOptions: {
                        ignore: ["*.DS_Store"]
                    },
                    noErrorOnMissing: true
                },
            ]
        }),

        new HtmlWebpackPlugin({
            template: paths.public + "/index.html",
            filename: "index.html",
            templateParameters: {
                description:
                    'showoff',
                keywords:
                    'showoff',
                title: 'showoff',
                url: 'https://show-off.netlify.app'
            }
        }),

        //전역변수 설정
        new Dotenv({
            path: path.join(__dirname, ".env"),
            systemvars: true
        }),

    ],

    // import시 alias설정 (별명)
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "../src/components")
        },
        extensions: [".jsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-react",
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        browsers: [
                                            "last 2 versions",
                                            "not ie <= 10"
                                        ]
                                    }
                                }
                            ]
                        ],
                        //새로운 스팩추가할때, 여기에추가
                        plugins: [
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-transform-modules-commonjs"
                        ]
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name][ext]"
                }
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg)$/,
                type: "asset",
                generator: {
                    filename: "assets/img/[name][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            }
        ]
    }
};
