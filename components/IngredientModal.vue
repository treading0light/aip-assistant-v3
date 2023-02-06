<template>

	<div tabindex="0" class="fixed w-1/2 card compact shadow bg-base-100 rounded-box w-64" id="modal">

		<button @click="cancel" class="btn btn-circle absolute right-2 top-2">
		  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
		</button>

	    <div class="card-body relative m-auto max-w-1/4 h-1/4">

	    	

	    	<h2 class="card-title">Create New Ingredient</h2>

	    	<p>Name:</p>
	        <input type="text" v-model="ingredient.name" class="input input-bordered input-primary">
	        <p>Details:</p>
		    <textarea class="textarea textarea-bordered textarea-primary" v-model="ingredient.description" placeholder="Optional"> 
	    	</textarea>
		    <button class="btn btn-primary" @click="postIngredient">Submit</button>
	    </div>
	</div>
	
</template>

<script setup>
	const supabase = inject('supabase')
	console.log(supabase)

	const props = defineProps({
		searchText: String
	})

	const emit = defineEmits(['cancel-ingredient', 'ingredient-created'])

	let ingredient = ref({})

	const postIngredient = async () => {
		const { data, error } = await supabase
		.from('ingredients')
		.insert([ingredient.value])
		.select('*')
		.single()

		emit('ingredient-created', data)
		console.log(data)
	}

	const cancel = () => {
		ingredient.value = {}

		emit('cancel-ingredient')
	}

	onMounted(() => {
		ingredient.value.name = props.searchText
		console.log('modal created')
	})
</script>

<style scoped>
	#modal {
		z-index: 10003;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>