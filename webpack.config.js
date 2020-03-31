const path = require('path');

module.exports = {
  entry:  './client/components/index.js', 
  output: {
    filename : "bundle.js",
    publicPath : path.resolve(__dirname, 'dist'),
    },
    module: {

      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
            presets: ["@babel/preset-react", "@babel/preset-env"]
            }
          }
        } 
      ]
    }
  };