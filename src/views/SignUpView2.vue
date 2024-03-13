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

      <h1>Datos personales</h1>

      <v-text-field
        label="Nombres"
        placeholder="Ingresa tus nombres"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        label="Apellidos"
        placeholder="Ingresa tu apellidos"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        label="Cédula"
        placeholder="Ingresa tu cédula de identidad"
        variant="outlined"
      ></v-text-field>

      <div class="text-end">
        <v-btn class="text-none" variant="flat" color="#085F63" to="/signUp3">
          <b>Siguiente</b>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    visible2: true,
    visible3: true
  })
}
</script>
