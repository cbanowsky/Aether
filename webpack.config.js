var path = require("path");
var webpack = require("webpack");


module.exports = function(env) {
  env.NODE_ENV = (env.production) ? 'production' : 'development';
  process.env.NODE_ENV = env.NODE_ENV;

  const isProduction = (env.NODE_ENV === 'production');
  console.log(env.NODE_ENV);
  console.log(isProduction);

  return {
    "entry": "./src/es6/Main.jsx",
    "mode": env.NODE_ENV,
    "output": {
      "path": path.resolve("./src/js"),
      "filename": "Aether.js"
    },
    "module": {
      "rules": [
        {
          "test": /\.(js|jsx)$/,
          "use": [
            "babel-loader",
            "eslint-loader"
          ]
        },
        {
          "test": /\.(scss|sass)$/,
          "use": [
            {
              "loader": "style-loader"
            },
            {
              "loader": "css-loader",
              "options": {
                "url": false,
                "sourceMap": !isProduction,
                "minimize": isProduction
              }
            },
            {
              "loader": "sass-loader",
              "options": {
                "sourceMap": !isProduction
              }
            }
          ]
        },
        {
          "test": /\.svg$/,
          "use": [{
            "loader": "svg-inline-loader",
            "options": {
              "removeTags": true
            }
          }]
        }
      ]
    },
    "plugins": [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
      })
    ],
    "resolve": {
      "extensions": [ ".js", ".min.js", ".jsx" ],
      "modules": [ "./src/dist/js", "./node_modules", "./src" ]
    }
  };
};
