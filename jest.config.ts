// just a default config
import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json' 
    },
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
    "^@/(.*)$": "<rootDir>/src/$1", // absolute imports (optional)
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],   // Setup file
};

export default config;
