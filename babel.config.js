module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      "@babel/plugin-transform-flow-strip-types",
      "@babel/plugin-proposal-export-namespace-from",
      [
        "@babel/plugin-proposal-class-properties",
        {
          loose: true,
        },
      ],
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      [
        "@babel/plugin-proposal-private-methods",
        {
          loose: true,
        },
      ],
    ],
  };
};
