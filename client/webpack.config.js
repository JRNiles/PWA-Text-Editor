const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Generate HTML file for the main entry point
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E'
      }),  


      // Generate manifest.json for PWA
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "A simple text editor app",
        background_color: "#ffffff",
        theme_color: "#31a9e1",
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),

      // Inject the service worker into the bundle
      new InjectManifest({
        swSrc: "./src-sw.js", // Path to your service worker file
        swDest: "sw.js", // Output service worker file name
        exclude: [/\.map$/, /asset-manifest\.json$/], // Exclude unnecessary files from being included in the service worker
      }),
    ],

    module: {
      rules: [
        // Add CSS loader configuration
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },

        // Add Babel loader configuration
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
      ],
    },
  };
};
