<template>
  <div class="containerLogin">
    <div class="div__img d-none d-sm-flex w-45">
      <img src="https://universitybank.sirv.com/images/laptop.png" class="imgLaptop__login" />
    </div>

    <div class="div__form">
      <a href="/">
        <img
          src="https://universitybank.sirv.com/images/logo-no-background.png"
          class="imgLogo__form"
        />
      </a>

      <h1 class="font-weigth-bold">Bienvenido</h1>

      <v-text-field
        label="Correo electrónico"
        placeholder="Ingresa tu correo electrónico"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'password' : 'text'"
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn block class="text-none" variant="flat" color="primary">
        <b>Iniciar sesión</b>
      </v-btn>
      <div class="text-center">
        <p class="text-subtitle-1">¿Todavía no tienes una cuenta?</p>
        <b><a href="#/signup">Crear una cuenta</a></b>
      </div>
    </div>
  </div>
</template>

<style>
.containerLogin {
  display: flex;
}

.div__img {
  height: 100vh;
}

.div__form {
  padding: 8% 3%;
}

.imgLogo__form {
  width: 70%;
  margin-left: 15%;
  margin-bottom: 35px;
}

.imgLaptop__login {
  width: 55vw;
  height: 100%;
}

p {
  display: inline-block;
  padding-right: 8px;
  color: rgba(0, 0, 0, 0.6);
}

h1 {
  padding-bottom: 35px;
}

.txt {
  font-size: 16px;
}
a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
}

.texto__form--Login {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>

<script>
export default {
  data: () => ({
    visible: true
  })
}
</script>
