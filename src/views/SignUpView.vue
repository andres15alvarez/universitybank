<template>
  <div class="containerSignUp">
    <div class="div__img--SignUp d-none d-sm-flex w-45">
      <img src="https://universitybank.sirv.com/images/laptop.png" class="imgLaptop__signUp" />
    </div>

    <div class="div__form--SignUp">
      <img
        src="https://universitybank.sirv.com/images/logo-no-background.png"
        class="imgLogo__form--signUp"
      />

      <h1>Crear una cuenta</h1>

      <v-text-field
        label="Correo electrónico"
        placeholder="Ingresa tu correo electrónico"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible2 ? 'password' : 'text'"
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        variant="outlined"
        @click:append-inner="visible2 = !visible2"
      ></v-text-field>

      <v-text-field
        :append-inner-icon="visible3 ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible3 ? 'password' : 'text'"
        label="Repite contraseña"
        placeholder="Repite tu contraseña"
        variant="outlined"
        @click:append-inner="visible3 = !visible3"
      ></v-text-field>

      <div class="text-end">
        <v-btn class="text-none" variant="flat" color="#085F63" to="/signUp2">
          <b>Siguiente</b>
        </v-btn>
      </div>

      <div class="texto__form">
        <p class="txt">¿Ya tienes una cuenta?</p>
        <b class="txt"><a href="/#/login">Inicia sesión</a></b>
      </div>
    </div>
  </div>
</template>

<style>
.containerSignUp {
  display: flex;
  font-family: MontserratAlternates-Regular;
  overflow: hidden;
}

.div__img--SignUp {
  width: 55vw;
  height: 100vh;
}

.imgLaptop__signUp {
  width: 55vw;
  height: 100%;
}

.div__form--SignUp {
  padding-top: 6%;
  padding-left: 3%;
  padding-right: 3%;

  position: sticky;
}

.imgLogo__form--signUp {
  width: 70%;
  margin-left: 15%;
  margin-bottom: 35px;
}

.texto__form {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.text-end {
  float: right;
}

@media only screen and (max-width: 350px) {
  .texto__form {
    display: block;
  }
}
</style>

<script>
export default {
  data: () => ({
    visible2: true,
    visible3: true
  })
}
</script>
