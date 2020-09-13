const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}


const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                plugins: ['@babel/plugin-proposal-class-properties'],
                presets: ['@babel/preset-env']
            }
        }
    ]
    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: isDev ? 'source-map' : false,
    optimization: optimization(),
    devServer: {
        port: 8800,
        hot: isDev
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html',
            favicon: path.resolve(__dirname, 'src/icon.ico'),
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src/icon.ico'), to: path.resolve(__dirname, 'dist')},
                {from: path.resolve(__dirname, 'src/scss/navigation.png'), to: path.resolve(__dirname, 'dist')},
                {from: path.resolve(__dirname, 'src/scss/cursor.png'), to: path.resolve(__dirname, 'dist')},


            ],

        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.(png|jpe?g|gif|cur)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    }
}
