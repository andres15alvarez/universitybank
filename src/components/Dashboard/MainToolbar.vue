<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(false)

function logout() {
  localStorage.removeItem('jwt')
  router.push({ name: 'home' })
}
</script>

<template>
  <v-toolbar
    app
    color="primary"
  >
    <v-app-bar-nav-icon
      color="white"
      @click="drawer = !drawer"
    />
    <v-toolbar-title>Banco Universitario</v-toolbar-title>
    <v-spacer />
    <v-menu location="bottom">
      <template #activator="{ props }">
        <v-btn
          icon
          v-bind="props"
        >
          <v-icon color="white">
            mdi-account
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          prepend-icon="mdi-account"
          link
          title="Perfil"
          to="/profile"
        />
        <v-list-item
          prepend-icon="mdi-lock-reset"
          link
          title="Actualizar contraseña"
          to="/updatepassword"
        />
        <v-divider />
        <v-list-item
          prepend-icon="mdi-logout"
          link
          title="Cerrar sesión"
          @click="logout"
        />
      </v-list>
    </v-menu>
  </v-toolbar>
  <v-layout>
    <v-navigation-drawer
      v-model="drawer"
      location="left"
      color="primary"
      :width="210"
      :absolute="true"
      :disable-resize-watcher="true"
      temporary
      class="v-navigation-drawer__dashboard"
    >
      <v-list>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          link
          title="Dashboard"
          to="/dashboard"
        />
        <v-list-item
          prepend-icon="mdi-bank-transfer"
          link
          title="Transferencias"
          to="/transfer"
        />
        <v-list-item
          prepend-icon="mdi-contacts"
          link
          title="Contactos"
          to="/contacts"
        />
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>
