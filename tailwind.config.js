/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // NFL Team Colors
        nfl: {
          // AFC East
          'buf': { primary: '#00338D', secondary: '#C60C30' },
          'mia': { primary: '#008E97', secondary: '#FC4C02' },
          'ne': { primary: '#002244', secondary: '#C60C30' },
          'nyj': { primary: '#125740', secondary: '#FFFFFF' },
          // AFC North
          'bal': { primary: '#241773', secondary: '#000000' },
          'cin': { primary: '#FB4F14', secondary: '#000000' },
          'cle': { primary: '#311D00', secondary: '#FF3C00' },
          'pit': { primary: '#FFB612', secondary: '#101820' },
          // AFC South
          'hou': { primary: '#03202F', secondary: '#A71930' },
          'ind': { primary: '#002C5F', secondary: '#A2AAAD' },
          'jax': { primary: '#006778', secondary: '#D7A22A' },
          'ten': { primary: '#0C2340', secondary: '#4B92DB' },
          // AFC West
          'den': { primary: '#FB4F14', secondary: '#002244' },
          'kc': { primary: '#E31837', secondary: '#FFB81C' },
          'lv': { primary: '#000000', secondary: '#A5ACAF' },
          'lac': { primary: '#0080C6', secondary: '#FFC20E' },
          // NFC East
          'dal': { primary: '#003594', secondary: '#869397' },
          'nyg': { primary: '#0B2265', secondary: '#A71930' },
          'phi': { primary: '#004C54', secondary: '#A5ACAF' },
          'was': { primary: '#5A1414', secondary: '#FFB612' },
          // NFC North
          'chi': { primary: '#0B162A', secondary: '#C83803' },
          'det': { primary: '#0076B6', secondary: '#B0B7BC' },
          'gb': { primary: '#203731', secondary: '#FFB612' },
          'min': { primary: '#4F2683', secondary: '#FFC62F' },
          // NFC South
          'atl': { primary: '#A71930', secondary: '#000000' },
          'car': { primary: '#0085CA', secondary: '#101820' },
          'no': { primary: '#D3BC8D', secondary: '#101820' },
          'tb': { primary: '#D50A0A', secondary: '#34302B' },
          // NFC West
          'ari': { primary: '#97233F', secondary: '#000000' },
          'la': { primary: '#003594', secondary: '#FFA300' },
          'sf': { primary: '#AA0000', secondary: '#B3995D' },
          'sea': { primary: '#002244', secondary: '#69BE28' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
