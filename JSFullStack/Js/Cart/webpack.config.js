const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Xử lý tất cả file .js
        exclude: /node_modules/, // Bỏ qua node_modules
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // Cấu hình preset cho Babel
          },
        },
      },
      {
        test: /\.css$/, // Xử lý file CSS
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/, // Xử lý hình ảnh
        type: "asset/resource",
        generator: {
          outputPath: "assets/", // Đặt hình ảnh vào thư mục assets trong dist
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 8080,
    open: true,
  },
  mode: "development",
};
