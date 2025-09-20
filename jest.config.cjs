const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom", // ahora sí lo reconocerá
  transform: {
    ...tsJestTransformCfg,
  },
};
