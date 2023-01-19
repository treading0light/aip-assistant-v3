// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	// css: ['~/assets/css/main.css'],
	modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt',
		'@nuxtjs/tailwindcss','@nuxtjs/supabase'],
	plugins: [],
	postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
	  pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
	},
})
