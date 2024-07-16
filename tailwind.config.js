/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'oslo-gray': {
					50: '#f6f6f6',
					100: '#e7e7e7',
					200: '#d1d1d1',
					300: '#b0b0b0',
					400: '#8c8c8c',
					500: '#6d6d6d',
					600: '#5d5d5d',
					700: '#4f4f4f',
					800: '#454545',
					900: '#3d3d3d',
					950: '#262626'
				}
			},
			fontSize: {
				sm: '0.8rem',
				base: '1rem',
				xl: '1.728rem',
				'2xl': '2.488rem',
				'3xl': '2.986rem'
			}
		}
	},
	plugins: []
};
