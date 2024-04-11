<script setup lang="ts">
import { isRequired, isEmail, isPasswordLengthCorrect } from '@/utils/validator'
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentRoute = router.currentRoute.value
const passwordVisible = ref(true)
const passwordRepeatVisible = ref(true)
const buttonDisabled = ref(true)
const errorMessage = ref(currentRoute.meta.errorMessage)
const accountData = ref({
  email: typeof currentRoute.meta.email === 'string' ? currentRoute.meta.email : '',
  password: typeof currentRoute.meta.password === 'string' ? currentRoute.meta.password : '',
  passwordRepeated:
    typeof currentRoute.meta.password === 'string' ? currentRoute.meta.password : '',
  firstName: currentRoute.meta.firstName,
  lastName: currentRoute.meta.lastName,
  documentNumber: currentRoute.meta.documentNumber,
  phoneNumber: currentRoute.meta.phoneNumber,
  birthDate: currentRoute.meta.birthDate
})

watch(
  accountData,
  (oldData, newData) => {
    if (
      isRequired(newData.email) &&
      isRequired(newData.password) &&
      isRequired(newData.passwordRepeated) &&
      isEmail(newData.email) &&
      isPasswordLengthCorrect(newData.password) &&
      isPasswordLengthCorrect(newData.passwordRepeated) &&
      newData.password == newData.passwordRepeated
    ) {
      buttonDisabled.value = false
    } else {
      buttonDisabled.value = true
    }
  },
  { deep: true }
)

function nextStep() {
  router.beforeResolve((to) => {
    to.meta.email = accountData.value.email
    to.meta.password = accountData.value.password
    to.meta.firstName = accountData.value.firstName
    to.meta.lastName = accountData.value.lastName
    to.meta.documentNumber = accountData.value.documentNumber
    to.meta.phoneNumber = accountData.value.phoneNumber
    to.meta.birthDate = accountData.value.birthDate
  })
  router.push({ name: 'signuptwo' })
}
</script>

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

      <h1>Crear una cuenta</h1>
      <div class="text-center mb-2">
        <p class="text-subtitle-1 text-red">{{ errorMessage }}</p>
      </div>
      <v-text-field
        v-model="accountData.email"
        label="Correo electrónico"
        placeholder="Ingresa tu correo electrónico"
        variant="outlined"
        :rules="[isRequired, isEmail]"
      ></v-text-field>

      <v-text-field
        v-model="accountData.password"
        :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="passwordVisible ? 'password' : 'text'"
        :rules="[isRequired, isPasswordLengthCorrect]"
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        variant="outlined"
        @click:append-inner="passwordVisible = !passwordVisible"
      ></v-text-field>

      <v-text-field
        v-model="accountData.passwordRepeated"
        :append-inner-icon="passwordRepeatVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="passwordRepeatVisible ? 'password' : 'text'"
        :rules="[isRequired, isPasswordLengthCorrect]"
        label="Repite contraseña"
        placeholder="Repite tu contraseña"
        variant="outlined"
        @click:append-inner="passwordRepeatVisible = !passwordRepeatVisible"
      ></v-text-field>

      <div class="text-end">
        <v-btn
          class="text-none"
          variant="flat"
          color="#085F63"
          :disabled="buttonDisabled"
          @click="nextStep"
        >
          <b>Siguiente</b>
        </v-btn>
      </div>

      <div class="texto__form">
        <p class="txt">¿Ya tienes una cuenta?</p>
        <b class="txt"><RouterLink to="/login">Inicia sesión</RouterLink></b>
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
