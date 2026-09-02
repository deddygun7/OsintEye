import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-orange': '#FF8C00',
        'dark-orange': '#CC6600',
        'whiskey': '#D2691E',
        'dark-bg': '#0a0e27',
        'card-bg': '#1a1f3a',
        'border-orange': '#FF9500',
      },
      boxShadow: {
        'neon-glow': '0 0 20px rgba(255, 140, 0, 0.5)',
        'neon-glow-strong': '0 0 40px rgba(255, 140, 0, 0.7)',
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
