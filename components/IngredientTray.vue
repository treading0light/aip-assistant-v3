<template>

	<div class="relative flex flex-col items-start mb-5">

		<h2 ref="nameEl" @click="makeTarget" class="font-bold mb-3 px-3 cursor-pointer border-l-secondary rounded-lg">{{ subRecipe }}:</h2>

		<ul class="self-end">

			<li v-for="ingredient in ingredients" :key="ingredient.id" class="flex gap-5 items-center">

				<IngredientInfo class="hover:cursor-pointer" @click="remove(ingredient.id)"
				 :ingredient="ingredient" />

				<input type="text" placeholder="Qty" v-model="ingredient.qty" class="input input-bordered w-1/6 text-2xl">

				<input type="text" placeholder="Unit" v-model="ingredient.unit" class="input input-bordered w-1/6 text-2xl">
			</li>
		</ul>
	</div>

</template>


<script setup>
	import InfoModal from './InfoModal.vue'
	import { ref, watch, onMounted } from 'vue'
	import { create, all } from 'mathjs'

	const math = create(all, {number: 'Fraction'})

	const props = defineProps({
		ingredients: Array,
		subRecipe: String,
		isActive: Boolean
	})

	const nameEl = ref(null)

	const emit = defineEmits(['ingredient-to-pantry', 'makeTarget'])

	watch(() => props.isActive, (newVal, oldVal) => {
		markActive(newVal)
	})

	const markActive = (bool) => {
		bool === true ? nameEl.value.classList.add('border-l-4') : nameEl.value.classList.remove('border-l-4')

	}

	const makeTarget = () => {
		emit('makeTarget', props.subRecipe)
	}

	const remove = (id) => emit('ingredient-to-pantry', id)

	const toMixed = inject('toMixed')

	onMounted(() => {
		markActive(props.isActive)
		const fract = math.fraction('2')
		console.log('formated fract ', math.format(fract))

		console.log('to mixed ', toMixed(math.format(fract)))
	})
	
</script>