<template>
	<NewRecipeForm />
</template>

<script setup>
const store = inject('userStore')

const checkAuth = (user) => {
	console.log('checking auth')
	if (!user.name) {
		navigateTo('/login')
	} else if (user.admin === false) {
		navigateTo('/')
	}
}

checkAuth(store.user)

</script>