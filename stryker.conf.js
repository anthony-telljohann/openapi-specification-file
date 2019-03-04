module.exports = function(config) {
  config.set({
    mutator: 'typescript',
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'jest',
    transpilers: ['typescript'],
    coverageAnalysis: 'off',
    tsconfigFile: 'tsconfig.json',
    mutate: [
      '{src,lib}/**/*.ts?(x)',
      '!{src,lib}/**/?(*.)+(spec|fixture).ts?(x)'
    ],
    thresholds: { high: 100, low: 100, break: 100 }
  })
}
