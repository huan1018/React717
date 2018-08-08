let path = require('path')

let dir = process.cwd() //获取当前程序运行的目录
let baseConfig = { //commonjs规范
    entry:{ 
        "bundle":dir+'/src/main'
    },
    output:{
        filename:'[name].js',
        path:dir+'/dist'
    },
    module:{ 
        rules:[ //配置项
            {
                test:/\.(js|jsx)$/,
                use:['babel-loader']
            },
            { test: /\.css$/,use:['style-loader','css-loader']},
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                    loader: "url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]"
                    }
                ]
            },
            {
                test: /\.(png|jpg?e|gif)$/,
                use: ["url-loader"]
            }
        ]
    },
    plugins:[],//插件
    resolve:{
        extensions:['.js','.jsx']//省略后缀
    }
}
module.exports = baseConfig