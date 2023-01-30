import { serverSupabaseClient } from '#supabase/server'

  const getRecipe = async (slug) => {
    const { data, error } = await supabase
    .from('recipes')
    .select(`*`)
    .eq('slug', slug)
    .single()
    

    if (error) return { error: error }

    return data

  }

    const getIngredients = async (id) => {
    const { data, error } = await supabase
    .from('ingredient_recipe')
    .select(`qty, unit, sub_recipe,
      ingredients(name)`)
    .eq('recipe_id', id)
    

    if (error) return { error: error }

    return data

  }


export default defineEventHandler((event) => {
  const supabase = serverSupabaseClient()
  
  if (event.req.method === 'GET') {

    const recipe = getRecipe(event.req.params.slug)
    if (recipe.error) return recipe.error

    const ingredients = getIngredients(recipe.id)
    if (ingredients.error) return ingredients.error

    return { recipe, ingredients }
  }
})