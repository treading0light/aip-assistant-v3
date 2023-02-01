<template>
    <div class="flex flex-col items-center">
        <h1 class="text-3xl text-center mb-10">Recipe List</h1>
        <div class="w-10/12 flex flex-col items-center md:grid md:grid-cols-3 gap-y-5 place-items-center">
            
            <RecipeCardSmall v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />         
        </div>
    </div>
        
    
    
</template>

<script setup>

    const supabase = inject('supabase')

    const recipes = ref([])

    const fetchRecipes = async () => {
        const {data, error } = await supabase
        .from('recipes')
        .select('title, description, slug, recipe_images(path)')

        if (error) console.error(error)

        return data
    }

    onMounted(async () => {
        recipes.value = await fetchRecipes()
    })
</script>