const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // Chế độ build: development hoặc production
  mode: "development",

  // File đầu vào
  entry: "./src/index.js",

  // Thư mục và file đầu ra
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // Xóa thư mục dist trước khi build mới
  },

  // Source maps để dễ debug
  devtool: "source-map",

  // Cấu hình dev server
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 8080,
    open: true, // Tự động mở trình duyệt
    hot: true, // Hot Module Replacement
  },

  // Các plugins
  plugins: [
    // Tạo file HTML từ template
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body",
    }),

    // Tách CSS thành file riêng thay vì nhúng vào JS
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],

  // Các loader xử lý file
  module: {
    rules: [
      // Xử lý JavaScript với Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      // Xử lý CSS
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Tách CSS thành file riêng
          "css-loader", // Xử lý @import và url() trong CSS
        ],
      },

      // Xử lý hình ảnh và font chữ
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
};
