const Dotenv = require('dotenv-webpack');
const path = require('path');
config.resolve.alias['crypto'] = 'crypto-js';

module.exports = {
    plugins: [
        new Dotenv({
            path: path.resolve(process.cwd(), '.env')
        })
    ],
    resolve: {
        fallback: {
            crypto: require.resolve("crypto-js")
        }
    }
};