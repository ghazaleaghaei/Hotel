/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                pulse: {
                    '0%': { opacity: '1', transform: 'scale(1)' },
                    '100%': { opacity: ' .25', transform: 'scale(.75)' },
                }
            }
        },
    },
    plugins: [],
}
