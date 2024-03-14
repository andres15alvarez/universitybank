<script setup lang="ts">
import { RouterLink } from 'vue-router'

const sections = [
  {
    name: 'Servicios',
    to: '/services'
  },
  {
    name: 'Sobre Nosotros',
    to: '/about'
  },
  {
    name: 'Contacto',
    to: '/contact'
  }
]
</script>

<template>
  <v-toolbar class="d-none d-sm-flex" color="#fff">
    <RouterLink to="/">
      <img
        class="ml-10 ml-md-3 d-none d-md-flex w-75"
        src="https://universitybank.sirv.com/images/logo-no-background.png"
        width="300"
      />
    </RouterLink>

    <v-container>
      <v-btn-group class="mx-10 mx-md-2 mx-sm-1">
        <v-btn
          v-for="section in sections"
          :key="section.name"
          class="font-weight-bold text-h6 mx-8 mx-md-2 mx-sm-auto"
          variant="text"
          color="primary"
          :text="section.name"
          :to="section.to"
        >
        </v-btn>
      </v-btn-group>
    </v-container>

    <v-btn
      class="font-weight-bold text-h6 mr-10 mr-md-3 text-none"
      variant="flat"
      color="primary"
      size="default"
      rounded="4"
      text="Acceder"
      to="/login"
    ></v-btn>
  </v-toolbar>

  <v-toolbar class="d-xs-flex d-sm-none" color="#fff">
    <v-btn>
      <v-icon color="primary" size="x-large" icon="mdi-menu"></v-icon>
      <v-menu activator="parent">
        <v-list>
          <v-list-item v-for="section in sections" :key="section.name">
            <v-btn
              class="font-weight-bold text-subtitle-1 mx-8 mx-md-2 mx-sm-auto"
              variant="text"
              color="primary"
              :text="section.name"
              :to="section.to"
            ></v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              variant="flat"
              class="font-weight-bold text-h6 mx-8 mx-md-2 mx-sm-auto"
              text="Acceder"
              color="primary"
              to="/login"
            ></v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>

    <div class="text-center mr-16">
      <RouterLink to="/">
        <img
          class="w-50"
          src="https://universitybank.sirv.com/images/logo-no-background.png"
          width="75"
        />
      </RouterLink>
    </div>
  </v-toolbar>
</template>
