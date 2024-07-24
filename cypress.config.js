const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000', // Adjust this to match the URL your application runs on
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
