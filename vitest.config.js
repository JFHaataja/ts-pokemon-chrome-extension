"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setupTests.ts", "./vite.setup.ts"],
    },
    exclude: __spreadArray(
      __spreadArray([], config_1.configDefaults.exclude, true),
      ["**/e2e/**"],
      false,
    ), // Example: Exclude e2e tests
    coverage: {
      provider: "v8", // Use Vite's default coverage provider
      reporter: ["text", "json", "html"],
    },
  },
});
