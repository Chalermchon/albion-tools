/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
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
