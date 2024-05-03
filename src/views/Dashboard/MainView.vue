<script setup lang="ts">
import { MovementService } from '@/api/movement'
import { UserService } from '@/api/user'
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import type { Movement } from '@/interfaces/movement'
import type { BalanceResponse, UserResponse } from '@/interfaces/user'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentRoute = router.currentRoute.value
const drawer = ref(false)
const movements = ref(new Array<Movement>())
const userData = ref({
  firstName: currentRoute.meta.firstName,
  lastName: currentRoute.meta.lastName,
  email: currentRoute.meta.email,
  accountNumber: currentRoute.meta.accountNumber
})
let balance = ref(0)

function amountTextColor(multiplier: number): string {
  return multiplier == -1 ? 'text-red' : 'text-black'
}

function getUserData() {
  const client = new UserService()
  client
    .getProfile()
    .then((response: UserResponse) => {
      userData.value.firstName = response.firstName
      userData.value.lastName = response.lastName
      userData.value.accountNumber = response.accountNumber
      userData.value.email = response.email
    })
    .catch((error) => {
      console.log(error)
    })
}

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

function getMovements(page: number, pageSize: number) {
  const client = new MovementService()
  client
    .getMovements(page, pageSize)
    .then((response: Array<Movement>) => {
      movements.value = response
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  getUserData()
  getBalance()
  getMovements(1, 10)
})
</script>

<template>
  <MainToolbar />
  <main :class="{ 'main--dashboard': drawer == true }">
    <v-container>
      <h2 class="text-primary">
        Dashboard
      </h2>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-card
            hover
            class="mx-auto rounded-lg"
            variant="elevated"
            title="Bienvenido(a)"
          >
            <template #prepend>
              <v-avatar color="secondary">
                <v-icon
                  color="#FFFFFF"
                  icon="mdi-account"
                />
              </v-avatar>
            </template>
            <template #append>
              <v-card-text>{{ userData.lastName }}, {{ userData.firstName }}</v-card-text>
            </template>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-card
            hover
            class="rounded-lg"
            variant="elevated"
            title="Balance"
          >
            <template #prepend>
              <v-avatar color="secondary">
                <v-icon
                  color="#FFFFFF"
                  icon="mdi-wallet-bifold"
                />
              </v-avatar>
            </template>
            <template #append>
              <v-card-text>{{ balance.toFixed(2) }}</v-card-text>
            </template>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card
            hover
            class="text-white rounded-lg"
            variant="elevated"
            color="secondary"
          >
            <template #prepend>
              <v-card-title>Número de cuenta:</v-card-title>
            </template>
            <template #append>
              <v-card-text class="">
                {{ userData.accountNumber }}
              </v-card-text>
            </template>
          </v-card>

          <div class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex">
            <h2 class="text-primary">
              Movimientos
            </h2>
            <v-table
              class="ma-5"
              fixed-header
              height="200px"
            >
              <thead>
                <tr>
                  <th class="text-left">
                    Referencia
                  </th>
                  <th class="text-left">
                    Cuenta
                  </th>
                  <th class="text-left">
                    Descripción
                  </th>
                  <th class="text-left">
                    Monto
                  </th>
                  <th class="text-left">
                    Balance
                  </th>
                  <th class="text-left">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="mov in movements"
                  :key="mov.id"
                >
                  <td>{{ mov.id }}</td>
                  <td>{{ mov.accountNumber }}</td>
                  <td>{{ mov.description }}</td>
                  <td :class="amountTextColor(mov.multiplier)">
                    {{ (mov.amount * mov.multiplier).toFixed(2) }}
                  </td>
                  <td>{{ mov.balance.toFixed(2) }}</td>
                  <td>{{ new Date(mov.createdAt).toLocaleDateString('en-GB') }}</td>
                </tr>
              </tbody>
            </v-table>
            <v-data-table-server :items-length="10" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<style>
.main--dashboard {
  margin-left: 210px;
}

.v-navigation-drawer__dashboard {
  margin-top: 64px;
}
</style>
