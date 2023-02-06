<template>

	<div>
		<div tabindex="0" class="card compact dropdown-content shadow bg-base-100 rounded-box w-64 absolute">
		    <div class="card-body">
		      <h2 class="card-title">{{ title }}</h2> 
		      <p class="text-base">{{ info }}</p>
		    </div>
	    </div>
	</div>
	
	
</template>

<script setup>
	const props = defineProps({
		title: String,
		info: String
	})

	const listenForClick = (event) => {
		document.addEventListener('click', event.target.blur())
		// document.querySelector('.infoModal')
	}
</script>