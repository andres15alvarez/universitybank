<script setup lang="ts">
import { UserService } from '@/api/user'
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import type { UserResponse } from '@/interfaces/user'
import { onMounted, ref } from 'vue'

const userData = ref({
  firstName: '',
  lastName: '',
  email: '',
  accountNumber: '',
  birthDate: new Date()
})

function getUserData() {
  const client = new UserService()
  client
    .getProfile()
    .then((response: UserResponse) => {
      userData.value.firstName = response.firstName
      userData.value.lastName = response.lastName
      userData.value.email = response.email
      userData.value.accountNumber = response.accountNumber
      userData.value.birthDate = response.birthDate
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  getUserData()
})
</script>

<template>
  <MainToolbar />
  <v-container>
    <h2 class="text-primary">Perfil</h2>

    <v-app>
      <v-main>
        <v-card hover max-width="450px">
          <v-img
            height="200px"
            src=""
            gradient="150deg, rgb(73 190 183 / 58%) 0%, rgb(73 190 180 / 52%) 35%, rgb(223 255 242 / 74%) 74%"
          />
          <v-row>
            <v-col align-self="start" class="d-flex justify-center align-center pa-0" cols="12">
              <v-avatar
                class="profile avatar-center-heigth avatar-shadow"
                color="#49beb7"
                size="120"
              >
                <v-icon icon="mdi-account" size="80" color="#FFFFFF" />
              </v-avatar>
            </v-col>
          </v-row>
          <v-list-item color="#0000" class="profile-text-name ma-4 pt-16">
            <v-list-item-content>
              <v-list-item-title class="d-flex justify-left">
                Nombre: {{ userData.firstName }}
              </v-list-item-title>
              <v-list-item-title class="d-flex justify-left">
                Apellido: {{ userData.lastName }}
              </v-list-item-title>
              <v-list-item-title class="d-flex justify-left">
                Correo: {{ userData.email }}
              </v-list-item-title>
              <v-list-item-title class="d-flex justify-left">
                Número de cuenta: {{ userData.accountNumber }}
              </v-list-item-title>
              <v-list-item-title class="d-flex justify-left">
                Fecha de nacimiento:
                {{ new Date(userData.birthDate).toLocaleDateString('en-GB') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-main>
    </v-app>

    <!-- </v-card> -->
  </v-container>
</template>

<style>
.main--profile {
  margin-left: 210px;
}
.avatar-center-heigth {
  position: absolute;
}
</style>
