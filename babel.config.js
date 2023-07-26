module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["@babel/preset-env"],
    plugins: [
      "macros",
      "@babel/plugin-syntax-jsx",
      "@babel/plugin-transform-nullish-coalescing-operator",
      "@babel/plugin-transform-optional-chaining",
    ],
  };
};
