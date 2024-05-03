<script setup lang="ts">
const props = defineProps({
  title: String,
  content: String
})
</script>

<template>
  <v-card class="text-center" variant="tonal" color="transparent" max-width="800">
    <div class="pa-6">
      <v-card-title class="font-weight-bold my-2 text-white text-h5 text-md-h4">
        {{ title }}
      </v-card-title>
      <v-divider class="border-opacity-100 mx-auto" thickness="2" color="primary" length="55" />
      <v-card-text class="font-weight-medium my-15 text-white text-h6 text-md-h5">
        {{ content }}
      </v-card-text>
    </div>
  </v-card>
</template>
