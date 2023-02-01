<template>
	<div class="flex flex-col items-center">
		<h1 class="text-6xl">{{ recipe.title }}</h1>
		<p class="text-3xl">{{ recipe.description }}</p>
		<img class="w-1/4" :src="recipe.recipe_images[0].path">
		<hr>

		<div class="w-full flex flex-col gap-2">
			<ul v-for="(ingredients, subRec) in subRecipes" class="">
				<h3 class="font-bold">{{ subRec }}:</h3>
				<li v-for="ingredient in ingredients">{{ ingredient.name }}  {{ ingredient.qty }} {{ ingredient.unit }}</li>
			</ul>
		</div>

		<div>
			<p>{{ recipe.directions }}</p>
		</div>
		
		

	</div>
</template>

<script setup>
	import { useRoute } from 'vue-router'
	import { ref, onMounted, onBeforeMount } from 'vue'

	const props = defineProps({
		recipe: Object,
		ingredients: Array
	})

	const subRecipes = ref({})

	console.log('props ', props.recipe, props.ingredients)

	const divideIngredients = () => {

		initialSubRecipe()

		for (let i of props.ingredients) {
			subRecipes.value[i.sub_recipe].push(i)
		}

		console.log(subRecipes.value)
	}

	const initialSubRecipe = () => {
		let subs = new Set(props.ingredients.flatMap(i => i.sub_recipe))

		for (let sub of subs) {
			subRecipes.value[sub] = []
		}

		console.log(subRecipes.value)
	}

	divideIngredients()

	// const getRecipe = async (id) => {
	// 	const res = await fetch('/api/recipe/' + id)
	// 	.catch(err => console.error(err))

	// 	const data = await res.json()
	// 	return data
	// }

	// const splitDirections = () => {
	// 	const string = recipe.value.directions

	// 	const splitDir = string.split(/\r?\n/).filter(el => el)
	// 	recipe.value.directions = splitDir
	// 	console.log(recipe.value.directions)
	// }

	

	// onBeforeMount(async () => {
	// 	const route = useRoute()
	// 	const id = route.params.id

	// 	recipe.value = await getRecipe(id)
	// 	// console.log(recipe.value.directions)
	// 	splitDirections()
	// })

	// onMounted(() => {
	// 	// console.log(recipe.value)
		
	// })
</script>