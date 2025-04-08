export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
    // "^.+\\.jsx?$": "babel-jest",
  },
  // globals: {
  //   "ts-jest": {
  //     useESModules: true, // Esto le indica a Jest que use los módulos ESM
  //   },
  // },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // setupFiles: ["<rootDir>/jest.setup.ts"],
};
