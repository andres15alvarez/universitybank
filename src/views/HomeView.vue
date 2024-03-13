<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
</script>

<template>
  <NavigationBar />
  <div class="container d-md-inline-flex mt-5 mx-5">
    <div class="information ml-10">
      <h3 class="font-weight-bold">Institución comprometida con los estudiantes universitarios</h3>
      <p class="font-weight-medium mt-5">soluciones financieras ágiles y eficientes</p>
      <div class="boton">
        <v-btn
          block
          class="font-weight-bold ml-15 mt-5 text-none"
          variant="flat"
          color="primary"
          size="default"
          rounded="4"
        >
          ¡Únete ahora!
        </v-btn>
      </div>
    </div>
    <img
      src="https://universitybank.sirv.com/images/home.png"
      class="imagenHome w-50"
      width="600"
    />
  </div>
</template>

<style>
.container {
  justify-content: space-between;
  align-items: center;
}

.information {
  display: inline-block;
  justify-content: center;
}

.boton {
  width: 316px;
}

h3 {
  font-size: 44px;
  color: #085f63;
}

p {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.575);
}
</style>
