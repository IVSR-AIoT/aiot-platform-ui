module.exports = {
    mode: 'jit', // JIT mode is enabled (optional in v3)

    content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'], // Correct key

    theme: {
        extend: {}, // Optional, if you're extending the theme
    },

    plugins: [], // Add any plugins if needed
};
