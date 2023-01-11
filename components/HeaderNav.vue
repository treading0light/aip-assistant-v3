<template>
	<div style="z-index: 10;" class="fixed top-0 navbar bg-base-200 mb-10 border-b border-b-2">

    <div class="flex-1 px-2 lg:flex-none">
      <NuxtLink to="/" class="text-2xl font-bold text-secondary">AIP <span class="text-base-content">Assistant</span></NuxtLink>
    </div> 

    <div class="flex justify-end w-full flex-1 px-2">
      
      <NuxtLink to="/" class="btn btn-ghost rounded-btn">HOME</NuxtLink>

      <DropdownNav />

      <DropdownUser v-if="user.name != '' && user.name != null" :name="user.name" />

      <NuxtLink v-else to="/login" > <button class="btn btn-ghost rounded-btn" >LOGIN</button> </NuxtLink>

      
    </div>
  </div>
	
</template>

<script setup>
  import { storeToRefs } from "pinia"

  const showLogin = ref(false)
  const store = inject('userStore')
  const { user } = storeToRefs(store)
  // console.log(user.name)

  const toggleLogin = () => {
    if (showLogin.value == false) showLogin.value = true
    else showLogin.value = false
  }

  onMounted(() => {
    // console.log(user)
  })

</script>