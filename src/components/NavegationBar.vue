<template>
  <v-toolbar height="55">
    <img src="../../public/logo-no-background.png" class="logo" />

    <div class="Montserrat-Bold div-nav">
      <p>Servicios</p>
      <p>Sobre Nosotros</p>
      <p>Contacto</p>
    </div>

    <v-btn class="Montserrat-Bold text-none" variant="flat" color="#085F63"> Acceder </v-btn>
  </v-toolbar>
</template>

<style>
.div-nav {
  margin: auto auto;
}

.v-toolbar__content {
  background-color: #fff;
}

.logo {
  width: 23%;
  margin-left: 30px;
}

.div-nav p {
  font-size: 18px;
  display: inline;
  color: #085f63;
  padding: 0 50px;
}
</style>
