<template>

	<div class="flex flex-col items-center gap-10">

		<input type="text" v-model="title" placeholder="title" class="input input-bordered input-primary w-full max-w-xs text-2xl">

		<input type="text" v-model="description" placeholder="description" class="input input-bordered input-primary w-full max-w-xs text-2xl">

		<input type="text" v-model="srcURL" placeholder="Source URL" class="input input-bordered input-primary w-full max-w-xs text-2xl">

	    <input type="file" multiple ref="images" @change="onChange" class="file-input file-input-bordered w-full max-w-xs" />

		<div class="w-full flex justify-around mb-10">

			<div class="flex flex-col">
				<h2 class="underline font-bold mb-5">Ingredients:</h2>

				<ingredient-tray 
				v-for="group in chosenIngredients"
				@makeTarget="makeTarget" 
				@ingredient-to-pantry="ingredientToPantry" 
				:ingredients="group.ingredients"
				:subRecipe="group.name"
				:isActive="group.isActive"></ingredient-tray>

				<input type="text" name="subRecipe" placeholder="Add sub-recipe" class="w-fit" 
				v-if="subRecipeInput !== null" v-model="subRecipeInput" @keyup.enter="addSubRecipe">

				<button @click="subRecipeInput = ''" v-if="subRecipeInput === null" class="btn btn-primary w-fit">ADD SUB-RECIPE</button>
			</div>

			<pantry @ingredient-to-recipe="ingredientToRecipe"
			@create-ingredient-modal="createIngredientModal"
			:ingredients="pantryIngredients"
			></pantry>

		</div>

		<div class="w-1/2">
			<textarea 
			class="textarea textarea-primary w-full text-2xl" rows="10" 
			placeholder="Directions"
			v-model="directions"></textarea>
		</div>

		<button @click="handleSubmit" class="btn btn-primary">Submit Recipe</button>

		<button @click="testSubmit" class="btn btn-primary">Test</button>

		<ingredient-modal
		v-if="ingredientModal"
		@ingredient-created="ingredientCreated"
		@cancel-ingredient="cancelIngredient"
		:searchText="searchText">	
		</ingredient-modal>

		<div v-if="message" class="alert alert-success shadow-lg">
		  <div>
		    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
		    <span>{{ message }}</span>
		  </div>
		</div>
	</div>
	
</template>

