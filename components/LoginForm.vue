<template>
	<div id="modal" class="flex justify-center items-center">

		<button @click="closeModal" class="btn btn-circle fixed top-5 right-5">
		  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
		</button>

		<div id="image" class="flex flex-col justify-center h-screen w-1/2 bg-neutral">
			<img src="/images/steak.png" class="opacity-25">
			<h1 class="fixed top-[25%] left-1/4 -translate-x-[50%] text-white text-7xl">AIP Assistant</h1>
		</div>

		<div id="form" class="flex flex-col items-center justify-center gap-2 bg-white py-5 h-full w-1/2">
			
			<div v-if="message" class="text-red-400">
				<p>{{ message }}</p>
			</div>

			<div v-if="action === 'login'" class="flex flex-col gap-2">
				<h1>Login</h1>
				<input type="text" name="email" placeholder="email" v-model="credentials.email" class="input input-bordered border-primary">
				<input type="password" name="password" placeholder="password" v-model="credentials.password" class="input input-bordered border-primary">
				<div class="flex flex-col w-full">
					<button class="btn btn-primary" @click="checkSubmit">Submit</button>
					<p @click="action = 'register'" class="link link-info self-end">New Account</p>
				</div>
			</div>

			<div v-if="action === 'register'" class="flex flex-col gap-2">
				<h1>Register</h1>
				<input type="text" name="name" placeholder="name" v-model="credentials.name" class="input input-bordered border-primary">
				<input type="text" name="email" placeholder="email" v-model="credentials.email" class="input input-bordered border-primary">
				<input type="password" name="password" placeholder="password" v-model="credentials.password" class="input input-bordered border-primary">
				<input type="password" name="passwordConfirm" placeholder="confirm password"
				v-model="passwordConfirm" class="input input-bordered border-primary">
				<div class="flex flex-col w-full justify-center gap-2">
					<button class="btn btn-primary" @click="checkSubmit">Submit</button>
					<p @click="action = 'login'" class="link link-info self-end">Existing User</p>
				</div>
				
			</div>
			
		</div>
		

	</div>
	
</template>

<script setup>
	const supabase = useSupabaseClient()

	const store = inject('userStore')

	const confirmedPassword = ref(false)
	const passwordConfirm = ref('password')
	const message = ref(null)
	const action = ref('login')

	const credentials = {
		email: '',
		password: 'password',
		name: ''
	}

	const emit = defineEmits(['loginSucess', 'registerSucess'])

	watch(passwordConfirm, (newVal, oldVal) => {
		if (newVal === credentials.password) {
			console.log('password match!')
			confirmedPassword.value = true
		} else {
			confirmedPassword.value = false
		}
	})


	const updateUser = (data) => {
		store.$reset
		console.log('updating userStore')
		store.$patch({
			name: data.name,
			userId: data.userId,
			permission: data.permission,
			loggedIn: true
		})

		console.log(store.name)
	}

	const updateMessage = (msg) => {
		message.value = msg
		document.addEventListener('click', () => message.value = '')

	}

	const checkSubmit = () => {

		if (action.value === 'login') {
			console.log('login')
			submit('login', settings)

		} else {
			console.log('register')
			console.log('password', confirmedPassword.value)
			if (confirmedPassword.value === true) {
				submit('register')
			} else {
				console.log('confirm', false)
				updateMessage('Passwords do not match')
			}
		}
	}

	const submit = async (string) => {

			if (string == 'register') {
				let { data:user, error } = await supabase.auth.signUp(credentials)
				error ? updateMessage(error) : emit('registerSucess', credentials.name, credentials.email)

				console.log('new user id ', user.id)
			} else {
				let { data: user, error } = await supabase.auth.signInWithPassword(credentials)
				error ? updateMessage(error) : emit('loginSucess', user.id)
			}
	}
</script>