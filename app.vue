<template>
  <main id="root" class="bg-base-200 min-h-screen pt-20">
    <HeaderNav />
    <NuxtPage />
  </main>
</template>

<script setup>
  import { useUserStore } from '@/stores/UserStore'

  const userStore = useUserStore()
  provide('userStore', useUserStore())

  const supabase = useSupabaseClient()
  provide('supabase', supabase)

  const updateUser = (data) => {
    userStore.$reset()
    console.log('updating userStore', data)
    userStore.$patch((state) => {
      state.name = data.name
      state.userId = data.id
      state.loggedIn = true
    })

    console.log(userStore.userId)
  }

  // const fetchUser = async () => {
  //   // const { data: { user }, error } = await supabase.auth.getUser()
  //   if (error) console.error(error)
  //   console.log(user)
  //   updateUser(user)
  // }

  onMounted(() => {
  })
</script>
