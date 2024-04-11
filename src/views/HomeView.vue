<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<template>
  <NavigationBar />
  <div class="d-md-inline-flex align-center text-center text-md-start mx-5">
    <div class="ml-md-10 blockContent">
      <p class="text-primary font-weight-bold text-h5 text-md-h4">
        Institución comprometida con los estudiantes universitarios
      </p>
      <p class="font-weight-medium text-subtitle-1 text-md-h5 mt-5">
        soluciones financieras ágiles y eficientes
      </p>
      <v-btn
        class="font-weight-bold text-subtitle-1 text-md-h6 ml-md-15 mt-5 mx-auto"
        variant="flat"
        color="primary"
        size="large"
        rounded="4"
        width="316"
        text="¡Únete ahora!"
        to="/signup"
      ></v-btn>
    </div>
    <img
      src="https://universitybank.sirv.com/images/home.png"
      class="imagenHome w-50"
      width="600"
    />
  </div>
  <FooterBar />
</template>

<style>
.blockContent {
  display: flex;
  flex-direction: column;
}

p {
  color: rgba(0, 0, 0, 0.575);
}
</style>
