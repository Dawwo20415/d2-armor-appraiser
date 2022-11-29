/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@scripts/(.*)"   : "<rootDir>/src/scripts/$1",
    "@assets/(.*)"    :"<rootDir>/src/assets/$1",
    "@Ibrowser/(.*)"  : "<rootDir>/src/scripts/browser/$1",
    "@Ibungie/(.*)"   : "<rootDir>/src/scripts/bungie-api-interaction/$1",
    "@Bhashes/(.*)"   : "<rootDir>/src/scripts/bungie-api-interaction/hashes/$1",
    "@algorithms/(.*)": "<rootDir>/src/scripts/scoring-algorithms/$1",
    "@dataTypes/(.*)" : "<rootDir>/src/interfaces/$1"
  }
};
