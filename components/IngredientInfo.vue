<template>
	<div>
		<p>{{ ingredient.name }}</p>

		<p v-if="ingredient.description" class="text-xs opacity-80 ml-2 w-1/2">{{ ingredient.description }}</p>

	</div>
</template>

<script setup>
	const props = defineProps({
		ingredient: Object,
	})


	
</script>