<template>
  <v-card elevation="16" class="text-center d-inline-block" rounded="10">
    <div class="pa-10">
      <v-icon class="center" :icon="icon" size="x-large" color="#085f63"></v-icon>
      <v-card-title class="Montserrat-SemiBold my-2">{{ title }}</v-card-title>
      <v-divider
        class="border-opacity-100 mx-auto"
        thickness="5"
        color="#085f63"
        length="55"
      ></v-divider>
      <v-card-text class="Montserrat-Regular my-5">
        {{ subtitle }}
      </v-card-text>
    </div>
    <v-divider class="border-opacity-100" thickness="5" color="#085f63"></v-divider>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    subtitle: String
  }
}
</script>
