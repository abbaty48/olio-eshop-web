import type { Config } from "tailwindcss";
import "tailwindcss-motion";

const baseFontSize = 10;
export default {
    content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
    theme: {
        container: { center: true, padding: '2rem' },
        extend: {
            colors: {
                primary: '#0023ff',
                ring: '#cfcfcf',
                icon: '#d8d8d8',
                paragraph: '#a8a8a8',
                heart: '#ff547c'
            },
            spacing: () => ({
                ...Array.from({ length: 96 }, (_, index) => index * 0.5)
                    .filter((i) => i)
                    .reduce(
                        (acc, i) => ({ ...acc, [i]: `${i / (baseFontSize / 4)}rem` }),
                        {}
                    ),
            }),
            fontSize: {
                xs: [
                    `${(16 * 0.75) / baseFontSize}rem`, /* 12px */
                    {
                        lineHeight: `${(16 * 1) / baseFontSize}rem` /* 16px */,
                    },
                ],
                sm: [
                    `${(16 * 0.875) / baseFontSize}rem`, /* 14px */
                    {
                        lineHeight: `${(16 * 1.25) / baseFontSize}rem` /* 20px */,
                    },
                ],
                base: [
                    `${(16 * 1) / baseFontSize}rem`, /* 16px */
                    {
                        lineHeight: `${(16 * 1.5) / baseFontSize}rem` /* 24px */,
                    },
                ],
                lg: [
                    `${(16 * 1.125) / baseFontSize}rem`, /* 18px */
                    {
                        lineHeight: `${(16 * 1.75) / baseFontSize}rem` /* 28px */,
                    },
                ],
                xl: [
                    `${(16 * 1.25) / baseFontSize}rem`, /* 20px */
                    {
                        lineHeight: `${(16 * 1.75) / baseFontSize}rem` /* 28px */,
                    },
                ],
                "2xl": [
                    `${(16 * 1.5) / baseFontSize}rem`, /* 24px */
                    {
                        lineHeight: `${(16 * 2) / baseFontSize}rem` /* 32px */,
                    },
                ],
                "3xl": [
                    `${(16 * 1.875) / baseFontSize}rem`, /* 30px */
                    {
                        lineHeight: `${(16 * 2.25) / baseFontSize}rem` /* 36px */,
                    },
                ],
                "4xl": [
                    `${(16 * 2.25) / baseFontSize}rem`, /* 36px */
                    {
                        lineHeight: `${(16 * 2.5) / baseFontSize}rem` /* 40px */,
                    },
                ],
                "5xl": [
                    `${(16 * 3) / baseFontSize}rem`, /* 48px */
                    {
                        lineHeight: (16 * 1) / baseFontSize + 'rem',
                    },
                ],
                "6xl": [
                    `${(16 * 3.75) / baseFontSize}rem`, /* 60px */
                    {
                        lineHeight: (16 * 1) / baseFontSize + 'rem',
                    },
                ],
                "7xl": [
                    `${(16 * 4.5) / baseFontSize}rem`, /* 72px */
                    {
                        lineHeight: (16 * 1) / baseFontSize + 'rem',
                    },
                ],
                "8xl": [
                    `${(16 * 6) / baseFontSize}rem`, /* 96px */
                    {
                        lineHeight: (16 * 1) / baseFontSize + 'rem',
                    },
                ],
                "9xl": [
                    `${(16 * 8) / baseFontSize}rem`, /* 128px */
                    {
                        lineHeight: (16 * 1) / baseFontSize + 'rem',
                    },
                ],
            },
            fontFamily: {
                sans: [
                    "Lato",
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                    "Apple Color Emoji",
                    "Segoe UI Emoji",
                    "Segoe UI Symbol",
                    "Noto Color Emoji",
                ],
            },
        },
    },
    plugins: [require('tailwindcss-motion')],
} satisfies Config;
