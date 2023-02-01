<template>	
	<router-link :to="'/recipe/' + recipe.slug">
		<div class="card w-4/5">
		  <figure class="w-fit">
		    <img :src="recipe.recipe_images[0].path" alt="" class="rounded-xl w-fit" />
		  </figure>
		  <div class="card-body items-center text-center">
		    <h2 class="card-title text-3xl">{{ recipe.title }}</h2>
		    <div class="card-actions">
		      <button class="btn btn-primary"> View </button>
		    </div>
		  </div>
		</div>
	</router-link>

</template>

<script setup>
	import { defineProps } from 'vue'
	
	const props = defineProps({
		recipe: Object
	})

	console.log(props.recipe)
	
</script>