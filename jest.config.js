module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/types/**/*.{js,jsx,ts,tsx}',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  setupFiles: ['<rootDir>/spec/Setup.ts'],
  transformIgnorePatterns: [
    '"node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)"',
  ],
  moduleNameMapper: {
    '.+\\.(css|png|svg)$': 'identity-obj-proxy',
    'react-dom': 'react-native',
  },
}
