<script setup lang="ts">
import { AuthService } from '@/api/auth'
import type { CreateUser, LoginResponse, UserResponse } from '@/interfaces/user'
import { isRequired, isNumber, isDateValid } from '@/utils/validator'
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'

const now = new Date(new Date().toDateString())
const router = useRouter()
const currentRoute = router.currentRoute.value
const isLoading = ref(false)
const buttonDisabled = ref(true)
const accountData = ref({
  email: currentRoute.meta.email,
  password: currentRoute.meta.password,
  firstName: currentRoute.meta.firstName,
  lastName: currentRoute.meta.lastName,
  documentNumber: currentRoute.meta.documentNumber,
  phoneNumber:
    typeof currentRoute.meta.phoneNumber === 'string' ? currentRoute.meta.phoneNumber : '',
  birthDate: typeof currentRoute.meta.birthDate === 'object' ? currentRoute.meta.birthDate : now
} as CreateUser)

watch(
  accountData,
  (oldData, newData) => {
    if (
      isRequired(newData.phoneNumber) &&
      isNumber(newData.phoneNumber) &&
      isDateValid(newData.birthDate.toString())
    ) {
      buttonDisabled.value = false
    } else {
      buttonDisabled.value = true
    }
  },
  { deep: true }
)

async function signup() {
  const client = new AuthService()
  accountData.value.birthDate = new Date(accountData.value.birthDate)
  isLoading.value = true
  client
    .signup(accountData.value)
    .then((response: UserResponse) => {
      client
        .login(accountData.value.email, accountData.value.password)
        .then((response: LoginResponse) => {
          localStorage.setItem('jwt', response.jwt)
          router.beforeResolve((to) => {
            to.meta.firstName = response.firstName
            to.meta.lastName = response.lastName
            to.meta.email = response.email
            to.meta.accountNumber = response.accountNumber
          })
          router.push({ name: 'dashboard' })
        })
        .catch((error) => {
          throw error
        })
    })
    .catch((error) => {
      router.beforeResolve((to) => {
        to.meta.email = accountData.value.email
        to.meta.password = accountData.value.password
        to.meta.firstName = accountData.value.firstName
        to.meta.lastName = accountData.value.lastName
        to.meta.documentNumber = accountData.value.documentNumber
        to.meta.phoneNumber = accountData.value.phoneNumber
        to.meta.birthDate = accountData.value.birthDate
        to.meta.errorMessage = error.message
      })
      router.push({ name: 'signup' })
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <div class="containerSignUp">
    <div class="div__img--SignUp d-none d-sm-flex w-45">
      <img
        src="https://universitybank.sirv.com/images/laptop.png"
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

      <h1>Datos de contacto</h1>

      <v-text-field
        v-model="accountData.phoneNumber"
        label="Teléfono"
        placeholder="Ingresa tu número de teléfono"
        variant="outlined"
        maxlength="20"
        :rules="[isRequired, isNumber]"
      />

      <v-text-field
        v-model="accountData.birthDate"
        label="Fecha de nacimiento"
        placeholder=""
        variant="outlined"
        type="date"
      />

      <div class="text-end">
        <v-btn
          class="text-none"
          variant="flat"
          color="primary"
          :disabled="buttonDisabled"
          :loading="isLoading"
          @click="signup"
        >
          <b>Crear cuenta</b>
        </v-btn>
      </div>
    </div>
  </div>
</template>
