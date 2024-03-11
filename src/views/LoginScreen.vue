<template>
  <div class="containerLogin">
    <div class="div__img d-none d-sm-flex w-45">
      <img src="https://universitybank.sirv.com/images/laptop.png" class="imgLaptop__login" />
    </div>

    <div class="div__form">
      <img
        src="https://universitybank.sirv.com/images/logo-no-background.png"
        class="imgLogo__form"
      />

      <h1>Bienvenido</h1>

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

      <v-btn block class="text-none" variant="flat" color="#085F63">
        <b>Iniciar sesión</b>
      </v-btn>

      <p>¿Todavía no tienes una cuenta?</p>
      <b><a href="">Crear una cuenta</a></b>
    </div>
  </div>
</template>

<style>
.containerLogin {
  font-family: MontserratAlternates-Regular;
}

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
    visible: true
  })
}
</script>
