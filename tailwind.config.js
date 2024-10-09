module.exports = {
    mode: 'jit', // JIT mode is enabled (optional in v3)

    content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'], // Correct key

    theme: {
        extend: {
            lineClamp: {
                3: '3', // Custom multi-line clamping
                5: '5', // Add 5-line clamping
              },
        }, // Optional, if you're extending the theme
    },

    plugins: [require('@tailwindcss/line-clamp')], // Add any plugins if needed
};
