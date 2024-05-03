<script setup lang="ts">
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import type { Movement } from '../../interfaces/movement'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentRoute = router.currentRoute.value
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
</script>

<template>
  <MainToolbar />
  <v-container>
    <h2 class="text-primary">
      Transferencias a terceros
    </h2>
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
            class="text-none ma-5"
            color="primary"
            variant="flat"
            to="/dashboard"
          >
            Aceptar
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
