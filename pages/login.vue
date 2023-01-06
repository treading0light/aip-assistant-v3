<template>
	<div>
		<LoginForm v-if="loginActive" @loginSucess="handleLogin" @registerSucess="handleRegister" />

		<div v-if="message" class="border-2 border-solid rounded-2xl p-10 text-center">

			<p>{{ message }}</p>

		</div>
	</div>
</template>

<script setup>

	const loginActive = ref(true)
	const message = ref(null)

	const store = inject('userStore')
	const { getUser } = store

	const supabase = useSupabaseClient()
	

	const handleLogin = async (id) => {
		// message.value = 'Login Successful.'
		// const { data: profile, error } = await supabase
		// .from('profiles')
		// .select('*')
		// .eq('auth_id', id)
		// .single()

		// if (error) console.log('handle login error: ', error)

		// console.log('profile: ', profile)

		getUser(id)

	}

	const handleRegister = async (id, nameInput) => {

		const { data, error } = await supabase
		.from('profiles')
		.insert([
		{ name: nameInput, auth_id: id }
		])

		error ? updateMessage(error.message) : updateStore(data.profile)


		

	}

	const updateMessage = (msg) => {
		message.value = msg
		document.addEventListener('click', () => message.value = '')

	}
</script>