module.exports = {
  mode: 'jit',
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
        success: {
          DEFAULT: '#89f4a9',
        },
      },
      width: {
        '1/7': '14.285714%',
        '2/7': '28.571429%',
        '3/7': '42.857143%',
        '4/7': '57.142858%',
        '5/7': '71.428571%',
        '6/7': '85.714286%',
        '7/7': '100%',
      },
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
