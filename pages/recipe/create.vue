<template>
	<NewRecipeForm />
</template>

<script setup>
const store = inject('userStore')

const checkAuth = (user) => {
	if (!user.role) {
		navigateTo('/login')
	} else if (user.role !== 'admin'){
		navigateTo('/')
	}
}

checkAuth(store.user)

// onMounted(() => {
// 	checkAuth(store.user)
// })


	
</script>