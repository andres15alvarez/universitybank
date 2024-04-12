<script setup lang="ts">
import { AuthService } from '@/api/auth'
import type { LoginRequest, LoginResponse } from '@/interfaces/user'
import { isRequired, isEmail, isPasswordLengthCorrect } from '@/utils/validator'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const visible = ref(true)
const isLoading = ref(false)
const buttonDisabled = ref(true)
const loginData = ref({
  email: '',
  password: ''
} as LoginRequest)
const errorMessage = ref('')

async function login() {
  const client = new AuthService()
  isLoading.value = true
  await client
    .login(loginData.value.email, loginData.value.password)
    .then((response: LoginResponse) => {
      localStorage.setItem('jwt', response.jwt)
      router.beforeResolve((to) => {
        to.meta.firstName = response.firstName
        to.meta.lastName = response.lastName
        to.meta.email = response.email
        to.meta.accountNumber = response.accountNumber
      })
      loginData.value.email = ''
      loginData.value.password = ''
      router.push({ name: 'dashboard' })
    })
    .catch((error) => {
      errorMessage.value = error.message
    })
    .finally(() => {
      isLoading.value = false
    })
}

watch(
  loginData,
  (newLoginData, oldLoginData) => {
    if (
      isRequired(newLoginData.email) &&
      isRequired(newLoginData.password) &&
      isEmail(newLoginData.email) &&
      isPasswordLengthCorrect(newLoginData.password)
    ) {
      buttonDisabled.value = false
    } else {
      buttonDisabled.value = true
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="containerLogin">
    <div class="div__img d-none d-sm-flex w-45">
      <img src="https://universitybank.sirv.com/images/laptop.png" class="imgLaptop__login" />
    </div>

    <div class="div__form">
      <RouterLink to="/">
        <img
          src="https://universitybank.sirv.com/images/logo-no-background.png"
          class="imgLogo__form"
        />
      </RouterLink>

      <h1 class="font-weigth-bold">Bienvenido</h1>

      <v-form>
        <div class="text-center mb-2">
          <p class="text-subtitle-1 text-red">{{ errorMessage }}</p>
        </div>
        <v-text-field
          v-model="loginData.email"
          label="Correo electrónico"
          placeholder="Ingresa tu correo electrónico"
          variant="outlined"
          :rules="[isRequired, isEmail]"
        ></v-text-field>

        <v-text-field
          v-model="loginData.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'password' : 'text'"
          :rules="[isRequired, isPasswordLengthCorrect]"
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          block
          class="text-none"
          variant="flat"
          color="primary"
          :loading="isLoading"
          :disabled="buttonDisabled"
          @click="login"
        >
          <b>Iniciar sesión</b>
        </v-btn>
      </v-form>
      <div class="text-center">
        <p class="text-subtitle-1">¿Todavía no tienes una cuenta?</p>
        <b><RouterLink to="/signup">Crear una cuenta</RouterLink></b>
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
