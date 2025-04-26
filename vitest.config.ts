import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setupTests.ts", "./vite.setup.ts"],
    },
    exclude: [...configDefaults.exclude, "**/e2e/**"], // Example: Exclude e2e tests
    coverage: {
      provider: "v8", // Use Vite's default coverage provider
      reporter: ["text", "json", "html"],
    },
  },
});
