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

const drawer = ref(false)
const balanceShow = ref(true)
const transferenciasShow = ref(false)
const contactosShow = ref(false)
</script>

<template>
  <v-toolbar clipped-left color="#085F63">
    <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
    <v-toolbar-title>Banco Universitario</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon color="white">mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item prepend-icon="mdi-face-man-profile" link title="Perfil"> </v-list-item>

        <v-list-item prepend-icon="mdi-lock-reset" link title="Actualizar contraseña">
        </v-list-item>

        <v-list-item prepend-icon="mdi-logout" link title="Cerrar sesión" to="/"> </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>

  <v-layout>
    <v-navigation-drawer
      v-model="drawer"
      location="left"
      permanent
      color="#085F63"
      :width="210"
      class="v-navigation-drawer__dashboard"
    >
      <v-list>
        <v-list-item
          prepend-icon="mdi-scale-balance"
          link
          title="Balance"
          @click="(balanceShow = true), (transferenciasShow = false), (contactosShow = false)"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-bank-transfer"
          link
          title="Transferencias"
          @click="(balanceShow = false), (transferenciasShow = true), (contactosShow = false)"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-contacts"
          link
          title="Contactos"
          @click="(balanceShow = false), (transferenciasShow = false), (contactosShow = true)"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>

  <main :class="{ 'main--dashboard': drawer == true }">
    <div v-show="balanceShow">
      <h2 class="ma-5">Bienvenido(a) {{ userData.lastName }}, {{ userData.firstName }}</h2>

      <v-card class="ma-5 text-white" variant="elevated" color="#49beb7">
        <v-card-title>Número de cuenta: {{ userData.accountNumber }}</v-card-title>
        <v-card-text>Balance: {{ balance }}</v-card-text>
      </v-card>

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
          <!-- <tr v-for="item in movements"> </tr> -->
          <tr>
            <td>reference</td>
            <td>accountNumber</td>
            <td>description</td>
            <td>amount</td>
            <td>balance</td>
            <td>date</td>
          </tr>
        </tbody>
      </v-table>

      <v-data-table-server :items-length="10"></v-data-table-server>
    </div>

    <div v-show="transferenciasShow">
      <h2>REALIZA TUS TRANSFERENCIAS</h2>
    </div>

    <div v-show="contactosShow">
      <h2>CONTACTOSSS</h2>
    </div>
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
