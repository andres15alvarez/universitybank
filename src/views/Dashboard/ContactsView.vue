<script setup lang="ts">
import { ContactService } from '@/api/contact'
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import type { Contact } from '@/interfaces/contact'
import { ref } from 'vue'
import { isRequired, isNumber, isAccountNumberLengthCorrect } from '@/utils/validator'
import { reactive } from 'vue'

const search = ref('')

const NewContact = reactive({ id: NaN, alias: '', accountNumber: '', description: '' })
// let search: '';

// Para poder abrir y cerrar los v-dialog
const createContactDialog = ref(false)
const readContactDialog = ref(false)
const updateContactDialog = ref(false)
const deleteContactDialog = ref(false)

// Succesful test

let index: number
const contacts = ref(new Array<Contact>())

/*
  No sé si esta función sirva para obtener los contactos
  En teoría es ir obteniendo contactos de uno en uno por id y guardalos en el array contacts
*/
function getContacts(id: string) {
  const client = new ContactService()
  client
    .getByID(id)
    .then((response: Array<Contact>) => {
      contacts.value = response
    })
    .catch((error) => {
      console.log(error)
    })
}

// Array contacts1 para probar si funcionaba el v-for pd: sí funciona
const contacts1 = [
  {
    id: 1223,
    accountNumber: '01712123442343245313',
    alias: 'Carlos pana',
    description: 'Carlos amigo liceo'
  },
  {
    id: 321,
    accountNumber: '01715421033012456798',
    alias: 'Luis trabajo',
    description: 'Contador Luis empresa'
  },
  {
    id: 34,
    accountNumber: '01718765211353678950',
    alias: 'Chamo helados',
    description: 'El chamo que vende helados'
  },
  {
    id: 554,
    accountNumber: '01713221006513654543',
    alias: 'Chamo conservas',
    description: 'El chamo que vende conservas'
  },
  {
    id: 87,
    accountNumber: '01712190877809123456',
    alias: 'Chamo pastelitos',
    description: 'El chamo que vende pastelitos'
  },
  {
    id: 557,
    accountNumber: '01719763544536798012',
    alias: 'Chamo barquillas',
    description: 'El chamo que vende barquillas'
  },
  {
    id: 54358,
    accountNumber: '01716543211234567809',
    alias: 'Perros calientes',
    description: 'Venta de perros calientes'
  },
  {
    id: 12921,
    accountNumber: '01719876544567890123',
    alias: 'Gym',
    description: 'Gimnasio'
  },
  {
    id: 342432,
    accountNumber: '01712312343356456453',
    alias: 'Kiosko empanadas',
    description: 'Senora de las empanadas'
  },
  {
    id: 343429,
    accountNumber: '01714985423233232532',
    alias: 'Electricista Juan',
    description: 'Juan el electricista'
  },
  {
    id: 3244340,
    accountNumber: '01715435433242324334',
    alias: 'Chamo helados',
    description: 'El chamo que vende helados'
  }
]

// Crear un contacto...
// Succesful test
function createContact() {
  contacts1.push({
    id: NewContact.id,
    alias: NewContact.alias,
    accountNumber: NewContact.accountNumber,
    description: NewContact.description
  })
}

// Actualiza el contacto...
// Ni siquiera intenté
function updateContact(cont: any) {}

// Elimina el contacto...
// Succesful test

function deleteContact(id: number) {
  index = contacts1.findIndex((item) => compararObjetos(item, contacts1[id]))
}
function compararObjetos(objeto1: Object, objeto2: Object): boolean {
  if (objeto1 == objeto2) {
    return true
  }
  return false
}
function confirmDeleteContact() {
  contacts1.splice(index, 1)
}
</script>

