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
		.select(`*`)
		.eq('slug', slug)
		.single()
		

		if (error) console.error(error)
			console.log(data.id)

		return data

	}

	const getIngredients = async (id) => {
		const { data, error } = await supabase
		.from('ingredient_recipe')
		.select(`qty, unit, sub_recipe, ingredients(name).single()`)
		.eq('recipe_id', id)
		

		if (error) console.error(error)

		const ingredients = data.map(i => {
			return {
				qty: i.qty,
				unit: i.unit,
				sub_recipe: i.sub_recipe,
				name: i.ingredients[0].name,

			}
		})

		for (ingredient in data.ingredients) {
			moveName(ingredient)
		}

		console.log(data)
		return data

	}

	const moveName = (obj) => {
		obj.name = obj.ingredients[0].name
	}

	recipe.value = await getRecipe(recipeSlug)
	ingredients.value = await getIngredients(recipe.value.id)


</script>