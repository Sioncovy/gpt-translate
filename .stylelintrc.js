module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  customSyntax: "postcss-less",
  rules: {
    "selector-class-pattern": null
  },
  ignoreFiles: ["node_modules/**/*", "build/**/*"]
}
