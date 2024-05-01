<script setup lang="ts">
import { ContactService } from '@/api/contact'
import { MovementService } from '@/api/movement'
import { UserService } from '@/api/user'
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import type { Contact } from '@/interfaces/contact'
import type { CreateMovementRequest } from '@/interfaces/movement'
import type { BalanceResponse, UserResponse } from '@/interfaces/user'
import {
  isRequired,
  isNumber,
  isAccountNumberLengthCorrect,
  removeWhiteSpaces
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
const amount = ref('')
const isButtonDisabled = ref(true)
const registered = ref(true)
const isLoading = ref(false)
const balance = ref(0)
const accountNumber = ref('')
const contacts = ref(new Array<object>())
const data = ref({
  amount: 0,
  accountNumber: '',
  description: ''
} as CreateMovementRequest)

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
      })
      router.push({ name: 'transferSuccess' })
    })
    .catch((error) => {
      console.log(error)
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
    .then((response: Array<Contact>) => {
      contacts.value = response.map((contact) => {
        return {
          title: `${contact.alias} - ${contact.accountNumber}`,
          value: contact.accountNumber
        }
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

watch(amount, (newValue, _) => {
  data.value.amount = parseFloat(removeWhiteSpaces(mask.masked(newValue)))
})

watch(
  data,
  (newData, _) => {
    if (
      isRequired(newData.accountNumber) &&
      isRequired(newData.description) &&
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
        <v-card
          class="rounded-lg d-flex align-center flex-column mt-2"
          style="
            background: linear-gradient(
              180deg,
              rgb(73 190 183) 50%,
              rgb(73 190 183) 25%,
              rgb(223 255 242) 94%
            );
          "
        >
          <v-select
            persistent-hint
            class="mt-5 w-50"
            bg-color="white"
            label="Cuenta a debitar"
            variant="outlined"
            placeholder="Cuenta a debitar"
            :items="[accountNumber]"
            :hint="'Saldo disponible: ' + balance.toString()"
          >
          </v-select>

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
          >
          </v-select>

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
          >
          </v-text-field>

          <div class="w-50 d-flex justify-start">
            <v-checkbox
              class="mt-n5"
              label="Cuenta no registada"
              @click="registered = !registered"
            ></v-checkbox>
          </div>

          <v-text-field
            class="w-50"
            label="Monto"
            variant="outlined"
            placeholder="Ejemplo 140.05"
            bg-color="white"
            :rules="[isRequired]"
            :model-value="mask.masked(amount)"
            @update:model-value="(value) => (amount = mask.unmasked(value))"
          ></v-text-field>

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
          ></v-text-field>

          <div class="mb-5">
            <v-btn class="me-16 text-none" color="primary" variant="flat" @click="clear"
              >Limpiar</v-btn
            >
            <v-btn
              class="me-2 text-none"
              color="primary"
              variant="flat"
              :disabled="isButtonDisabled"
            >
              Pagar
              <v-dialog activator="parent">
                <template v-slot:default="{ isActive }">
                  <v-card class="text-start mx-auto">
                    <v-card-title>Confirma los datos para transferir</v-card-title>
                    <v-card-text
                      >Número de cuenta: <b>{{ data.accountNumber }}</b></v-card-text
                    >
                    <v-card-text
                      >Monto: <b>{{ mask.masked(amount) }}</b></v-card-text
                    >
                    <v-card-text>Descripción: {{ data.description }}</v-card-text>
                    <template v-slot:actions>
                      <v-btn
                        class="text-none"
                        color="red"
                        variant="flat"
                        @click="isActive.value = false"
                        >Cancelar</v-btn
                      >
                      <v-spacer></v-spacer>
                      <v-btn
                        class="text-none"
                        color="primary"
                        variant="flat"
                        :loading="isLoading"
                        @click="pay"
                        >Pagar</v-btn
                      >
                    </template>
                  </v-card>
                </template>
              </v-dialog>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
