import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

module.exports = (env: any) => {
  const mode = env.NODE_ENV;
  const isDev = mode == "development";

  console.log(`Building main for ${mode}`);
  return {
    mode,
    context: path.join(__dirname, "src"),
    target: "electron-renderer",
    devtool: isDev ? "source-map" : "none",
    entry: {
      "render-process": "./render-process.tsx",
    },
    output: {
      filename: isDev ? "[name].js" : "[name].[hash].js",
      path: path.join(__dirname, "dist"),
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-typescript",
                "@babel/preset-react",
                "@babel/preset-env",
              ],
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          },
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "index.html",
        cache: true,
      }),
    ],

    devServer: isDev
      ? {
          contentBase: path.join(__dirname, "dist"),
          compress: true,
          hot: true,
          port: 6564,
        }
      : undefined,
  };
};
