<script setup lang="ts">
import { ContactService } from '@/api/contact'
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import type { Contact } from '@/interfaces/contact'
import { ref } from 'vue'
import { isRequired, isNumber, isAccountNumberLengthCorrect } from '@/utils/validator'
import { reactive } from 'vue'
import type { Paginate } from '@/interfaces/paginate'

let index: number
const contact = reactive({
  alias: '',
  accountNumber: '',
  description: ''
})
const contactToUpdate = ref({
  id: 0,
  alias: '',
  accountNumber: '',
  description: ''
})
const contacts = ref(new Array<Contact>())
const errorMessage = ref('')
const createContactDialog = ref(false)
const updateContactDialog = ref(false)
const isTableLoading = ref(false)
const tablePage = ref(1)
const tableSize = ref(5)
const totalContacts = ref(0)
const search = ref('')

function createNewContact() {
  const client = new ContactService()
  client
    .create(contact.alias, contact.accountNumber, contact.description)
    .then((response: Contact) => {
      createContactDialog.value = false
      contacts.value.push(response)
    })
    .catch((error) => {
      errorMessage.value = error.message
    })
}

function getContacts(page: number, pageSize: number) {
  isTableLoading.value = true
  const client = new ContactService()
  client
    .list(search.value, page, pageSize)
    .then((response: Paginate<Contact>) => {
      contacts.value = response.data
      totalContacts.value = response.total
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      isTableLoading.value = false
    })
}

function updateContact() {
  const client = new ContactService()
  client
    .update(
      contactToUpdate.value.id,
      contactToUpdate.value.alias,
      contactToUpdate.value.description
    )
    .then((response: Contact) => {
      contacts.value[index].alias = response.alias
      contacts.value[index].description = response.description
      updateContactDialog.value = false
    })
    .catch((error) => {
      errorMessage.value = error.message
    })
}

function deleteContact() {
  const client = new ContactService()
  client
    .deleteByID(contactToUpdate.value.id)
    .then(() => {
      contacts.value.splice(index, 1)
      updateContactDialog.value = false
    })
    .catch((error) => {
      errorMessage.value = error.message
    })
}

function clean() {
  errorMessage.value = ''
  contact.alias = ''
  contact.accountNumber = ''
  contact.description = ''
}

function displayCreateDialog() {
  clean()
  createContactDialog.value = true
}

function displayUpdateDialog(id: number) {
  clean()
  index = id
  updateContactDialog.value = true
  contactToUpdate.value.id = contacts.value[id].id
  contactToUpdate.value.alias = contacts.value[id].alias
  contactToUpdate.value.accountNumber = contacts.value[id].accountNumber
  contactToUpdate.value.description = contacts.value[id].description
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
              @click="displayCreateDialog"
            >
            </v-btn>
          </v-row>
        </v-col>

        <v-card flat>
          <template #text>
            <v-text-field
              v-model="search"
              hide-details
              single-line
              label="Buscar"
              append-inner-icon="mdi-magnify"
              variant="outlined"
            ></v-text-field>
          </template>

          <v-data-table-server
            v-model:items-per-page="tableSize"
            v-model:page="tablePage"
            :items-length="totalContacts"
            :items-per-page-options="[5, 10, 20, 100]"
            :loading="isTableLoading"
            :search="search"
            class="ma-5"
            @update:options="getContacts(tablePage, tableSize)"
          >
            <thead>
              <tr>
                <th class="text-left">Número de cuenta</th>
                <th class="text-left">Alias</th>
                <th class="text-left">Descripción</th>
                <th class="text-left">Editar</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(contact1, k) in contacts" :key="k">
                <td>{{ contact1.accountNumber }}</td>
                <td>{{ contact1.alias }}</td>
                <td>{{ contact1.description }}</td>
                <td>
                  <v-icon color="primary" @click="displayUpdateDialog(contacts.indexOf(contact1))">
                    mdi-pencil
                  </v-icon>
                </td>
              </tr>
            </tbody>
          </v-data-table-server>
        </v-card>
      </div>

      <v-dialog v-model="createContactDialog" max-width="500" transition="dialog-bottom-transition">
        <v-card>
          <v-card-title class="d-flex justify-center pa-3 text-primary">
            Crear contacto
          </v-card-title>
          <div class="text-center mb-2">
            <p class="text-subtitle-1 text-red">
              {{ errorMessage }}
            </p>
          </div>
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
            <v-btn text="Cancelar" variant="flat" @click="createContactDialog = false"></v-btn>

            <v-btn color="primary" text="Guardar" variant="flat" @click="createNewContact"> </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="updateContactDialog" max-width="500" transition="dialog-bottom-transition">
        <v-card>
          <div class="text-center mb-2">
            <p class="text-subtitle-1 text-red">
              {{ errorMessage }}
            </p>
          </div>
          <v-card-title class="d-flex justify-center pa-3 text-primary">
            Actualizar contacto
          </v-card-title>
          <v-card-text>
            <v-col>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="contactToUpdate.alias"
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
                    v-model="contactToUpdate.accountNumber"
                    label="Número de cuenta"
                    variant="outlined"
                    readonly
                    disabled
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="contactToUpdate.description"
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
            <v-btn text="Cancelar" variant="flat" @click="updateContactDialog = false"> </v-btn>
            <v-btn color="red" text="Eliminar" variant="flat" @click="deleteContact"> </v-btn>
            <v-btn color="primary" text="Actualizar" variant="flat" @click="updateContact"> </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>
