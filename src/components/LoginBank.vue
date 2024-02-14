<template>
  <div class="container">
    <div class="div__img">
      <img src="../../public/imgLaptop.jpeg" class="imgLaptop__login" />
    </div>

    <div class="div__form">
      <img src="../../public/logo-no-background.png" class="imgLogo__form" />

      <h1>Bienvenido</h1>

      <v-text-field
        label="Correo electrónico"
        placeholder="Ingresa tu correo electrónico"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn block class="text-none" variant="flat" color="#085F63">
        <b>Iniciar sesión</b>
      </v-btn>

      <p>¿Todavía no tienes una cuenta?</p>
      <b><a href="">Crear una cuenta</a></b>
    </div>
  </div>
</template>

<style>
* {
  font-family: MontserratAlternates-Regular;
}

.container {
  display: flex;
}

.div__img {
  width: 55%;
  height: 100vh;
}

.div__form {
  width: 45%;
  padding: 7% 3%;
}

.imgLogo__form {
  width: 70%;
  margin-left: 15%;
  margin-bottom: 35px;
}

.imgLaptop__login {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

p {
  display: inline-block;
  position: relative;
  padding-top: 20px;
  color: rgba(0, 0, 0, 0.7);
}

h1 {
  font-family: MontserratAlternates-Bold;
  padding-bottom: 35px;
}

b {
  padding-left: 8px;
}
a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
}
</style>

<script>
export default {
  data: () => ({
    visible: false
  })
}
</script>
