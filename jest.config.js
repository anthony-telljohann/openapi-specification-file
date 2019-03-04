module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  collectCoverageFrom: ['**/*.ts', '!**/fixtures/**'],
  coverageDirectory: '../reports/coverage/unit',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  reporters: [
    'default',
    ['jest-junit', { output: '../reports/tests/unit-test-evidence.xml' }],
    [
      'jest-html-reporter',
      {
        outputPath: '../reports/cucumber/requirements-evidence.html'
      }
    ]
  ]
}