<script setup>

	const supabase = inject('supabase')
	const store = inject('userStore')

	const title = ref('')
	const description = ref('')
	const images = ref([])
	const directions = ref('')
	const srcURL = ref('')

	const searchText = ref(null)
	const ingredientModal = ref(false)
	let message = null
	const target = ref('main')
	const pictureInput = ref(null)

	const subRecipeInput = ref(null)

	const pantryIngredients = ref([
		{
			'id': 1,
			'name': 'ground beef'
		},
		{
			'id': 2,
			'name': 'bread'
		},
		{
			'id': 3,
			'name': 'cheese'
		},
	])
	const chosenIngredients = ref([
		// ingredients nested inside sub-recipe objects
		{
			name: 'main',
			ingredients: [],
			isActive: true
		},
	])

	const makeTarget = (subRecipe) => {	
		for (let obj of chosenIngredients.value) obj.isActive = false
		let group = chosenIngredients.value.find(obj => obj.name === subRecipe)
		group.isActive = true
		target.value = subRecipe
	}

	const addSubRecipe = () => {
		let sr = {
			name: subRecipeInput.value,
			ingredients: [],
			isActive: false
		}

		chosenIngredients.value.push(sr)
		subRecipeInput.value = null
	}

	const ingredientToRecipe = (id) => {
		console.log('ing to pantry id ', id)

		let ingredient = pantryIngredients.value.find(obj => obj.id == id)

		removeIngredient(id, pantryIngredients.value)

		ingredient.subRecipe = target.value

		let chosenGroup = chosenIngredients.value.find(obj => obj.name == target.value)

		chosenGroup.ingredients.push(ingredient)
	}

	const ingredientToPantry = (id) => {
		// remove ingredient from the recipe and return to pantry array

		const ingredient = chosenIngredients.value.flatMap(group => group.ingredients).find(obj => obj.id == id)
		let group = chosenIngredients.value.find(obj => obj.ingredients.includes(ingredient))

		removeIngredient(ingredient, group.ingredients)
		pantryIngredients.value.push(ingredient)
	}

	const removeIngredient = (id, arr) => {

		let index = arr.indexOf(arr.find(obj => obj.id === id))

		arr.splice(index, 1)
	}

	const createIngredientModal = (search) => {
		// render modal for new ingredients

		searchText.value = search
		ingredientModal.value = true
	}

	const ingredientCreated = (ingredient) => {
		// add created ingredient to pantry and remove modal

		pantryIngredients.value.unshift(ingredient)
		ingredientModal.value = false
	}

	const cancelIngredient = () => {
		ingredientModal.value = false
	}

	const fetchIngredients = async () => {
    // populate pantry with ingredients from DB
    
	    let { data, error } = await supabase
	    .from('ingredients')
	    .select('*')

	    if (error) console.error(error)
	    else return data

    }

	const onChange = () => {
		// runs when picture-input value changes

		// console.log(pictureInput.value.files)

		// if (pictureInput.value.files) images.value = pictureInput.value.files

		console.log(images.value.files)
    }

	const handleSubmit = async () => {
		const recipeData = getRecipeData()
		const recipeId = await postRecipe(recipeData)

		const ingredientsData = getIngredientsData(recipeId)

		console.log(ingredientsData)
		await postIngredients(ingredientsData)

		if (images.value) {
			console.log('image array ', images.value.files)
			for (var i = images.value.files.length - 1; i >= 0; i--) {

				console.log('uploading image ', images.value.files[i])
				const name = await storeRecipeImage(images.value.files[i])

				const path = await getImageUrl(name)

				await postRecipeImage(path, recipeId)
			}
		}

	}

	const testSubmit = async () => {
		// const recipeData = getRecipeData()
		// console.log('recipeData ', recipeData)

		// const ingredientsData = getIngredientsData(1221)
		// console.log('ingredientsData ', ingredientsData)

		const name = await storeRecipeImage(images.value.files[0])

		const path = await getImageUrl(name)

		await postRecipeImage(path, 29)

	}

	const getSlug = (string) => {
		// a regex sequence I found online
		// that produces a decent slug from a title.

		const slug = string.toLowerCase()
		.replace(/[^a-zA-Z0-9- ]/g, "")
		.replace(/\s+/g, '-')

		return slug
	}

	const randIntString = (max) => {
		let number = Math.floor(Math.random() * max)

		return number.toString()
	}

    const getRecipeData = () => {

    	const data = {
    		title: title.value,
    		description: description.value,
    		directions: directions.value,
    		src_url: srcURL.value,
    		slug: getSlug(title.value)
    	}

    	return data
    }

    const getIngredientsData = (recipeId) => {
    	// map ingredient ids with pivot table attributes

    	return chosenIngredients.value.flatMap(obj => obj.ingredients).map(i => {

    		// set some default values
    		if (!i.qty) {
    			i.qty = 0
    		}

    		if (!i.unit) {
    			i.unit = 'N/A'
    		}

    		if (!i.subRecipe) {
    			i.subRecipe = 'main'
    		}

    		return {
    			ingredient_id: i.id,
    			recipe_id: recipeId,
    			qty: i.qty,
    			unit: i.unit,
    			sub_recipe: i.subRecipe
    		}
		})
    }

    const postRecipe = async (formData) => {

	    let { data, error } = await supabase
	    .from('recipes')
	    .insert([formData])
	    .select()
	    .single()

	    if (error) {
	      console.error(error)
	    } else {
	    	console.log('Recipe successfully posted.')
	    }

		return data.id
	  }

	const postIngredients = async (formData) => {

    	let { data, error } = await supabase
	    .from('ingredient_recipe')
	    .insert(formData)

	    if (error) {
	      console.error(error)
	    } else {
	      console.log('Ingredients successfully posted')
	    }
	}

	const getImageUrl = async (fileName) => {
		let { data, error } = await supabase.storage
	  	.from('recipe-images')
	  	.getPublicUrl(fileName)

	  	if (error) console.error(error)

	  	return data.publicUrl
	}

	const postRecipeImage = async (path, recipeId) => {

	    let { data, error } = await supabase
	    .from('recipe_images')
	    .insert([{
	      path: path,
	      recipe_id: recipeId,
	      user_id: store.user.id
	    }])

	    if (error) console.error(error)
	}

    const storeRecipeImage = async (file) => {
    // files should be an array of image files

    	const fileName = getSlug(title.value) + randIntString(10000)
	    let { data, error } = await supabase.storage
	    .from('recipe-images')
	    // .upsertFile(file.name, file)
	    .upload(fileName, file,)

	    if (error) console.error(error)

	    return fileName
	}

    onMounted(async () => {
    	pantryIngredients.value = await fetchIngredients()
    })

</script>