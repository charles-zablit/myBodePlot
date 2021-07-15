var path = require('path');
module.exports = {
  entry: {
    app: path.join(__dirname, "../src/app.tsx"),
  },
  output: {
    path: path.join(__dirname, "../../backend/static/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: {
          loader: "babel-loader",
          options: {
            presets: [['@babel/preset-env', { modules: false }], "@babel/react"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}