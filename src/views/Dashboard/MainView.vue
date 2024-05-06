<script setup lang="ts">
import { MovementService } from '@/api/movement'
import { UserService } from '@/api/user'
import MainToolbar from '@/components/Dashboard/MainToolbar.vue'
import type { Movement } from '@/interfaces/movement'
import type { Paginate } from '@/interfaces/paginate'
import type { BalanceResponse, UserResponse } from '@/interfaces/user'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentRoute = router.currentRoute.value
const drawer = ref(false)
const balance = ref(0)
const movements = ref(new Array())
const userData = ref({
  firstName: currentRoute.meta.firstName,
  lastName: currentRoute.meta.lastName,
  email: currentRoute.meta.email,
  accountNumber: currentRoute.meta.accountNumber
})
const isTableLoading = ref(false)
const tablePage = ref(1)
const tableSize = ref(10)
const totalMovements = ref(0)

function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value)
}

function amountTextColor(value: number): string {
  return value < 0 ? 'red' : 'green'
}

function getUserData() {
  const client = new UserService()
  client
    .getProfile()
    .then((response: UserResponse) => {
      userData.value.firstName = response.firstName
      userData.value.lastName = response.lastName
      userData.value.accountNumber = response.accountNumber
      userData.value.email = response.email
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

function getMovements(page: number, pageSize: number) {
  isTableLoading.value = true
  if (page > 100) {
    page = 100
  }
  if (pageSize > 100) {
    pageSize = 100
  }
  const client = new MovementService()
  client
    .getMovements(page, pageSize)
    .then((response: Paginate<Movement>) => {
      movements.value = response.data.map((mov) => {
        return {
          accountNumber: mov.accountNumber,
          amount: (mov.amount * mov.multiplier).toFixed(2),
          balance: mov.balance.toFixed(2),
          createdAt: new Date(mov.createdAt).toLocaleDateString('en-GB'),
          description: mov.description,
          id: mov.id
        }
      })
      totalMovements.value = response.total
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => (isTableLoading.value = false))
}

onMounted(() => {
  getUserData()
  getBalance()
})
</script>

<template>
  <MainToolbar />
  <main :class="{ 'main--dashboard': drawer == true }">
    <v-container>
      <h2 class="text-primary">Dashboard</h2>
      <v-row>
        <v-col cols="12" md="6">
          <v-card hover class="mx-auto rounded-lg" variant="elevated" title="Bienvenido(a)">
            <template #prepend>
              <v-avatar color="secondary">
                <v-icon color="#FFFFFF" icon="mdi-account" />
              </v-avatar>
            </template>
            <template #append>
              <v-card-text>{{ userData.lastName }}, {{ userData.firstName }}</v-card-text>
            </template>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card hover class="rounded-lg" variant="elevated" title="Balance">
            <template #prepend>
              <v-avatar color="secondary">
                <v-icon color="#FFFFFF" icon="mdi-wallet-bifold" />
              </v-avatar>
            </template>
            <template #append>
              <v-card-text>{{ balance.toFixed(2) }}</v-card-text>
            </template>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card hover class="text-white rounded-lg" variant="elevated" color="secondary">
            <template #prepend>
              <v-card-title class="text-subtitle-1 text-sm-h6"> Número de cuenta: </v-card-title>
            </template>
            <template #append>
              <v-icon
                color="black"
                size="22"
                @click="copyToClipboard(userData.accountNumber as string)"
              >
                mdi-content-copy
              </v-icon>
              <v-card-text class="text-caption text-sm-body-2 ml-n2 mr-2">
                {{ userData.accountNumber }}
              </v-card-text>
            </template>
          </v-card>

          <div class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex">
            <h2 class="mt-2 text-primary">Movimientos</h2>
            <v-data-table-server
              v-model:items-per-page="tableSize"
              v-model:page="tablePage"
              fixed-header
              height="300px"
              :headers="[
                { title: 'Referencia', key: 'id', align: 'start' },
                { title: 'Cuenta', key: 'accountNumber', align: 'start' },
                { title: 'Descripción', key: 'description', align: 'start' },
                { title: 'Monto', key: 'amount', align: 'end' },
                { title: 'Balance', key: 'balance', align: 'end' },
                { title: 'Fecha', key: 'createdAt', align: 'center' }
              ]"
              :items-length="totalMovements"
              :items="movements"
              :loading="isTableLoading"
              :items-per-page-options="[5, 10, 20, 100]"
              @update:options="getMovements(tablePage, tableSize)"
            >
              <template #[`item.amount`]="{ value }">
                <v-chip :color="amountTextColor(value)">
                  {{ value }}
                </v-chip>
              </template>
            </v-data-table-server>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<style>
.main--dashboard {
  margin-left: 210px;
}

.v-navigation-drawer__dashboard {
  margin-top: 64px;
}
</style>
