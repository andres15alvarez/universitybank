<script setup lang="ts">
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
</script>

<template>
  <MainToolbar />
  <v-container>
    <h2 style="color: #085f63">Perfil</h2>

    <v-app>
      <v-main>
        <v-card hover max-width="450px">
          <v-img
            height="200px"
            src=""
            gradient="150deg, rgb(73 190 183 / 58%) 0%, rgb(73 190 180 / 52%) 35%, rgb(223 255 242 / 74%) 74%"
          >
          </v-img>
          <v-row>
            <v-col align-self="start" class="d-flex justify-center align-center pa-0" cols="12">
              <v-avatar
                class="profile avatar-center-heigth avatar-shadow"
                color="#49beb7"
                size="120"
              >
                <v-icon icon="mdi-account" size="80" color="#FFFFFF"></v-icon>
              </v-avatar>
            </v-col>
          </v-row>
          <v-list-item color="#0000" class="profile-text-name ma-4 pt-16">
            <v-list-item-content>
              <v-list-item-title class="d-flex justify-left"
                >Nombre Apellido
                <!-- {{userData.firstName}} {{userData.lastName}} -->
              </v-list-item-title>
              <v-list-item-title class="d-flex justify-left"
                >Cedula<!-- {{userData.cedula}} --></v-list-item-title
              >
              <v-list-item-title class="d-flex justify-left"
                >Correo<!-- {{userData.email}} --></v-list-item-title
              >
              <v-list-item-title class="d-flex justify-left"
                >Teléfono<!-- {{userData.phoneNumber}} --></v-list-item-title
              >
              <v-list-item-title class="d-flex justify-left"
                >Fecha de nacimiento<!-- {{userData.birthDate}} --></v-list-item-title
              >
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
