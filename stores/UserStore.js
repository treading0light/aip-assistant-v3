import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('UserStore', () => {
	const id = 'user-store'

	const user = ref({})

	async function getUser(authId) {
		const supabase = useSupabaseClient()

		const { data: profile, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('auth_id', authId)
		.single()

		if (error) console.log(error)

		

		user.value = profile

	console.log('from the store', user.value)
	}

	function reset() {
		user.value = {
			id: null,
			name: null,
			email: null,
			profileId: null,
			authId: null,
			permission: null,
			loggedIn: false
		}
	}

	return { user, getUser, reset }
},
{
	persist: {
		key: 'user-store'
	}
})