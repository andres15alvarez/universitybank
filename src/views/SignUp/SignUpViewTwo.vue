<script setup lang="ts">
import { isRequired, isAlpha, isNumber, checkNumber, checkAlpha } from '@/utils/validator'
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentRoute = router.currentRoute.value
const buttonDisabled = ref(true)
const accountData = ref({
  email: currentRoute.meta.email,
  password: currentRoute.meta.password,
  firstName: typeof currentRoute.meta.firstName === 'string' ? currentRoute.meta.firstName : '',
  lastName: typeof currentRoute.meta.lastName === 'string' ? currentRoute.meta.lastName : '',
  documentNumber:
    typeof currentRoute.meta.documentNumber === 'string' ? currentRoute.meta.documentNumber : '',
  phoneNumber: currentRoute.meta.phoneNumber,
  birthDate: currentRoute.meta.birthDate
})

watch(
  accountData,
  (oldData, newData) => {
    if (
      isRequired(newData.firstName) &&
      isRequired(newData.lastName) &&
      isRequired(newData.documentNumber) &&
      isAlpha(newData.firstName) &&
      isAlpha(newData.lastName) &&
      isNumber(newData.documentNumber)
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
  router.push({ name: 'signupthree' })
}
</script>

<template>
  <div class="containerSignUp">
    <div class="div__img--SignUp d-none d-sm-flex w-45">
      <img
        src="https://universitybank.sirv.com/images/hands.png"
        class="imgLaptop__signUp"
      >
    </div>

    <div class="div__form--SignUp">
      <RouterLink to="/">
        <img
          src="https://universitybank.sirv.com/images/logo-no-background.png"
          class="imgLogo__form--signUp"
        >
      </RouterLink>

      <h1>Datos personales</h1>

      <v-text-field
        v-model="accountData.firstName"
        label="Nombres"
        placeholder="Ingresa tus nombres"
        variant="outlined"
        maxlength="40"
        :rules="[isRequired, isAlpha]"
        @keydown="checkAlpha"
      />

      <v-text-field
        v-model="accountData.lastName"
        label="Apellidos"
        placeholder="Ingresa tus apellidos"
        variant="outlined"
        maxlength="40"
        :rules="[isRequired, isAlpha]"
        @keydown="checkAlpha"
      />

      <v-text-field
        v-model="accountData.documentNumber"
        label="Cédula"
        placeholder="Ingresa tu cédula de identidad"
        variant="outlined"
        maxlength="20"
        :rules="[isRequired, isNumber]"
        @keydown="checkNumber"
      />

      <div class="text-end">
        <v-btn
          class="text-none"
          variant="flat"
          color="primary"
          :disabled="buttonDisabled"
          @click="nextStep"
        >
          <b>Siguiente</b>
        </v-btn>
      </div>
    </div>
  </div>
</template>
