module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#89D4F4',
          light: '#B8E5F8',
          dark: '#15A2DF',
        },
        secondary: {
          DEFAULT: '#f4a989',
          light: '#fbdccf',
        },
        danger: {
          DEFAULT: '#F4899E',
        },
        gray: {
          DEFAULT: '#868383',
        },
      },
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
