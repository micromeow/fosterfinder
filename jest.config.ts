import nextJest from 'next/jest.js';
import { Config } from 'jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const config: Config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['<rootDir>/devtools/'],
  moduleNameMapper: {
    '^@/lib/prisma': '<rootDir>/lib/prisma',
    '^@/lib/auth/next-auth-config': '<rootDir>/lib/auth/next-auth-config',
  },
  transformIgnorePatterns: ['/node_modules/(?!next-auth)'],
  setupFilesAfterEnv: ['<rootDir>/prisma/prisma-fixture.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
