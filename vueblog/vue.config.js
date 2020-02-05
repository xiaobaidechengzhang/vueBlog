const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin')

//gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css\json|icon|svg)(\?.*)?$/i;

//js压缩
 //const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
//const optimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const terserWebpackPlugin = require('terser-webpack-plugin')

function resolveDir (dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	publicPath: './',
	outputDir: 'dist',
	lintOnSave: false,
	
	chainWebpack: (config) => {
		//href引号
		config.plugin("html").tap(args => {
		      args[0].minify = false;
		      return args;
		    });
		config.module
			.rule('image')
				.test(/\.(png|svg|jpg|gif)$/)
				.use('file-image')
					.loader('file-loader', 'url-loader')
		config.module
			.rule('font')
				.test(/\.(woff|woff2|eot|ttf|otf)$/)
				.use('file-font')
					.loader('file-loader')
		config.module
			.rule('css')
				.test(/\.css$/)
				.use('style')
					.loader('style-loader', 'css-loader')
		// config.module
		// 	.rule('compile')
		// 		.test(/\.js$/)
		// 		.include
		// 			.add(resolveDir('src'))
		// 			.add(resolveDir('/node_modules/'))
		// 			.add(resolveDir('tests'))
		// 			.end()
		// 		.use('babel')
		// 			.loader('babel-loader')
		// 			.options({
		// 				presets:[
		// 					['@babel/preset-env',{ modules: false }]
		// 				]
		// 			})
	},
	configureWebpack: config => {
		
		
		const plugins = [];
		plugins.push(
			//内置plugin
			//provideplugin: 提供全局声明$
			new webpack.ProvidePlugin({
				$: 'jquery'
			})
		)
		
		config.plugins = [
			...config.plugins,
			...plugins
		]
	
		 // config.externals = {
		 //            'vue': 'Vue',
		 //            'element-ui': 'ELEMENT',
		 //            'vue-router': 'VueRouter',
		 //            'vuex': 'Vuex',
		 //            'axios': 'axios',
			// 					'jquery': 'jquery',
			// 					'highlight.js': 'highlight'
		 //          };
		  
		  //gzip打包 compression-webpack-plugin
		  const gzipPlugins = [];
		  gzipPlugins.push(
			new CompressionWebpackPlugin({
				filename: '[path].gz[query]',
				algorithm: 'gzip',
				test: productionGzipExtensions,
				threshold: 10240,
				minRatio: 0.8
			})
		  )
		  config.plugins = [
		  	...config.plugins,
		  	...gzipPlugins
		  ];
			
			//js压缩混淆
			config.optimization = {
				minimize: true,
				minimizer: [
					new terserWebpackPlugin ({
						test: /\.js(\?.*)?$/i,
						terserOptions: {
							compress: {
								drop_console: true,
								pure_funcs:['console.log']
							}
						}
					})
				],
				splitChunks: {
					chunks: 'all',
               		minSize: 10240,
                	maxSize: 0,
                	minChunks: 1,
                	cacheGroups: {
                    	vendors: {
                        	test: /[\\/]node_modules[\\/]/,
                        	priority: -10,
                    	},
                    	default: {
                        	priority: -20,
                        	reuseExistingChunk: true,
                    	},
                	},
				}
				
			}
		// js压缩混淆
		//  let optimization = {
		//     minimizer: [new UglifyjsWebpackPlugin({
		//         uglifyOptions: {
		//             warnings: false,
		// 						ecma: 6,
		//             compress: {
		//                 drop_console: true, 
		//                 drop_debugger: false,
		//                 pure_funcs: ['console.log'] 
		//             }
		//         }
		//     })]
			
		// }
		// Object.assign(config, {
		//      optimization
		// })
		
		// const UgjsPlugin = [];
		// UgjsPlugin.push(
		//   new UglifyjsWebpackPlugin({
		// 			parallel: true,
		// 			uglifyOptions: {
		// 			ie8: false,
		// 			ecma: 6,
		// 			warnings: false,
		// 			mangle: true, // debug false
		// 			output: {
		// 			comments: false,
		// 			beautify: false, // debug true
		// 			},
		//       compress: {
		//             drop_debugger: true, // 注释debugger
		//             drop_console: true, // 注释console
		//             pure_funcs:['console.log'] // 移除console
		//       },
		//     },
		//     sourceMap: false,   // 去除打包后生成的.map文件
		//     parallel: true,
		// })
		// )
		
		// config.plugins = [
		// 	...config.plugins,
		// 	...UgjsPlugin
		// ]
		
		Object.assign(config, {
		  // 开发生产共同配置
		  resolve: {
		    extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
		    alias: {
		      vue$: "vue/dist/vue.js",
		      "@": path.resolve(__dirname, "./src"),
		      "@c": path.resolve(__dirname, "./src/components"),
		      utils: path.resolve(__dirname, "./src/utils"),
		      views: path.resolve(__dirname, "./src/views"),
		      assets: path.resolve(__dirname, "./src/assets"),
		      com: path.resolve(__dirname, "./src/components"),
		      store: path.resolve(__dirname, "./src/store"),
		    }
		  }
		})
		
	},
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
	// css相关配置
	css: {
	  //是否使用css分离插件 ExtractTextPlugin
	//object | boolean
	  extract: {
		filename: 'css/[name].index.[hash].css',
		chunkFilename: 'css/[name].index.[hash].css'
	},
	 //extract: true,
	   // 开启 CSS source maps?
	   sourceMap: false,
	   //css预设器配置项
	   loaderOptions: {},
	  // 启用 CSS modules for all css / pre-processor files.
	   requireModuleExtension: true
	},
	// 第三方插件配置
	pluginOptions: {
	  // ...
	},
	devServer: {
		open: true,
		host: 'localhost',
		port: 8080,
		https: false,
		hotOnly: false,
		proxy: 'http://localhost:3000/'
	}
	// transpileDependencies: [
	//         'vue-particles',
	//         'animejs',
	// 				'element-ui'
	// ]
	
}