<template>
  <MainToolbar />

  <v-app>
    <v-container>
      <div class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex">
        <h2 class="text-primary">Contactos</h2>
        <v-col>
          <v-row class="justify-end">
            <v-btn
              class="me-2"
              color="primary"
              text="Agregar"
              prepend-icon="mdi-plus"
              @click="createContactDialog = true"
            >
            </v-btn>
          </v-row>
        </v-col>

        <v-card flat>
          <template v-slot:text>
            <v-text-field
              v-model="search"
              label="Buscar"
              append-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            ></v-text-field>
          </template>

          <v-data-table class="ma-5" fixed-header height="300px" :search="search">
            <thead>
              <tr>
                <th class="text-left">Número de cuenta</th>
                <th class="text-left">Alias</th>
                <th class="text-left">Descripción</th>
                <th class="text-left">Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(contact, k) in contacts1" :key="k">
                <td>{{ contact.accountNumber }}</td>
                <td>{{ contact.alias }}</td>
                <td>{{ contact.description }}</td>
                <td>
                  <v-icon color="primary" @click="readContactDialog = !readContactDialog"
                    >mdi-eye</v-icon
                  >
                  <v-icon color="primary" @click="updateContactDialog = !updateContactDialog"
                    >mdi-pencil</v-icon
                  >
                  <v-icon
                    color="primary"
                    @click="
                      deleteContact(contacts1.indexOf(contact))
                      deleteContactDialog = !deleteContactDialog
                    "
                    >mdi-delete
                  </v-icon>
                </td>
              </tr>
            </tbody>
          </v-data-table>

          <v-data-table-server :items-length="10"></v-data-table-server>
        </v-card>
      </div>

      <!-- v-dialog para crear un contacto -->

      <v-dialog v-model="createContactDialog" max-width="500" transition="dialog-bottom-transition">
        <v-card>
          <v-card-title class="d-flex justify-center pa-3 text-primary"
            >Crear contacto</v-card-title
          >
          <v-card-text>
            <v-col>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="NewContact.id"
                    label="Id"
                    variant="outlined"
                    :rules="[isRequired, isNumber]"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="NewContact.alias"
                    label="Alias"
                    variant="outlined"
                    :rules="[isRequired]"
                    maxlength="20"
                    counter
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="NewContact.accountNumber"
                    label="Número de cuenta"
                    variant="outlined"
                    :rules="[isRequired, isNumber, isAccountNumberLengthCorrect]"
                    minlength="20"
                    maxlength="20"
                    counter
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="NewContact.description"
                    label="Descripción"
                    variant="outlined"
                    :rules="[isRequired]"
                    maxlength="100"
                    counter
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Cancelar" variant="tonal" @click="createContactDialog = false"> </v-btn>

            <v-btn
              color="primary"
              text="Guardar"
              variant="tonal"
              @click="
                createContact()
                createContactDialog = false
              "
            >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- v-dialog para ver la info del contacto seleccionado -->

      <v-dialog v-model="readContactDialog" max-width="500" transition="dialog-top-transition">
        <v-card>
          <v-card-title class="d-flex justify-center pa-3 text-primary">
            Detalles contacto</v-card-title
          >
          <v-card-text>
            <v-col>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Id" variant="outlined" readonly> </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Alias" variant="outlined" readonly> </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Número de cuenta" variant="outlined" readonly>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Descripción" variant="outlined" readonly> </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text="Cerrar" variant="tonal" @click="readContactDialog = false">
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- v-dialog para actualizar la info del contacto seleccionado -->

      <v-dialog v-model="updateContactDialog" max-width="500" transition="dialog-bottom-transition">
        <v-card>
          <v-card-title class="d-flex justify-center pa-3 text-primary"
            >Actualizar contacto</v-card-title
          >
          <v-card-text>
            <v-col>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Alias"
                    variant="outlined"
                    :rules="[isRequired]"
                    maxlength="20"
                    counter
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Número de cuenta"
                    variant="outlined"
                    :rules="[isRequired, isNumber, isAccountNumberLengthCorrect]"
                    minlength="20"
                    maxlength="20"
                    counter
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Descripción"
                    variant="outlined"
                    :rules="[isRequired]"
                    model-value="cont.description"
                    maxlength="100"
                    counter
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Cancelar" variant="tonal" @click="updateContactDialog = false"> </v-btn>

            <v-btn
              color="primary"
              text="Actualizar"
              variant="tonal"
              @click="
                updateContact
                updateContactDialog = false
              "
            >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- v-dialog para eliminar el contacto seleccionado -->

      <v-dialog v-model="deleteContactDialog" max-width="500">
        <v-card>
          <v-card-title class="d-flex justify-center pa-3 text-primary"
            >Eliminar contacto</v-card-title
          >
          <v-card-text>
            <v-col>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Alias"
                    model-value="cont.description"
                    variant="outlined"
                    readonly
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Número de cuenta" variant="outlined" readonly>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Descripción"
                    variant="outlined"
                    model-value="cont.description"
                    readonly
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Cancelar" variant="tonal" @click="deleteContactDialog = false"> </v-btn>
            <v-btn
              color="primary"
              text="Eliminar"
              variant="tonal"
              @click="
                confirmDeleteContact()
                deleteContactDialog = false
              "
            >
            </v-btn>
            <v-for></v-for>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>
