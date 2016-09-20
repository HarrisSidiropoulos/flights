/* eslint no-console: */
const {resolve} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const packageJSON = require('./package.json')

module.exports = env => {
  env = env || {};
  const specifyProp = (add, value) => add ? value : undefined
  const ifProd = value => specifyProp(env.prod, value)
  const ifDev = value => specifyProp(!env.prod, value)
  const removeEmpty = obj => {
    if (Array.isArray(obj)) {
      return obj.filter(i => !!i)
    }
    for (var i in obj) {
      if (obj[i] === null || obj[i] === undefined) {
        delete obj[i];
      }
    }
    return obj;
  }
  const assetsPath = env.prod?'assets/':''
  const indexPath = env.prod?'../':''
  return removeEmpty({
    entry: removeEmpty({
      vendor: ifProd(['react', 'react-dom', 'redux', 'react-redux', 'redux-observable', 'rxjs', 'date-format', 'isomorphic-fetch']),
      app: removeEmpty([
        ifDev('webpack-hot-middleware/client?reload=true'),
        './js/index.js'
      ])
    }),
    output: {
      filename: env.prod ? 'bundle.[name].[chunkhash].js' : '[name].js',
      path: resolve(__dirname, `dist/${assetsPath}`),
      pathinfo: !env.prod,
      publicPath: assetsPath
    },
    context: resolve(__dirname, 'src'),
    devtool: ifDev('eval-source-map'),
    module: {
      loaders: removeEmpty([
        {test: /\.js$/, loader: 'babel', query: { "presets": removeEmpty(["es2015", "stage-2", "react", ifDev("react-hmre")]), "plugins": ["transform-class-properties"] }, exclude: /node_modules/},
        {test: /\.jade$/, loader: 'jade'},
        ifDev({test: /\.css$/,   loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'}),
        ifDev({test: /\.scss$/,  loaders: ["style", "css", "sass?sourceMap"]}),
        ifProd({test: /\.css$/,   loader: ExtractTextPlugin.extract("style-loader", "css-loader")}),
        ifProd({test: /\.scss$/,  loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")}),
        {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"},
        {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
        {test: /\.(jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=15000"},
        {test: /\.(png|gif|mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
        ifProd({ test: /\.js$/, loader: "strip-loader?strip[]=console.log" })
      ])
    },
    recordsPath: resolve(__dirname, './webpack-records.json'),
    plugins: removeEmpty([
      ifProd(new webpack.optimize.DedupePlugin()),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8:true,
          warnings: false
        }
      })),
      ifProd(new webpack.optimize.CommonsChunkPlugin({name:'vendor'})),
      ifProd(new ExtractTextPlugin('bundle.[name]-[hash].min.css')),
      new HtmlWebpackPlugin({
        filename: `${indexPath}index.html`,
        favicon: './images/favicon.png',
        title: packageJSON.name,
        description: packageJSON.description,
        template: './index.jade',
        NODE_ENV: env.prod ? 'production' : 'development',
        inject: !env.prod
      }),
      ifDev(new webpack.optimize.OccurrenceOrderPlugin()),
      ifDev(new webpack.HotModuleReplacementPlugin()),
      ifDev(new webpack.NoErrorsPlugin()),
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(env.prod ?'production':'development')}),
      ifProd(new OfflinePlugin({ServiceWorker:{events:true}}))
    ])
  })
}
