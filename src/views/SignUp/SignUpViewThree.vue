<template>
  <div class="containerSignUp">
    <div class="div__img--SignUp d-none d-sm-flex w-45">
      <img src="https://universitybank.sirv.com/images/laptop.png" class="imgLaptop__signUp" />
    </div>

    <div class="div__form--SignUp">
      <RouterLink to="/">
        <img
          src="https://universitybank.sirv.com/images/logo-no-background.png"
          class="imgLogo__form--signUp"
        />
      </RouterLink>

      <h1>Datos de contacto</h1>

      <v-text-field
        label="Teléfono"
        placeholder="Ingresa tu número de teléfono"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        label="Fecha de nacimiento"
        placeholder=""
        variant="outlined"
        type="date"
      ></v-text-field>

      <div class="text-end">
        <v-btn class="text-none" variant="flat" color="#085F63" to="/">
          <b>Crear cuenta</b>
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
