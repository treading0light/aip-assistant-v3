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

	function updateStore(obj) {
		const keys = Object.keys(obj)

		for (let key of keys) {
			user.value[key] = obj[key]
		}
	}

	function isAdmin() {
		if (store.role === 'admin') return true
		else return false
	}

	function fullReset() {
		user.value = {}
	}

	function partialReset() {
		user.value = {
			email: user.email
		}
	}

	return { user, getUser, updateStore, partialReset, fullReset }
},
{
	persist: {
		key: 'user-store'
	}
})