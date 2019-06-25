module.exports = {
    rootDir: './',
    setupFiles: ['<rootDir>/enzyme.config.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testMatch: ['<rootDir>/test/*.js'],
    transform: {
      '\\.m?jsx?$': 'babel-jest'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(?:lodash-es)/)']
};
  