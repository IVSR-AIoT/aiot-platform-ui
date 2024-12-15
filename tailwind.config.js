module.exports = {
  mode: 'jit',

  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],

  theme: {
    extend: {
      lineClamp: {
        3: '3',
        5: '5'
      }
    }
  },

  plugins: [require('@tailwindcss/line-clamp')]
}
