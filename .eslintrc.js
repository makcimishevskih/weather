module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2017,
    sourceType: "module",
    ecmaFeatures: {},
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          // components
          ["@components", "./components"],
          ["@core", "./components/core"],
          ["@layout", "./components/core/layout"],
          ["@features", "./components/features"],
          // pages
          ["@pages", "./pages"],
          // redux
          ["@redux", "./redux"],
          ["@slices", "./redux/slices"],
          // images
          ["@assets", "./assets"],
          ["@icons", "./assets/icons"],
          ["@images", "./assets/images"],
          // utils
          ["@utils", "./utils"],
          ["@services", "./utils/services"],
          ["@vars", "./utils/vars"],
          ["@helpers", "./utils/helpers"],
          ["@hooks", "./utils/hooks"],
        ],
        extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
      },
    },
  },
};
