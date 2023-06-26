module.exports = {
  content: {
    files: [
      './apps/*/src/index.html',
      './apps/*/src/**/*.{html,ts}',
      './libs/**/*.{html,ts}'
    ]
  },
  theme: {
    extend: {
      colors: {
        'blue-gray-600': '#546e7a'
      }
    },
  },
  plugins: [],
};
