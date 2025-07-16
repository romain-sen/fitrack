const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname, {
  // Add this to ensure proper JSX handling
  resolver: {
    sourceExts: ["js", "jsx", "json", "ts", "tsx"],
  },
});

module.exports = withNativeWind(config, { input: "./global.css" });
