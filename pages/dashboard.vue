<template>
	<div class="w-full flex items-start justify-center h-screen gap-10">
		<ul class="menu menu-compact lg:menu-normal bg-base-100 w-32 p-2 rounded-box">
		  <li @click="active = 'profile'"><a>Profile</a></li>
		  <li><a>Item 2</a></li>
		  <li><a>Item 3</a></li>
		</ul>

		<div v-if="active == 'profile'" class="flex flex-col pt-10 gap-5">

			<div>
				<label for="name" class="mr-2">Name</label>

				<input type="text" name="name" v-model="credentials.name" 
				class="input input-bordered border-primary disabled">
			</div>

			<div>
				<label for="email" class="mr-2">Email</label>

				<input type="text" name="email" v-model="credentials.email" 
				class="input input-bordered border-primary disabled">
			</div>

			<button @click="updateProfile" class="btn btn-primary">Save</button>
			

			
		</div>
		
	</div>
</template>

<script setup>
	const store = inject('userStore')
	const supabase = useSupabaseClient()

	const active = ref('profile')

	const credentials = ref({
		name: '',
		email: '',
	})

	const checkAuth = (user) => {
		if (!user.name) {
			navigateTo('/login')
		}
	}

	const updateProfile = async () => {
		let { data, error } = await supabase
		.from('profiles')
		.update(credentials.value)
		.eq('id', store.user.id)

		error ? console.error(error) : console.log('success')
	}

	checkAuth(store.user)

	onMounted(() => {
		credentials.value.name = store.user.name
		credentials.value.email = store.user.email
	})
</script>