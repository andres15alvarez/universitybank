<script setup lang="ts">
const icons = [
  { name: 'mdi-facebook', url: 'https://www.facebook.com/bancouniversitariove' },
  { name: 'mdi-instagram', url: 'https://www.instagram.com/bancouniversitariove' },
  { name: 'mdi-twitter', url: 'https://twitter.com/bancouniversitariove' }
]
</script>

<template>
  <v-layout>
    <v-footer class="text-center d-flex flex-column transparent">
      <div>
        <v-btn
          v-for="(icon, index) in icons"
          :key="index"
          :icon="icon.name"
          :href="icon.url"
          class="mx-4"
          variant="text"
          target="_blank"
        />
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
