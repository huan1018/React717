let baseConfig = require('./webpack.base')
const webpack = require('webpack')
// const UglifyPlugin = require('uglifyjs-webpack-plugin')
let UglifyPlugin = webpack.optimize.UglifyJsPlugin;
let DefinePlugin = webpack.DefinePlugin;
baseConfig.plugins.push(new UglifyPlugin())
baseConfig.plugins.push(new DefinePlugin({
    "process.env":'"production"'
}))
module.exports = {
    ...baseConfig
}