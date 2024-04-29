<script setup lang="ts">
import { ContactService } from '@/api/contact'
import { UserService } from '@/api/user'
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import type { Contact } from '@/interfaces/contact'
import type { BalanceResponse, UserResponse } from '@/interfaces/user'
import {
  isRequired,
  isPositiveFloat,
  isNumber,
  isAccountNumberLengthCorrect
} from '@/utils/validator'
import { ref, onMounted } from 'vue'

// Successful test
const registrado = ref(true)

const contacts = ref(new Array<Contact>()) // no se si esté funcionando pq hasta donde sé el usuario no debería tener contactos agregados por default xd

let balance = ref(0)

function pay() {}

function clear() {}

onMounted(() => {
  getBalance()
})

/*
  Test

  const contactsTest = ref([
  'Jose trabajo',
  'Pedro casa',
  'Pana uni'])
*/

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
</script>

<template>
  <MainToolbar />
  <v-form>
    <v-app>
      <v-container>
        <v-row justify="center">
          <v-col
            cols="5"
            style="background: linear-gradient(rgb(73 190 183 / 58%) 10%, rgb(73 190 180 / 52%) 15%, rgb(223 255 242 / 14%)"
          >
            <h2 style="color: #085f63">Transferencias a terceros</h2>
            <v-select
              :items="['12345678901234567890', 'no deberia ser asi :(']"
              label="Cuenta a debitar"
              variant="outlined"
              :hint="'Saldo disponible: ' + balance.toString()"
              persistent-hint
              required
              placeholder="Cuenta a debitar"
            >
            </v-select>

            <v-select
              v-if="registrado"
              :items="contacts"
              label="Contactos registrados"
              variant="outlined"
              placeholder="Contacto registrado"
              :rules="[isRequired]"
            >
            </v-select>

            <v-text-field
              v-if="!registrado"
              label="Número de cuenta"
              variant="outlined"
              placeholder="Ejemplo: 23894732746287342343"
              :rules="[isRequired, isNumber, isAccountNumberLengthCorrect]"
              minlength="20"
              maxlength="20"
              counter
            >
            </v-text-field>

            <v-checkbox
              @click="registrado = !registrado"
              label="Cuenta no registada"
              color="#085f63"
            ></v-checkbox>

            <v-text-field
              label="Monto"
              variant="outlined"
              placeholder="Ejemplo 140.05"
              model-value="00.01"
              min=".01"
              max="{{ balance }}"
              :rules="[isPositiveFloat, isRequired]"
            ></v-text-field>

            <v-text-field
              label="Descripción"
              variant="outlined"
              required
              placeholder="Ejemplo: Pago trabajo"
              :rules="[isRequired]"
              model-value="Pago"
              maxlength="100"
              counter
            ></v-text-field>

            <v-row justify="center">
              <v-btn class="me-16 text-none" color="grey" variant="flat" @click="clear"
                >Limpiar</v-btn
              >

              <v-btn class="me-2 text-none" color="#085f63" variant="flat" @click="pay">
                Pagar
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </v-form>
</template>
