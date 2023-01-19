<template>
	<div id="dropdown" class="dropdown dropdown-end">
	    <label tabindex="0" class="btn btn-ghost rounded-btn"
	    >Recipes</label>
	    <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4 text-base">
	    	<li><NuxtLink :to="'/recipe/'" >All Recipes </NuxtLink></li>
	    	<li v-if="admin"><NuxtLink :to="'/recipe/create/'" >Create New</NuxtLink></li>

	    </ul>
	  </div>
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	const store = inject('userStore')

	const admin = storeToRefs(store.user, 'admin')

</script>

