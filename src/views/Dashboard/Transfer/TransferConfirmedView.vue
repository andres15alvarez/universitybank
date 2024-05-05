<script setup lang="ts">
import { isRequired, isAlpha, checkAlpha } from '@/utils/validator'
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import type { Movement } from '@/interfaces/movement'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ContactService } from '@/api/contact'

const router = useRouter()
const currentRoute = router.currentRoute.value
const isUnregisteredContact = ref(currentRoute.meta.isUnregisteredContact)
const isLoading = ref(false)
const createContactdisabled = ref(false)
const showContactForm = ref(false)
const contactAlias = ref('')
const contactDescription = ref('')
const createContactMessage = ref('')
const errorMessage = ref('')
const transferData = {
  accountNumber: currentRoute.meta.accountNumber,
  amount: currentRoute.meta.amount,
  balance: currentRoute.meta.balance,
  createdAt: currentRoute.meta.createdAt,
  description: currentRoute.meta.description,
  id: currentRoute.meta.id,
  multiplier: currentRoute.meta.multiplier,
  updatedAt: currentRoute.meta.updatedAt
} as Movement

function createContact() {
  isLoading.value = true
  const client = new ContactService()
  client
    .create(contactAlias.value, transferData.accountNumber, contactDescription.value)
    .then(() => {
      createContactMessage.value = 'Contacto creado con éxito'
      errorMessage.value = ''
      createContactdisabled.value = true
    })
    .catch((error) => {
      errorMessage.value = error.message
      createContactMessage.value = ''
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <MainToolbar />
  <v-container>
    <h2 class="text-primary">Transferencias a terceros</h2>
    <v-row>
      <v-col>
        <v-card class="text-center mx-auto backgroundGradient">
          <v-card-title>Transferencia realizada con éxito</v-card-title>
          <v-card-text>
            Número de cuenta: <b>{{ transferData.accountNumber }}</b>
          </v-card-text>
          <v-card-text>
            Monto: <b>{{ transferData.amount.toFixed(2) }}</b>
          </v-card-text>
          <v-card-text>
            Referencia: <b>{{ transferData.id }}</b>
          </v-card-text>
          <v-card-text>Descripción: {{ transferData.description }}</v-card-text>

          <v-btn
            v-if="isUnregisteredContact"
            class="text-none ma-5"
            color="primary"
            variant="flat"
            @click="showContactForm = true"
          >
            Agregar Contacto
          </v-btn>

          <v-btn class="text-none ma-5" color="primary" variant="flat" to="/dashboard">
            Aceptar
          </v-btn>

          <div class="d-flex align-center flex-column">
            <div class="text-center mb-2">
              <p class="text-subtitle-1 text-black">
                <b>{{ createContactMessage }}</b>
              </p>
              <p class="text-subtitle-1 text-red">
                {{ errorMessage }}
              </p>
            </div>
            <v-text-field
              v-if="showContactForm"
              v-model="contactAlias"
              class="w-50"
              label="Alias"
              placeholder="Ingresa el alias de tu contacto"
              variant="outlined"
              bg-color="white"
              :rules="[isRequired, isAlpha]"
              @keydown="checkAlpha"
            />

            <v-text-field
              v-if="showContactForm"
              v-model="contactDescription"
              class="w-50"
              label="Descripción"
              placeholder="Ingresa una breve descripción"
              variant="outlined"
              bg-color="white"
              :rules="[isRequired, isAlpha]"
              @keydown="checkAlpha"
            />

            <v-btn
              v-if="showContactForm"
              class="text-none ma-5"
              color="primary"
              variant="flat"
              :loading="isLoading"
              :disabled="createContactdisabled"
              @click="createContact"
            >
              Guardar
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
