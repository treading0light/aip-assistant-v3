<template>
	<!-- <RecipeCardLarge recipeId="" /> -->
	<h1>{{ recipeSlug }}</h1>
</template>

<script setup>
	const route = useRoute()
	const supabase = inject('supabase')

	const recipeSlug = route.params.slug

	console.log(recipeSlug)

	

	const getRecipe = async (slug) => {
		const { data, error } = await supabase
		.from('recipes')
		.select(`*`)
		.eq('slug', recipeSlug)
		.single()
		

		if (error) console.error(error)
			console.log(data.id)

		return data

	}

	const getIngredients = async (id) => {
		const { data, error } = await supabase
		.from('ingredient_recipe')
		.select(`qty, unit, sub_recipe,
			ingredients(name)`)
		.eq('recipe_id', id)
		

		if (error) console.error(error)

		console.log(data)
		return data

	}

	const recipe = await getRecipe()
	console.log(recipe)
	const ingredients = await getIngredients(recipe.id)


</script>