module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '<rootDir>/setupJest.ts'
  ],
  testRegex: 'spec\\.ts$',
  coverageReporters: ["html", "cobertura"],
  coveragePathIgnorePatterns: [
    "node_modules",
    "src/Utils/Logger.ts"
  ]
};