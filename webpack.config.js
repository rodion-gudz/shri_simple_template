const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;
const ProvidePlugin = require('webpack').ProvidePlugin;
const InterpolateHtmlPlugin = require('interpolate-html-plugin')

const config = {
    mode: "production",
    target: "web",
    entry: {
        index: "./src/index.js",
        about: './src/pages/About.js',
        home: './src/pages/Home.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
        new ProvidePlugin({
            process: 'process/browser',
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: 'static'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: ["/node_modules/"],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
                exclude: ["/node_modules/"],
            },
        ],
    },
    resolve: {
        fallback: {
            stream: require.resolve('stream-browserify'),
            crypto: require.resolve('crypto-browserify'),
        },
        extensions: ['.tsx', '.ts', '.js', ".jsx"],
        alias: {
            'crypto-browserify': path.resolve(__dirname, 'src/crypto-fallback.js'),
            "react-is": path.join(__dirname, 'node_modules/react-is/index.js'),
            'react-is.js': path.join(__dirname, 'node_modules/react-is/index.js'),
        }
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    optimization: {
        removeEmptyChunks: false,
        usedExports: true,
        removeAvailableModules: true,
        mergeDuplicateChunks: true,
        concatenateModules: true,
        splitChunks: {
            minChunks: 2,
            chunks: 'all',
            minSize: 20000,
            maxSize: 250000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                },
            },
        },
        runtimeChunk: {
            name: 'runtime',
        },
        minimize: true,
        moduleIds: "deterministic",
        innerGraph: true,
    },
};

module.exports = config;