<script setup lang="ts">
import { ContactService } from '@/api/contact'
import { MovementService } from '@/api/movement'
import { UserService } from '@/api/user'
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import type { Contact } from '@/interfaces/contact'
import type { CreateMovementRequest } from '@/interfaces/movement'
import type { Paginate } from '@/interfaces/paginate'
import type { BalanceResponse, UserResponse } from '@/interfaces/user'
import {
  isRequired,
  isNumber,
  isAccountNumberLengthCorrect,
  removeWhiteSpaces,
  checkNumber
} from '@/utils/validator'
import { Mask } from 'maska'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mask = new Mask({
  mask: '9 99#.##',
  tokens: {
    9: { pattern: /[0-9]/, repeated: true }
  },
  reversed: true
})
const errorMessage = ref('')
const amount = ref('')
const isActive = ref(false)
const isButtonDisabled = ref(true)
const registered = ref(true)
const isLoading = ref(false)
const isCheckboxDisabled = ref(false)
const isUnregisteredContact = ref(false)
const balance = ref(0)
const accountNumber = ref('')
const contacts = ref(new Array<object>())
const data = ref({
  amount: 0,
  accountNumber: '',
  description: ''
} as CreateMovementRequest)

function getBalanceHint() {
  return 'Saldo disponible: ' + balance.value.toFixed(2).toString()
}

function getRemainingBalance() {
  return 'Saldo restante: ' + (balance.value - data.value.amount).toFixed(2).toString()
}

function enableTransferUnregisteredContact() {
  isUnregisteredContact.value = !isUnregisteredContact.value
  registered.value = !registered.value
}

function clear() {
  amount.value = ''
  data.value.accountNumber = ''
  data.value.description = ''
}

function pay() {
  isLoading.value = true
  const client = new MovementService()
  client
    .create(data.value)
    .then((response) => {
      router.beforeResolve((to) => {
        to.meta.accountNumber = response.accountNumber
        to.meta.amount = response.amount
        to.meta.balance = response.balance
        to.meta.createdAt = response.createdAt
        to.meta.description = response.description
        to.meta.id = response.id
        to.meta.multiplier = response.multiplier
        to.meta.updatedAt = response.updatedAt
        to.meta.isUnregisteredContact = isUnregisteredContact.value
      })
      router.push({ name: 'transferSuccess' })
    })
    .catch((error) => {
      errorMessage.value = error.message
    })
    .finally(() => {
      isLoading.value = false
      isActive.value = false
    })
}

function getAccountNumber() {
  const client = new UserService()
  client
    .getProfile()
    .then((response: UserResponse) => {
      accountNumber.value = response.accountNumber
    })
    .catch((error) => {
      console.log(error)
    })
}

function getBalance() {
  const client = new UserService()
  client
    .getBalance()
    .then((response: BalanceResponse) => {
      balance.value = response.balance
    })
    .catch((error) => {
      console.log(error)
    })
}

function getContacts() {
  const client = new ContactService()
  client
    .list()
    .then((response: Paginate<Contact>) => {
      if (response.data.length == 0) {
        registered.value = false
        isCheckboxDisabled.value = true
      } else {
        contacts.value = response.data.map((contact) => {
          return {
            title: `${contact.alias} - ${contact.accountNumber}`,
            value: contact.accountNumber
          }
        })
      }
    })
    .catch(() => {
      registered.value = false
      isCheckboxDisabled.value = true
    })
}

watch(amount, (newValue, _) => {
  data.value.amount = parseFloat(removeWhiteSpaces(mask.masked(newValue)))
})

watch(
  data,
  (newData, _) => {
    if (
      isNumber(newData.accountNumber) &&
      isRequired(newData.accountNumber) &&
      isRequired(newData.description) &&
      isAccountNumberLengthCorrect(newData.accountNumber) &&
      data.value.amount <= balance.value
    ) {
      isButtonDisabled.value = false
    } else {
      isButtonDisabled.value = true
    }
  },
  { deep: true }
)

onMounted(() => {
  getBalance()
  getAccountNumber()
  getContacts()
})
</script>

<template>
  <MainToolbar />
  <v-container>
    <h2 class="text-primary">Transferencias a terceros</h2>
    <v-row>
      <v-col>
        <v-card class="rounded-lg d-flex align-center flex-column mt-2 backgroundGradient">
          <v-select
            readonly
            persistent-hint
            class="mt-5 w-50"
            bg-color="white"
            label="Cuenta a debitar"
            variant="outlined"
            placeholder="Cuenta a debitar"
            :model-value="accountNumber"
            :items="[accountNumber]"
            :hint="getBalanceHint()"
          />

          <v-select
            v-if="registered"
            v-model="data.accountNumber"
            class="mt-5 w-50"
            bg-color="white"
            label="Contactos registrados"
            variant="outlined"
            placeholder="Contacto registrado"
            :items="contacts"
            :rules="[isRequired]"
          />

          <v-text-field
            v-if="!registered"
            v-model="data.accountNumber"
            class="mt-5 w-50"
            bg-color="white"
            label="Número de cuenta"
            variant="outlined"
            minlength="20"
            maxlength="20"
            :rules="[isRequired, isNumber, isAccountNumberLengthCorrect]"
            @keydown="checkNumber"
          />

          <div class="w-50 d-flex justify-start">
            <v-checkbox
              class="mt-n5"
              label="Cuenta no registada"
              :model-value="!registered"
              :disabled="isCheckboxDisabled"
              @click="enableTransferUnregisteredContact"
            />
          </div>

          <v-text-field
            persistent-hint
            class="w-50"
            label="Monto"
            variant="outlined"
            placeholder="Ejemplo 140.05"
            bg-color="white"
            :hint="getRemainingBalance()"
            :rules="[isRequired]"
            :model-value="mask.masked(amount)"
            @update:model-value="(value) => (amount = mask.unmasked(value))"
            @keydown="checkNumber"
          />

          <v-text-field
            v-model="data.description"
            class="mt-5 w-50"
            label="Descripción"
            variant="outlined"
            placeholder="Ejemplo: Pago trabajo"
            bg-color="white"
            maxlength="100"
            counter
            :rules="[isRequired]"
          />

          <div class="mb-5">
            <div class="text-center mb-2">
              <p class="text-subtitle-1 text-red">
                {{ errorMessage }}
              </p>
            </div>
            <v-btn class="me-16 text-none" color="primary" variant="flat" @click="clear">
              Limpiar
            </v-btn>
            <v-btn
              class="me-2 text-none"
              color="primary"
              variant="flat"
              :disabled="isButtonDisabled"
            >
              Pagar
              <v-dialog v-model="isActive" activator="parent">
                <v-card class="text-start mx-auto">
                  <v-card-title>Confirma los datos para transferir</v-card-title>
                  <v-card-text>
                    Número de cuenta: <b>{{ data.accountNumber }}</b>
                  </v-card-text>
                  <v-card-text>
                    Monto: <b>{{ mask.masked(amount) }}</b>
                  </v-card-text>
                  <v-card-text>Descripción: {{ data.description }}</v-card-text>
                  <template #actions>
                    <v-btn class="text-none" color="red" variant="flat" @click="isActive = false">
                      Cancelar
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      class="text-none"
                      color="primary"
                      variant="flat"
                      :loading="isLoading"
                      @click="pay"
                    >
                      Pagar
                    </v-btn>
                  </template>
                </v-card>
              </v-dialog>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
