module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    fontFamily: {
      Roboto: ['Roboto', 'Sans-serif'],
    },
    extend: {
      height: {
        '85vh': '85vh',
      },
      colors: {
        whpptLightMode: '#fff',
        whpptDarkMode: '#121212',
        whpptActive: '#3B86FF',
        whpptLightBorder: '#F0F0F7',
        whpptDarkBorder: '#292929',
        whpptStandard: '#9998BA',
      },
      minWidth: {
        400: '400px',
      },
      transitionProperty: {
        width: 'width',
      },
      gridTemplateColumns: {
        gallery: 'repeat(auto-fit, 360px)',
      },
      gridAutoRows: {
        gallery: 'fit-content(1rem)',
      },
      width: {
        settingsSidebar: '24rem',
      },
      zIndex: {
        editorPanel: '1000',
        settingsPanel: '1500',
        mainNav: '2000',
      },
    },
  },
  plugins: [],
};
