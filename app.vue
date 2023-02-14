<template>
  <main id="root" class="bg-base-200 min-h-screen pt-20">
    <HeaderNav />
    <NuxtLoadingIndicator />
    <NuxtPage />
  </main>
</template>

<script setup>
  import { useUserStore } from '@/stores/UserStore'
  import { create, all } from 'mathjs'

  const math = create(all, {number: 'Fraction'})

  const store = useUserStore()
  provide('userStore', useUserStore())

  const supabase = useSupabaseClient()
  provide('supabase', supabase)

  const loading = ref(false)
  provide('loading', loading)

  const toMixed = (fract) => {
    fract = math.format(math.fraction(fract))

    let numDen = fract.split('/')
    // console.log(numDen)

    if (numDen[0] >= numDen[1]) {
      // console.log('first is bigger', numDen)
      let whole = Math.floor(numDen[0] / numDen[1])
      let remainder = numDen[0] % numDen[1]
      console.log(whole, remainder)

      if (remainder == 0) {
        return whole
      } else {
          return `${whole} ${remainder}/${numDen[1]}`
      }

    } else {
      return fract
    }
  }
  provide('toMixed', toMixed)

  const getAuth = async () => {
    const { data, error } = await supabase.auth.getUser()
      if (error) {
        store.partialReset()
        // navigateTo('/login')
      }
      console.log('user.id ', data.user.id)
      return data.user.id
  }

  const initialProfileUpdate = async (id) => {

    console.log('is false confirmed')
    store.updateStore({ email_confirmed: true, id: id})

    const { data, error } = await supabase
    .from('profiles')
    .update(store.user)
    .eq('id', id)

    if (error) console.error(error)
  }

  onMounted(async () => {
    if (store.user.name) {
      let id = await getAuth()

      if (store.user.email_confirmed === false) {
       await initialProfileUpdate(id)
      } else {
        store.getUser(id)
      }
    }
  })

</script>
