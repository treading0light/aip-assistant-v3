<template>
	<div id="dropdown" class="dropdown dropdown-end">
	    <label tabindex="0" class="btn btn-ghost rounded-btn"
	    >{{ name }}</label>
	    <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4 text-base">
	    	<NuxtLink to="/dashboard"><li>Dashboard</li></NuxtLink>
	        <li @click="logout" class="cursor-pointer">Logout</li>
	    </ul>
	  </div>
</template>

<script setup>
	const store = inject('userStore')
	const { partialReset } = store

	const supabase = useSupabaseClient()
	const props = defineProps({
			name: String
		})

	const logout = async () => {
		let { data, error } = await supabase.auth.signOut()
		if (error) console.log(error)

		partialReset()
	}
</script>