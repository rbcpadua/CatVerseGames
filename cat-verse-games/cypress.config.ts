import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome" || browser.name === "edge") {
          launchOptions.args.push("--autoplay-policy=no-user-gesture-required");
        }
        return launchOptions;
      });
    },
  },
});
