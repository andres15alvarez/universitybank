<template>
  <div class="container">
    <div class="a">
      <h1 class="Montserrat-SemiBold">
        Institución comprometida con los estudiantes universitarios
      </h1>
      <p class="Montserrat-SemiBold">soluciones financieras ágiles y eficientes</p>
      <div class="boton">
        <v-btn
          block
          class="Montserrat-SemiBold text-none"
          variant="flat"
          color="#085F63"
          rounded="xs"
        >
          ¡Únete ahora!
        </v-btn>
      </div>
    </div>
    <div class="b">
      <img src="../../public/ImagenHome.png" class="imagenHome" />
    </div>
  </div>
</template>

<style>
.a {
  display: inline-block;
  width: 55%;
  margin: auto 0;
  padding-left: 10%;
}

.a p {
  color: rgba(0, 0, 0, 0.575);
  padding-left: 0%;
}

.b {
  display: inline-block;
  width: 45%;
  height: 10%;
}

.boton {
  width: 180px;
  margin-top: 5px;
}

.container {
  display: flex;
}

h1 {
  color: #085f63;
}

.imagenHome {
  float: right;
  height: 10%;
}
</style>
