<script setup lang="ts">
import { MovementService } from '@/api/movement'
import { UserService } from '@/api/user'
import type { Movement } from '@/interfaces/movement'
import type { BalanceResponse } from '@/interfaces/user'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentRoute = router.currentRoute.value
const drawer = ref(false)
const balanceShow = ref(true)
const transferenciasShow = ref(false)
const contactosShow = ref(false)
const movements = ref(new Array<Movement>())
const userData = ref({
  firstName: currentRoute.meta.firstName,
  lastName: currentRoute.meta.lastName,
  email: currentRoute.meta.email,
  accountNumber: currentRoute.meta.accountNumber
})
let balance = ref(0)

function logout() {
  localStorage.removeItem('jwt')
  router.push({ name: 'home' })
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
  <v-toolbar app color="#085F63">
    <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
    <v-toolbar-title>Banco Universitario</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu color="#085F63" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon color="white">mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item prepend-icon="mdi-account" link title="Perfil" to="/profile"></v-list-item>
        <v-list-item
          prepend-icon="mdi-lock-reset"
          link
          title="Actualizar contraseña"
          to="/changePassword"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-logout"
          link
          title="Cerrar sesión"
          @click="logout"
        ></v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>

  <v-layout>
    <v-navigation-drawer
      v-model="drawer"
      location="left"
      temporary
      color="#085F63"
      :width="210"
      class="v-navigation-drawer__dashboard"
    >
      <v-list>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          link
          title="Dashboard"
          @click="(balanceShow = true), (transferenciasShow = false), (contactosShow = false)"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-bank-transfer"
          link
          title="Transferencias"
          to="/transfers"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-contacts"
          link
          title="Contactos"
          to="/contacts"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>

  <main :class="{ 'main--dashboard': drawer == true }">
    <v-container>
      <div icon="mdi-view-dashboard">
        <h2>Dashboard</h2>
      </div>
      <v-spacer></v-spacer>

      <v-row>
        <v-col>
          <v-card class="mx-auto" hover variant="elevated" title="Bienvenido(a)">
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
          <v-card class="mx-auto" hover variant="elevated" title="Balance">
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
          <v-card hover class="ma-5 text-white" variant="elevated" color="#49beb7">
            <template v-slot:prepend>
              <v-card-title>Número de cuenta:</v-card-title>
            </template>

            <template v-slot:append>
              <v-card-text> {{ userData.accountNumber }}</v-card-text>
            </template>
          </v-card>
          <div class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex">
            <h2 class="ma-5">Movimientos</h2>

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
                  <td>{{ mov.createdAt }}</td>
                  <!-- getUTCDate es la funcion que se debe usar para que muestre la fecha -->
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
