const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const withFonts = require("next-fonts")
const withImages = require("next-images")

module.exports = withImages(
  withFonts({
    webpack: (config) => {
      if (config.resolve.plugins) {
        config.resolve.plugins.push(new TsconfigPathsPlugin())
      } else {
        config.resolve.plugins = [new TsconfigPathsPlugin()]
      }

      return config
    },
    target: "serverless",
  }),
)
