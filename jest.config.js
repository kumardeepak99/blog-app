const nextJest = require("next/jest");
const createJestConfig = nextJest({
  // path to Next.js app to load next.config.js and .env files in test environment
  dir: "./",
});

//any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["__tests__/__fixtures__"],
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
