<template>
	<div class="flex flex-col items-center w-10/12 m-auto">

		<div class="grid grid-cols-2 gap-2">
			<h1 class="text-6xl col-span-2">{{ recipe.title }}</h1>
			<p class="text-3xl col-span-2">{{ recipe.description }}</p>
			<p class="col-span-1">{{ recipe.srcUrl }}</p>
		</div>
		
		<div class="carousel w-1/2">
		  <div v-for="image in recipe.recipe_images" key="image.path" :id="image.eId" class="carousel-item relative w-full">
		    <img :src="image.path" class="w-fit" />
		    <div class="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2">
		      <a :href="imagePrev(image.eId)" class="btn btn-circle opacity-50 hover:opacity-100">❮</a> 
		      <a :href="imageNext(image.eId)" class="btn btn-circle opacity-50 hover:opacity-100">❯</a>
		    </div>
		  </div> 
		</div>


		<hr>

		<select>
			<option>{{ recipe.servings }}</option>
			<option>{{ recipe.servings * 2 }}</option>
			<option>{{ recipe.servings * 4 }}</option>
		</select>

		<div class="w-full flex flex-col gap-2 p-4
		border-l-2 border-secondary">
			<h2 class="font-bold text-xl">Ingredients:</h2>
			<ul v-for="(ingredients, subRec) in subRecipes" class="">
				<h3 class="font-bold">{{ subRec }}:</h3>
				<li v-for="ingredient in ingredients">{{ ingredient.name }}  {{ ingredient.qty }} {{ ingredient.unit }}</li>
			</ul>
		</div>

		<hr>

		<div>
			<p>{{ recipe.directions }}</p>
		</div>
		
		

	</div>
</template>

<script setup>
	import { useRoute } from 'vue-router'
	import { ref, onMounted, onBeforeMount } from 'vue'
	import { create, all } from 'mathjs'

	const math = create(all, {number: 'Fraction'})
	const toMixed = inject('toMixed')

	const props = defineProps({
		recipe: Object,
		ingredients: Array
	})

	const imagePrev = (eId) => {
		let num = Number(eId.split('image')[1])

		if (num <= 1) {
			return `#image${props.recipe.recipe_images.length}`
		} else {
			return `#image${num - 1}`
		}
	}

	const imageNext = (eId) => {
		let num = Number(eId.split('image')[1])

		if (num >= props.recipe.recipe_images.length) {
			return `#image1`
		} else {
			return `#image${num + 1}`
		}
	}

	const subRecipes = ref({})

	// console.log('props ', props.recipe, props.ingredients)

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

	const makeImageIds = (images) => {
		let counter = 1
		for (let image of images) {
			image.eId = 'image' + counter

			counter ++
		}

	}

	divideIngredients()
	makeImageIds(props.recipe.recipe_images)

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
</script>