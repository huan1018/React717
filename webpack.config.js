const webpack = require('webpack')
let UglifyPlugin = webpack.optimize.UglifyJsPlugin;
let dir = process.cwd() //获取当前程序运行的目录
let baseConfig = { //commonjs规范
    entry:{ 
        "bundle":__dirname+'/src/main'
    },
    output:{
        filename:'[name].js',
        path:__dirname+'/dist'
    },
    module:{ 
        rules:[ //配置项
            {
                test:/\.(js|jsx)$/,
                use:['babel-loader']
            }
        ]
    },
    plugins:[],//插件
}
let config= {}
if(process.env.NODE_ENV=='development'){
    config={
        ...baseConfig,
        devServer:{
            historyApiFallback:true,
            inline:true,
            open:true,
            port:3000
        },
        devtool:"eval-source-map"
    }
}
//生产模式
if(process.env.NODE_ENV=='production'){
    //往plugins中追加插件
    baseConfig.plugins.push(new UglifyPlugin())
    config={
        ...baseConfig
    }
}
module.exports = config