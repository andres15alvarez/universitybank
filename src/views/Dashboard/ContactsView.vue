<script setup lang="ts">
import { ContactService } from '@/api/contact'
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import type { Contact } from '@/interfaces/contact'
import type { Paginate } from '@/interfaces/paginate'
import { ref } from 'vue'

const isTableLoading = ref(false)
const tablePage = ref(1)
const tableSize = ref(10)
const totalContacts = ref(0)
const contacts = ref(new Array())

function getContacts(page: number, pageSize: number, alias: string | null = null) {
  const client = new ContactService()
  client
    .list(alias, page, pageSize)
    .then((response: Paginate<Contact>) => {
      contacts.value = response.data.map((contact) => {
        return {
          accountNumber: contact.accountNumber,
          alias: contact.alias,
          description: contact.description
        }
      })
      totalContacts.value = response.total
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => (isTableLoading.value = false))
}
</script>

<template>
  <MainToolbar />

  <v-app>
    <v-container>
      <div class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex">
        <h2 class="text-primary">Contactos</h2>
        <v-btn class="me-2 text-none" color="primary" variant="flat" to="/createContact">
          Agregar
        </v-btn>

        <v-card flat>
          <template #text>
            <v-text-field
              label="Buscar"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            />
          </template>

          <v-data-table-server
            v-model:items-per-page="tableSize"
            v-model:page="tablePage"
            fixed-header
            height="300px"
            :headers="[
              { title: 'Número de cuenta', key: 'accountNumber', align: 'start' },
              { title: 'Alias', key: 'alias', align: 'center' },
              { title: 'Descripción', key: 'description', align: 'start' }
            ]"
            :items-length="totalContacts"
            :items="contacts"
            :loading="isTableLoading"
            :items-per-page-options="[5, 10, 20, 100]"
            @update:options="getContacts(tablePage, tableSize)"
          ></v-data-table-server>
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>
