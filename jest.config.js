module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '<rootDir>/setupJest.ts'
  ],
  testRegex: 'spec\\.ts$',
  coverageReporters: ["html", "cobertura"]
};