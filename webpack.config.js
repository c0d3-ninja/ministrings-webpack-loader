const path = require("path")
const HtmlWebpackPlugin= require("html-webpack-plugin")
const miniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports=()=>{
   return(
       {
           mode:'production',
           entry:{
               index:'./src/index.js'
           },
           devtool: 'inline-source-map',
           devServer:{
               contentBase:'./dist'
           },
           plugins:[
               new HtmlWebpackPlugin({
                   title:"Dev"
               }),
               new miniCssExtractPlugin()
           ],
           output:{
               filename:'[name].[contenthash].js',
               path:path.resolve(__dirname,'dist'),
               clean:true
           },
           optimization: {
               moduleIds:'deterministic',
               splitChunks: {
                   cacheGroups:{
                       vendor:{
                           test:/[\\/]node_modules[\\/]/,
                           name:"vendors",
                           chunks: 'all'
                       },
                       constants:{
                           test:/[\\/]MinifiableConstants[\\/]/,
                           name:"MinifiedConstants",
                           chunks: 'all'
                       },
                       miniConstants:{
                           test:/[\\/]NonMinifiableConstants[\\/]/,
                           name:"Constants",
                           chunks: 'all'
                       }

                   }
               },
               runtimeChunk:'single'
           },
           module:{
               rules:[
                   {
                     test:/\.js$/i,
                       use: {
                           loader: 'babel-loader',
                           options: {
                               presets: ['@babel/preset-env','@babel/preset-react']
                           }
                       }
                   },
                   {
                    test:/[\\/]MinifiableConstants[\\/]/,
                    loader:path.resolve("src/Loader/valuesMinifyLoader.js")
                   },

                   {
                       test: /\.(png|svg|jpg|jpeg|gif)$/i,
                       type: 'asset/resource',
                   },
                   {
                       test:/\.(ttf)$/i,
                       type: 'asset/resource'
                   }
               ]

           }
       }
   )
}
