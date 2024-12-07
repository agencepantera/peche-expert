/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					from: '#1a365d', // gray-900
					to: '#1e3a8a', // blue-900
				},
			},
			backgroundImage: {
				'primary-gradient': 'linear-gradient(to bottom right, var(--tw-colors-primary-from), var(--tw-colors-primary-to))',
			},
		},
	},
	plugins: [],
}
