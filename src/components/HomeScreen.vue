<template>
  <div class="container d-md-inline-flex mt-5 mx-5">
    <div class="information ml-10">
      <h3 class="Montserrat-SemiBold">
        Institución comprometida con los estudiantes universitarios
      </h3>
      <p class="Montserrat-SemiBold mt-5">soluciones financieras ágiles y eficientes</p>
      <div class="boton">
        <v-btn
          block
          class="Montserrat-SemiBold ml-15 mt-5 text-none"
          variant="flat"
          color="#085F63"
          size="default"
          rounded="4"
        >
          ¡Únete ahora!
        </v-btn>
      </div>
    </div>
    <img src="/ImagenHome.png" class="imagenHome w-50" width="600" />
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
