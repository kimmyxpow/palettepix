import type { Config } from "tailwindcss";

export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            container: {
                padding: "2rem",
                center: true,
            },
        },
    },
    plugins: [],
} satisfies Config;
