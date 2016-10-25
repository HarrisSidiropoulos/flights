/* eslint no-console: */
const {resolve} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const packageJSON = require('./package.json')
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = env => {
  env = env || {};
  const rxjs = ['rxjs/Observable', 'rxjs/Subject', 'rxjs/observable/fromPromise', 'rxjs/observable/of', 'rxjs/observable/merge', 'rxjs/add/operator/mergeMap', 'rxjs/add/operator/do', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/filter', 'rxjs/add/operator/takeWhile', 'rxjs/add/operator/takeUntil', 'rxjs/add/operator/catch', 'rxjs/add/operator/map', 'rxjs/operator/switchMap']
  const material = ['material-ui/RaisedButton','material-ui/RefreshIndicator','material-ui/Card','material-ui/TextField','material-ui/DatePicker','material-ui/FlatButton','material-ui/AutoComplete','material-ui/styles/MuiThemeProvider']
  let dependencies = []
  for (let key in packageJSON.dependencies) {
    if (!(key=='rxjs' || key=='material-ui')) {
      dependencies.push(key)
    }
  }
  dependencies = dependencies.concat(rxjs).concat(material)
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
      vendor: ifProd(dependencies),
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
        ifProd({test: /\.css$/, loader: 'style!css?modules', include: /flexboxgrid/}),
        ifDev({test: /\.css$/,   loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'}),
        ifDev({test: /\.scss$/,  loaders: ["style", "css", "sass?sourceMap"]}),
        // ifProd({test: /\.css$/,   loader: ExtractTextPlugin.extract("style-loader", "css-loader")}),
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
      ifProd(new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$/,
        threshold: 10240,
        minRatio: 0.8
      })),
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
      ifProd(new OfflinePlugin({ServiceWorker:{events:true},AppCache:false}))
    ])
  })
}
