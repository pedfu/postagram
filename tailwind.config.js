/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    maxWidth: {
      '293-px': '293px',
      'screen-lg': '1024px',
      'screen-md': '768px',
      'xs': '20rem',
    },
    minWidth: {
      '62-px': '62px',
      '230-px': '230px',
    },
    maxHeight: {
      '293-px': '293px',
      'screen-lg': '1024px',
      'screen-md': '768px',
      'xs': '20rem',
    },
    minHeight: {
      '62-px': '62px',
      '117-px': '117px',
      'full': '100%',
    },
    extend: {
      spacing: {
        '4-em': '4em',
        '3-em': '3em',
        '2-em': '2em',
        '470-px': '470px',
        '320-px': '320px',
        '32-px': '32px',
        '56-px': '56px',
        '62-px': '62px',
        '117-px': '117px',
        '880-px': '880px',
        '740-px': '740px',
        '520-px': '520px',
        '450-px': '450px',
        '560-px': '560px',
        '335-px': '335px',
        '375-px': '375px',
        '362-px': '362px',
        '700-px': '700px',
        '718-px': '718px',
        'minus-px': '-8px',
        'minus-35-px': '-23px',
        'minus-350-px' : '-325px',
        '75%' : '75%',
        '70%' : '70%',
        '60%' : '60%',
      },
      gridTemplateColumns: {
        'main': '470px 320px',
      }
    },
    colors: {
      white: '#ffffff',
      blue: {
        // medium: '#005c98',
        medium: '#0095F6',
      },
      black: {
        light: '262626',
        faded: '#00000059',
        black: '#000000',
      },
      gray: {
        base: '#616161',
        background: '#fafafa',
        primary: '#dbdbdb',
        light: '#9C9C9C',
        footer: '#CDCDCD',
        modalbg: 'rgba(100,100,100,0.2)'
      },
      red: {
        primary: '#ed4956',
      },
      yellow: {
        'logo': '#FDFFBC',
      },
      pink: {
        'logo': '#FFC1B6',
      },
    },
    fontFamily: {
      'apple': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
  future: {
    removeDeprecatedGapUtilities: true
  },
  variant: {
    display: ['group-hover']
  }
}
