<script setup lang="ts">
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import { AuthService } from '@/api/auth'
import { isRequired, isPasswordLengthCorrect } from '@/utils/validator'
import { ref, watch } from 'vue'

const oldPasswordVisible = ref(true)
const passwordVisible = ref(true)
const passwordRepeatVisible = ref(true)
const isLoading = ref(false)
const buttonDisabled = ref(true)
const errorMessage = ref('')
const message = ref('')
const updatePasswordData = ref({
  oldPassword: '',
  newPassword: '',
  repeatedNewPassword: ''
})

watch(
  updatePasswordData,
  (oldData, newData) => {
    if (
      isRequired(newData.oldPassword) &&
      isRequired(newData.newPassword) &&
      isRequired(newData.repeatedNewPassword) &&
      isPasswordLengthCorrect(newData.oldPassword) &&
      isPasswordLengthCorrect(newData.newPassword) &&
      isPasswordLengthCorrect(newData.repeatedNewPassword) &&
      newData.newPassword == newData.repeatedNewPassword
    ) {
      buttonDisabled.value = false
    } else {
      buttonDisabled.value = true
    }
  },
  { deep: true }
)

function updatePassword() {
  message.value = ''
  errorMessage.value = ''
  const client = new AuthService()
  isLoading.value = true
  client
    .updatePassword(updatePasswordData.value.oldPassword, updatePasswordData.value.newPassword)
    .then(() => {
      updatePasswordData.value.oldPassword = ''
      updatePasswordData.value.newPassword = ''
      updatePasswordData.value.repeatedNewPassword = ''
      message.value = 'Contraseña actualizada con éxito'
    })
    .catch((error) => {
      errorMessage.value = error.message
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <MainToolbar />
  <v-container>
    <h2 style="color: #085f63">Actualización de Contraseña</h2>
    <v-row>
      <v-col>
        <v-card
          class="rounded-lg d-flex align-center flex-column mt-2 mb-5"
          variant="elevated"
          style="
            background: linear-gradient(
              180deg,
              rgb(73 190 183) 50%,
              rgb(73 190 183) 25%,
              rgb(223 255 242) 94%
            );
          "
        >
          <p class="text-subtitle-1 text-red mt-5">{{ errorMessage }}</p>
          <p class="text-subtitle-1 text-black mt-5">
            <b>{{ message }}</b>
          </p>
          <v-text-field
            v-model="updatePasswordData.oldPassword"
            class="mb-5 w-50"
            :append-inner-icon="oldPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="oldPasswordVisible ? 'password' : 'text'"
            :rules="[isRequired, isPasswordLengthCorrect]"
            bg-color="white"
            label="Contraseña"
            variant="outlined"
            @click:append-inner="oldPasswordVisible = !oldPasswordVisible"
          ></v-text-field>
          <v-text-field
            v-model="updatePasswordData.newPassword"
            class="my-3 w-50"
            :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="passwordVisible ? 'password' : 'text'"
            :rules="[isRequired, isPasswordLengthCorrect]"
            bg-color="white"
            label="Nueva contraseña"
            variant="outlined"
            @click:append-inner="passwordVisible = !passwordVisible"
          ></v-text-field>
          <v-text-field
            v-model="updatePasswordData.repeatedNewPassword"
            class="my-5 w-50"
            :append-inner-icon="passwordRepeatVisible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="passwordRepeatVisible ? 'password' : 'text'"
            :rules="[isRequired, isPasswordLengthCorrect]"
            bg-color="white"
            label="Repite tu nueva contraseña"
            variant="outlined"
            @click:append-inner="passwordRepeatVisible = !passwordRepeatVisible"
          ></v-text-field>
          <v-btn
            class="text-none mb-5"
            variant="flat"
            color="primary"
            :disabled="buttonDisabled"
            :loading="isLoading"
            @click="updatePassword"
            ><b>Actualizar</b>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
