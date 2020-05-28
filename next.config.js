const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const withFonts = require("next-fonts")

module.exports = withFonts({
  webpack: (config) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }

    return config
  },
  target: "serverless",
})
