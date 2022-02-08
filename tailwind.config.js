module.exports = {
    content: ['./*.html'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
        },
    },
    daisyui: {
        themes: false,
    },
    plugins: [require('daisyui')],
};
