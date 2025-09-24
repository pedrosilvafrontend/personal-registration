import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
// const { compilerOptions } = require('./tsconfig.json');

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json', // Ensure this points to your spec tsconfig
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/app/core/$1',
    '^@validators/(.*)$': '<rootDir>/src/app/validators/$1',
    '^@core(.*)$': '<rootDir>/src/app/core$1',
    '^@validators(.*)$': '<rootDir>/src/app/validators$1',
  },
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
export default config;
