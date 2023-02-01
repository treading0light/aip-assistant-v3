<template>
	<RecipeCardLarge :recipe="recipe" :ingredients="ingredients" />
	<h1>{{ recipeSlug }}</h1>
</template>

<script setup>
	const route = useRoute()
	const supabase = inject('supabase')

	const recipeSlug = route.params.slug
	const recipe = ref({})
	const ingredients = ref([])
	// const { recipe, ingredients } = await useFetch('/api/recipe', {
	// 	method: 'GET',

	// 	query: {
	// 		slug: recipeSlug
	// 	}
	// })	

	const getRecipe = async (slug) => {
		const { data, error } = await supabase
		.from('recipes')
		.select(`*, recipe_images(path)`)
		.eq('slug', slug)
		.single()
		

		if (error) console.error(error)

		return data

	}

	const getIngredients = async (id) => {
		const { data, error } = await supabase
		.from('ingredient_recipe')
		.select(`qty, unit, sub_recipe, ingredients(name, id)`)
		.eq('recipe_id', id)
		

		if (error) console.error(error)

		const ingredients = Object.values(data)

		for (let i of ingredients) {
			i.name = i.ingredients.name
			i.ingredient_id = i.ingredients.id

			delete i.ingredients
		}

		// ensure 'main' comes first
		// let sortedIngredients = ingredients.reduce((acc, element) => {
		// 	if (element.sub_recipe === 'main') {
		// 		return [element, ...acc]
		// 	}

		// 	return [...acc, element]
		// })

		return ingredients

	}

	recipe.value = await getRecipe(recipeSlug)
	console.log('recipe.value: ', recipe.value)
	ingredients.value = await getIngredients(recipe.value.id)
	console.log('ingredients', ingredients.value)


</script>