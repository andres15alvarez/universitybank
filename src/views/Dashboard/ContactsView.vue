<script setup lang="ts">
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
</script>

<template>
  <MainToolbar />

  <v-app>
    <v-container>
      <div class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex">
        <h2 class="text-primary">
          Contactos
        </h2>
        <v-btn
          class="me-2 text-none"
          color="primary"
          variant="flat"
          to="/createContact"
        >
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

          <v-table
            class="ma-5"
            fixed-header
          >
            <thead>
              <tr>
                <th class="text-left">
                  Número de cuenta
                </th>
                <th class="text-left">
                  Alias
                </th>
                <th class="text-left">
                  Descripción
                </th>
                <th class="text-left">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>29819812892189 test</td>
                <td>Carlos pana test</td>
                <td>Pago pasaje test</td>
                <td>ver, editar, eliminar</td>
              </tr>
            </tbody>
          </v-table>

          <v-data-table-server :items-length="10" />
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>
