import adapter from 'svelte-adapter-bun'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({out: 'build'}),
		alias: {
			'$cms': '../cms/src/payload-types.ts'
		}
	}
}

export default config
