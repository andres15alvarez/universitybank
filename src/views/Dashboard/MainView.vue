<script setup lang="ts">
import { UserService } from '@/api/user'
import type { BalanceResponse } from '@/interfaces/user'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentRoute = router.currentRoute.value
const userData = ref({
  firstName: currentRoute.meta.firstName,
  lastName: currentRoute.meta.lastName,
  email: currentRoute.meta.email,
  accountNumber: currentRoute.meta.accountNumber
})
let balance = ref(0)

function getBalance() {
  const client = new UserService()
  client
    .getBalance()
    .then((response: BalanceResponse) => {
      balance.value = response.balance
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  getBalance()
})
</script>

<template>
  <v-card class="ma-5" variant="outlined">
    <v-card-title>Bienvenido(a) {{ userData.lastName }}, {{ userData.firstName }}</v-card-title>
    <v-card-text>Balance: {{ balance }}</v-card-text>
  </v-card>
</template>
