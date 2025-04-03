const { defineConfig } = require("cypress");
const { startDevServer } = require("@cypress/vite-dev-server");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("dev-server:start", async (options) => {
        return startDevServer({
          options,
          viteConfig: {
            configFile: path.resolve(__dirname, "../vite.config.ts"),
          },
        });
      });

      return config;
    },
    baseUrl: "http://localhost:5173",
  },
});

