<script setup lang="ts">
const icons = ['mdi-facebook', 'mdi-instagram', 'mdi-twitter']
</script>

<template>
  <v-layout>
    <v-footer class="text-center d-flex flex-column transparent">
      <div>
        <v-btn v-for="icon in icons" :key="icon" :icon="icon" class="mx-4" variant="text"></v-btn>
      </div>
      <div>Copyrigth © <strong>Banco Universitario</strong> {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-layout>
</template>

<style>
.transparent {
  background-color: transparent;
}
</style>
