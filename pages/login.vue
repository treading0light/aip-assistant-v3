<template>
	<div>
		<LoginForm v-if="loginActive" @loginSucess="handleLogin" @registerSucess="handleRegister" />

		<div v-if="message" class="border-2 border-solid rounded-2xl p-10 text-center">

			<p>{{ message }}</p>

		</div>
	</div>
</template>

<script setup>
	const store = inject('userStore')
	// const { getUser, updateStore } = store
	const supabase = useSupabaseClient()
	const router = useRouter()

	const loginActive = ref(true)
	const message = ref(null)

	const handleLogin = async (id) => {
		console.log('loginsuce')
		message.value = 'Login Successful.'
		store.getUser(id)
		router.back()
	}

	const handleRegister = async (name, email) => {
		store.updateStore({name: name, email: email, email_confirmed: false})

		loginActive.value = false

		updateMessage('Please check your email and click the confirmation link to continue.')
	}

	const updateMessage = (msg) => {
		message.value = msg
		document.addEventListener('click', () => message.value = '')

	}
</script>