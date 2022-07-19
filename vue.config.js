const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg|ts)(\?.*)?$/i

module.exports = {
	// 公共路径(必须有的)
	publicPath: './',
	// 输出文件目录
	outputDir: 'dist',
	filenameHashing: true,
	// 静态资源存放的文件夹(相对于ouputDir)
	assetsDir: 'static',
	// 指定生成的 index.html 的输出路径
	indexPath: 'index.html',
	// 是否使用包含运行时编译器的 Vue 构建版本。
	runtimeCompiler: false,
	// eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
	lintOnSave: false,
	transpileDependencies: [],
	// 我用的only，打包后小些
	// compiler: false,//有
	productionSourceMap: false, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
	pages: {
		index: {
			entry: 'src//main.ts',
			template: 'public/index.html',
			filename: 'index.html',
			title: 'Amp Frontend',
			chunks: ['chunk-vendors', 'chunk-common', 'index'],
		},
	},
	// css: {
	// 	loaderOptions: {
	// 		sass: {
	// 			data: '@import "@/assets/css/common";',
	// 		},
	// 	},
	// },

	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('@assets', resolve('src/assets'))
			.set('@components', resolve('src/components'))
			.set('@common', resolve('src/common'))
			.set('@api', resolve('src/api'))
		config.module
			.rule('glsl')
			.test(/\.glsl$/)
			.use('raw-loader')
			.loader('raw-loader')
			.end()
	},

	configureWebpack: config => {
		config.output.filename = `static/js/[name].[hash].js`
		config.output.chunkFilename = `static/js/[name].[hash].js`
		const plugins = []
		// start 生成 gzip 压缩文件
		plugins.push(
			new CompressionWebpackPlugin({
				filename: '[path].gz[query]', //目标资源名称
				algorithm: 'gzip',
				test: productionGzipExtensions, //处理所有匹配此 {RegExp} 的资源
				threshold: 10240, //只处理比这个值大的资源。按字节计算(设置10K以上进行压缩)
				minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理
			}),
		)
		// End 生成 gzip 压缩文件
		config.plugins = [...config.plugins, ...plugins]
		if (process.env.NODE_ENV === 'production') {
			return {
				plugins: [
					//打包环境去掉console.log
					new TerserPlugin({
						terserOptions: {
							ecma: undefined,
							warnings: false,
							parse: {},
							compress: {
								drop_console: true,
								drop_debugger: false,
								pure_funcs: ['console.log'], // 移除console
							},
						},
					}),
				],
			}
		}
	},

	// webpack-dev-server 相关配置
	devServer: {
		hot: true,
		open: true, // npm run serve后自动打开页面
		host: '0.0.0.0', // 匹配本机IP地址(默认是0.0.0.0)
		port: 8088, // 开发服务器运行端口号
	},
}
