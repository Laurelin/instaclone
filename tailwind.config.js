/** @format */

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  darkMode: 'media',
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary')
    }),
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#005c98'
      },
      black: {
        light: '#262626',
        faded: '#00000059',
        background: '#080910',
        backgroundlight: '#0a0c16'
      },
      gray: {
        base: '#616161',
        secondary: '#808080',
        background: '#fafafa',
        primary: '#dbdbdb'
      },
      red: {
        primary: '#ed4956'
      }
    }
  }
};
