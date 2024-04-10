<script setup lang="ts">
import { isRequired, isAlpha, isNumber } from '@/utils/validator'
</script>

<template>
  <div class="containerSignUp">
    <div class="div__img--SignUp d-none d-sm-flex w-45">
      <img src="https://universitybank.sirv.com/images/hands.png" class="imgLaptop__signUp" />
    </div>

    <div class="div__form--SignUp">
      <RouterLink to="/">
        <img
          src="https://universitybank.sirv.com/images/logo-no-background.png"
          class="imgLogo__form--signUp"
        />
      </RouterLink>

      <h1>Datos personales</h1>

      <v-text-field
        label="Nombres"
        placeholder="Ingresa tus nombres"
        variant="outlined"
        :rules="[isRequired, isAlpha]"
      ></v-text-field>

      <v-text-field
        label="Apellidos"
        placeholder="Ingresa tus apellidos"
        variant="outlined"
        :rules="[isRequired, isAlpha]"
      ></v-text-field>

      <v-text-field
        label="Cédula"
        placeholder="Ingresa tu cédula de identidad"
        variant="outlined"
        :rules="[isRequired, isNumber]"
      ></v-text-field>

      <div class="text-end">
        <v-btn class="text-none" variant="flat" color="#085F63" to="/signUp3">
          <b>Siguiente</b>
        </v-btn>
      </div>
    </div>
  </div>
</template>
