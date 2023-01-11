<template>
  <main id="root" class="bg-base-200 min-h-screen pt-20">
    <HeaderNav />
    <NuxtPage />
  </main>
</template>

<script setup>
  import { useUserStore } from '@/stores/UserStore'

  const store = useUserStore()
  provide('userStore', useUserStore())

  const supabase = useSupabaseClient()
  provide('supabase', supabase)

  onMounted(async () => {
    if (store.user.name) {
      const { data: user, error } = await supabase.auth.getUser()
      if (error) {
        store.partialReset()
        // navigateTo('/login')
      }

      if (store.user.emailConfirmed === false) {
        store.updateStore({ emailConfirmed: true, auth_id: user.id })

        const { data: profile, error } = await supabase
        .from('profiles')
        .insert(store.user)
      }
    }
  })

</script>
