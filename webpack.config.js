module.exports = {
    entry: "./public/app.jsx",
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        root: __dirname,
        alias: {
            Table: 'public/components/Table.jsx',
            Cell: 'public/components/Cell.jsx'
        },
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            },
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/
        }]
    }
};