<template>
  <div class="container">
    <div class="a">
      <h3 class="Montserrat-SemiBold">
        Institución comprometida con los estudiantes universitarios
      </h3>
      <p class="Montserrat-SemiBold">soluciones financieras ágiles y eficientes</p>
      <div class="boton">
        <v-btn
          block
          class="Montserrat-SemiBold text-none"
          variant="flat"
          color="#085F63"
          size="default"
          rounded="4"
        >
          ¡Únete ahora!
        </v-btn>
      </div>
    </div>
    <div class="b">
      <img src="/ImagenHome.png" class="imagenHome" width="600" />
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
}
.a {
  display: inline-block;
  /* width: 55%;
  height: 365px;
  padding-left: 120px;
  padding-top: 110px; */
}
.b {
  display: inline-block;
  /* width: 45%;
  height: 365px; */
}

.boton {
  width: 316px;
  margin-top: 5px;
  margin-left: 75px;
}

h3 {
  font-size: 48px;
  color: #085f63;
}

/* .imagenHome {
  width: 400px;
  margin-left: -20px;
  margin-top: -30px;
} */

p {
  font-size: 24px;
  display: inline;
  color: #085f63;
}

.a p {
  color: rgba(0, 0, 0, 0.575);
  padding-left: 0%;
}
</style>
