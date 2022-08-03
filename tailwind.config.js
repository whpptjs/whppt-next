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
      width: {
        'sidebar-collapsed': 'var(--whppt-sidebar-collapsed)',
        'sidebar-extended': 'var(--whppt-sidebar-extended)',
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
    },
  },
  plugins: [],
};
