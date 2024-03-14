<script setup lang="ts">
const props = defineProps({
  icon: String,
  title: String,
  subtitle: String
})
</script>

<template>
  <v-card elevation="16" class="cardDivider text-center pa-6" rounded="10" width="400" height="255">
    <v-icon class="center" :icon="icon" size="x-large" color="primary"></v-icon>
    <v-card-title class="font-weight-medium my-2">{{ title }}</v-card-title>
    <v-divider
      class="border-opacity-100 mx-auto"
      thickness="5"
      color="primary"
      length="55"
    ></v-divider>
    <v-card-text class="my-2">
      {{ subtitle }}
    </v-card-text>
  </v-card>
</template>

<style>
.cardDivider {
  border-bottom: 5px solid #085f63;
}
</style>
