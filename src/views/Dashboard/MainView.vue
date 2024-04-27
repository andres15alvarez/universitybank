<script setup lang="ts">
import { MovementService } from '@/api/movement'
import { UserService } from '@/api/user'
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import type { Movement } from '@/interfaces/movement'
import type { BalanceResponse } from '@/interfaces/user'
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

function getMovements(page: number) {
  const client = new MovementService()
  client
    .getMovements(page, 20)
    .then((response: Array<Movement>) => {
      movements.value = response
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  getBalance()
  getMovements(1)
})
</script>

<template>
  <MainToolbar />
  <main :class="{ 'main--dashboard': drawer == true }">
    <v-container>
      <h2>Dashboard</h2>
      <v-row>
        <v-col>
          <v-card class="mx-auto rounded-lg" hover variant="elevated" title="Bienvenido(a)">
            <template v-slot:prepend>
              <v-avatar color="#49beb7">
                <v-icon color="#FFFFFF" icon="mdi-account"></v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-card-text>{{ userData.lastName }}, {{ userData.firstName }}</v-card-text>
            </template>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="mx-auto rounded-lg" hover variant="elevated" title="Balance">
            <template v-slot:prepend>
              <v-avatar color="#49beb7">
                <v-icon color="#FFFFFF" icon="mdi-wallet-bifold"></v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-card-text>{{ balance.toFixed(2) }}</v-card-text>
            </template>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card hover class="text-white rounded-lg" variant="elevated" color="#49beb7">
            <template v-slot:prepend>
              <v-card-title>Número de cuenta:</v-card-title>
            </template>
            <template v-slot:append>
              <v-card-text> {{ userData.accountNumber }}</v-card-text>
            </template>
          </v-card>
          <div class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex">
            <h2>Movimientos</h2>
            <v-table class="ma-5" fixed-header>
              <thead>
                <tr>
                  <th class="text-left">Referencia</th>
                  <th class="text-left">Cuenta</th>
                  <th class="text-left">Descripción</th>
                  <th class="text-left">Monto</th>
                  <th class="text-left">Balance</th>
                  <th class="text-left">Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="mov in movements" :key="mov.id">
                  <td>{{ mov.id }}</td>
                  <td>{{ mov.accountNumber }}</td>
                  <td>{{ mov.description }}</td>
                  <td>{{ mov.amount * mov.multiplier }}</td>
                  <!-- Aqui pense en un v-if (para cambiar el color a rojo si era un egreso) pero dice que no se recomienda usar junto con un v-for -->
                  <td>{{ mov.balance.toFixed(2) }}</td>
                  <!-- .toFixed(2) fixea la cantidad con dos decimales -->
                  <td>{{ new Date(mov.createdAt).toLocaleDateString('en-GB') }}</td>
                </tr>
              </tbody>
            </v-table>
            <v-data-table-server :items-length="10"></v-data-table-server>
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
