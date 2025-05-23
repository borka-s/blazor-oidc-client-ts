const path = require('path');
const webpack = require('webpack');
const TerserJsPlugin = require("terser-webpack-plugin");

module.exports = (env, args) => ({
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devtool: false, // Source maps configured below
    module: {
        rules: [{ test: /\.ts?$/, loader: 'ts-loader' }]
    },
    entry: {
        'AuthenticationService2': './AuthenticationService2.ts',
    },
    output: { path: '<SET_PATH_HERE>', filename: '[name].js' },
    performance: {
        maxAssetSize: 122880,
    },
    optimization: {
        sideEffects: true,
        concatenateModules: true,
        providedExports: true,
        usedExports: true,
        innerGraph: true,
        minimize: true,
        minimizer: [new TerserJsPlugin({
            terserOptions: {
                ecma: 2019,
                compress: {
                    passes: 3
                },
                mangle: {
                },
                module: false,
                format: {
                    ecma: 2019
                },
                keep_classnames: false,
                keep_fnames: false,
                toplevel: true
          }
        })]
    },
    plugins: Array.prototype.concat.apply([
        new webpack.DefinePlugin({
            'process.env.NODE_DEBUG': false,
            'Platform.isNode': false
        }),
    ], args.mode !== 'development' ? [] : [
        // In most cases we want to use external source map files
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            exclude: 'blazor.webview.js',
        })
    ]),
    stats: {
        warnings: true,
        errors: true,
        performance: true,
        optimizationBailout: true
    }
});
