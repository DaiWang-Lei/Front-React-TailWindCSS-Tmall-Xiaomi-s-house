const path = require("path");
module.exports = (env, argv) => ({
	"entry": path.resolve('./src/index'),
	"output": {
		"filename": "index.js",
		"path": path.resolve('./dist')
	},
	"module": {
		"rules": [
			{
				"oneOf": [
					{
						"test": /\.js$/i,
						"exclude": argv.mode === 'production' ? [/webpack/, /babel/, /core-js/] : /node_modules/,
						"use": [
							{
								"loader": "babel-loader",
								"options": {
									"babelrc": false,
									"presets": [
										[
											"@babel/preset-env",
											{
												"useBuiltIns": "usage",
												"corejs": "core-js@3",
												"targets": {
													"chrome": "49"
												}
											}
										]
									],
									"sourceType": "unambiguous"
								}
							}
						]
					},
					{
						"test": /\.(ts|tsx|jsx)$/i,
						"exclude": argv.mode === 'production' ? [/webpack/, /babel/, /core-js/] : /node_modules/,
						"use": [
							{
								"loader": "babel-loader",
								"options": {
									"babelrc": false,
									"presets": [
										[
											"@babel/preset-env",
											{
												"useBuiltIns": "usage",
												"corejs": "core-js@3",
												"targets": {
													"chrome": "49"
												}
											}
										]
									],
									"sourceType": "unambiguous"
								}
							},
							{
								"loader": "ts-loader",
								"options": {
									"allowTsInNodeModules": true,
									"compilerOptions": {
										"declaration": false
									}
								}
							}
						]
					},
					{
						"test": /\.css$/i,
						"use": [
							"style-loader",
							{
								"loader": "css-loader",
								"options": {
									"importLoaders": 1,
									"modules": true
								}
							},
							{
								"loader": "postcss-loader",
								"options": {
									"ident": "postcss",
									"plugins": [
										require('tailwindcss'),
										require('autoprefixer')
									]
								}
							}
						],
						"include": /\.module.css$/i
					},
					{
						"test": /\.css$/i,
						"use": [
							"style-loader",
							{
								"loader": "css-loader",
								"options": {
									"importLoaders": 1
								}
							},
							{
								"loader": "postcss-loader",
								"options": {
									"ident": "postcss-tailwind",
									"plugins": [
										require('tailwindcss'),
										require('autoprefixer'),
										require('@fullhuman/postcss-purgecss')({
                                            content: [
                                                './src/**/*.html',
                                                './src/**/*.vue',
                                                './src/**/*.jsx',
                                                './src/**/*.tsx'
                                            ],
                                            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
                                            whitelist: ['html', 'body']
                                        })
									]
								}
							}
						],
						"include": [
							path.resolve('./node_modules/tailwindcss')
						],
						"exclude": argv.mode === 'production' ? [/webpack/, /babel/, /core-js/] : /node_modules/
					},
					{
						"test": /\.css$/i,
						"use": [
							"style-loader",
							{
								"loader": "css-loader",
								"options": {
									"importLoaders": 1
								}
							},
							{
								"loader": "postcss-loader",
								"options": {
									"ident": "postcss",
									"plugins": [
										require('tailwindcss'),
										require('autoprefixer')
									]
								}
							}
						]
					},
					{
						"loader": "file-loader",
						"exclude": [/.(js|mjs|jsx|ts|tsx)$/, /.json$/]
					}
				]
			}
		]
	},
	"resolve": {
		"extensions": [
			".js",
			".ts",
			".jsx",
			".tsx",
			".css"
		]
	},
	"node": {
		"fs": "empty"
	},
	"plugins": [
		new (require('html-webpack-plugin'))({
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app',
            meta: [{
                name: 'viewport',
                content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
            }]
        }),
		...(argv.mode === 'production' ? [] : [new (require('webpack')).DefinePlugin({
            development: JSON.stringify(true)
        })])
	],
	"optimization": {
		"minimizer": [
			new (require('terser-webpack-plugin'))({
                terserOptions: {
                    safari10: true
                }
            })
		]
	},
	"mode": "development",
	"stats": "minimal",
	"devServer": {
		"compress": true,
		"open": true,
		"host": "localhost",
		"port": 3000,
		"contentBase": path.resolve('./dist'),
		"https": false,
		"useLocalIp": false
	}
});