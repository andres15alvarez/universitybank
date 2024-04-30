<script setup lang="ts">
import { ContactService } from '@/api/contact'
import { UserService } from '@/api/user'
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import type { Contact } from '@/interfaces/contact'
import type { BalanceResponse, UserResponse } from '@/interfaces/user'
import { isRequired, isNumber, isAccountNumberLengthCorrect } from '@/utils/validator'
import { Mask } from 'maska'
import { ref, onMounted } from 'vue'

const mask = new Mask({
  mask: '9 99#.##',
  tokens: {
    9: { pattern: /[0-9]/, repeated: true }
  },
  reversed: true
})
const amount = ref('')
const registrado = ref(true)
const balance = ref(0)
const accountNumber = ref('')
const contacts = ref(new Array<object>())

function pay() {}

function clear() {}

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
            v-if="registrado"
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
            v-if="!registrado"
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
              @click="registrado = !registrado"
              label="Cuenta no registada"
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
            <v-btn class="me-16 text-none" color="grey" variant="flat" @click="clear"
              >Limpiar</v-btn
            >
            <v-btn class="me-2 text-none" color="#085f63" variant="flat" @click="pay">
              Pagar
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
