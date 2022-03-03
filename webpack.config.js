const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        //告诉webpack不适用箭头函数
        environment: {
            arrowFunction: false
        }
    },
    // 指定webpack打包时要使用模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                //test指定的是规则生效的文件
                test: /\.ts$/,
                //执行顺序从右往前
                use: [
                    {
                        loader: "babel-loader",
                        //设置babel
                        options: {
                            //设置预定义环境
                            presets:[
                                [
                                    //指定环境插件
                                    "@babel/preset-env",
                                    {
                                        //要兼容的目标浏览器
                                        targets:{
                                            "chrome":"87",
                                            "ie":"11"
                                        },
                                        "corejs":"3",
                                        // 使用corejs的方式 "usage"表格按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node-modules/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    //引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]

                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // title: "自定义title"
            template: "./src/index.html"
        }),
    ],
    //用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}