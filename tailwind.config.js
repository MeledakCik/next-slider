module.exports = {
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: "default-src 'self'; script-src 'self'; style-src 'self';",
                    },
                ],
                plugins: [
                    require('@tailwindcss/forms'),
                    require('@tailwindcss/aspect-ratio'),
                ],
            },
        ];
    },
};
