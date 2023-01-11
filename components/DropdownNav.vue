<template>
	<div id="dropdown" class="dropdown dropdown-end">
	    <label tabindex="0" class="btn btn-ghost rounded-btn"
	    >Recipes</label>
	    <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4 text-base">
	    	<li v-for="link in links"><NuxtLink :to="link.path" >{{ link.text }} </NuxtLink></li>
	    </ul>
	  </div>
</template>

<script setup>
	const store = inject('userStore')
	
	const links = [
		{text: 'All Recipes', path: '/recipe/'},
		{text: 'Dead Link', path: '#'}
		]
		
	const populateLinks = () => {
		if (store.role === 'admin')
		links.push({text: 'Create New', path: '/reipe/create'})
	}

	populateLinks()

</script>

