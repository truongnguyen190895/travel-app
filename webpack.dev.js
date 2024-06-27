const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/client/index.tsx",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [path.resolve(__dirname), "node_modules"],
    alias: {
      "@": path.resolve(__dirname, "src/client/"),
      "@components": path.resolve(__dirname, "src/client/components"),
      "@assets": path.resolve(__dirname, "src/client/assets"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/html/index.html",
      filename: "index.html",
    }),
  ],
  devServer: {
    port: 3000,
    allowedHosts: "all",
  },
};
