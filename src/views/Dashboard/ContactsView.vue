<script setup lang="ts">
import { ContactService } from '@/api/contact'
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import type { Contact } from '@/interfaces/contact'
import { onMounted, ref } from 'vue'
import { isRequired, isNumber, isAccountNumberLengthCorrect } from '@/utils/validator'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { Paginate } from '@/interfaces/paginate'

const contact = reactive({ alias: '', accountNumber: '', description: '' })

const contacts = ref(new Array<Contact>())

const router = useRouter()

function createNewContact() {
  const client = new ContactService()
  client
    .create(contact.alias, contact.accountNumber, contact.description)
    .then((response) => {
      router.beforeResolve((to) => {
        to.meta.alias = response.alias
        to.meta.accountNumber = response.accountNumber
        to.meta.description = response.description
      })
      router.push({ name: 'contactSuccess' })
    })
    .catch((error) => {
      console.log(error)
    })
}

function deleteContact() {
  const client = new ContactService()
  client
    .deleteByID(index.toString())
    .then((response) => {
      contacts.value.splice(response.id, 1)
    })
    .catch((error) => {
      console.log(error)
    })
}

function getContacts(page: number, pageSize: number) {
  const client = new ContactService()
  client
    .list(null, page, pageSize)
    .then((response: Paginate<Contact>) => {
      contacts.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

// Para poder abrir y cerrar los v-dialog
const createContactDialog = ref(false)
const readContactDialog = ref(false)
const updateContactDialog = ref(false)
const deleteContactDialog = ref(false)

// Succesful test

let index: number

// Elimina el contacto...
// Succesful test

function getIndex(id: number) {
  index = contacts.value.findIndex((item) => compararObjetos(item, contacts.value[id]))
}
function compararObjetos(objeto1: Object, objeto2: Object): boolean {
  if (objeto1 == objeto2) {
    return true
  }
  return false
}

onMounted(() => {
  getContacts(0, 10)
})
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
          <template #text>
            <v-text-field
              label="Buscar"
              append-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            ></v-text-field>
          </template>

          <v-table class="ma-5" fixed-header height="300px">
            <thead>
              <tr>
                <th class="text-left">Número de cuenta</th>
                <th class="text-left">Alias</th>
                <th class="text-left">Descripción</th>
                <th class="text-left">Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(contact1, k) in contacts" :key="k">
                <td>{{ contact1.accountNumber }}</td>
                <td>{{ contact1.alias }}</td>
                <td>{{ contact1.description }}</td>
                <td>
                  <v-icon
                    color="primary"
                    @click="
                      getIndex(contacts.indexOf(contact1))
                      readContactDialog = !readContactDialog
                    "
                    >mdi-eye</v-icon
                  >
                  <v-icon
                    color="primary"
                    @click="
                      getIndex(contacts.indexOf(contact1))
                      updateContactDialog = !updateContactDialog
                    "
                    >mdi-pencil</v-icon
                  >
                  <v-icon
                    color="primary"
                    @click="
                      getIndex(contacts.indexOf(contact1))
                      deleteContactDialog = !deleteContactDialog
                    "
                    >mdi-delete
                  </v-icon>
                </td>
              </tr>
            </tbody>
          </v-table>

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
                    v-model="contact.alias"
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
                    v-model="contact.accountNumber"
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
                    v-model="contact.description"
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
                createNewContact()
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
                  <v-text-field
                    label="Alias"
                    variant="outlined"
                    :model-value="contacts[index].alias"
                    readonly
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Número de cuenta"
                    variant="outlined"
                    :model-value="contacts[index].accountNumber"
                    readonly
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Descripción"
                    variant="outlined"
                    :model-value="contacts[index].description"
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
                    :model-value="contacts[index].alias"
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
                    :model-value="contacts[index].accountNumber"
                    variant="outlined"
                    :rules="[isRequired, isNumber, isAccountNumberLengthCorrect]"
                    minlength="20"
                    maxlength="20"
                    counter
                    readonly
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
                    :model-value="contacts[index].description"
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
              @click="updateContactDialog = false"
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
                    variant="outlined"
                    :model-value="contacts[index].alias"
                    readonly
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Número de cuenta"
                    variant="outlined"
                    :model-value="contacts[index].accountNumber"
                    readonly
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Descripción"
                    variant="outlined"
                    :model-value="contacts[index].description"
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
              @click="deleteContact(), (deleteContactDialog = false)"
            >
            </v-btn>
            <v-for></v-for>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>
