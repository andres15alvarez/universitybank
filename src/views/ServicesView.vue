<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import ServiceCard from '@/components/ServiceCard.vue'
</script>

<template>
  <NavigationBar />
  <div class="text-center">
    <p class="font-weight-bold text-h4 text-md-h3 text-primary">Servicios</p>
  </div>

  <div class="mt-10 mx-5">
    <v-row>
      <v-col>
        <div class="pa-2 ma-2">
          <ServiceCard
            icon="mdi-account-convert"
            title="Transferencias sin comisión"
            text="El Banco Universitario ofrece un servicio de transferencias entre estudiantes sin costo alguno."
          />
        </div>
      </v-col>
      <v-col>
        <div class="pa-2 ma-2">
          <ServiceCard
            icon="mdi-clock-outline"
            title="Depósitos y retiros las 24 horas"
            text="Permite realizar depósitos en efectivo de manera sencilla y cómoda en cualquiera de sus sucursales las 24 horas del día, los 7 días de la semana."
          />
        </div>
      </v-col>
      <v-col>
        <div class="pa-2 ma-2">
          <ServiceCard
            icon="mdi-currency-usd"
            title="Pago de matrícula estudiantil"
            text="Permite a los estudiantes universitarios pagar sus matrículas de manera rápida y sencilla."
          />
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters pa-24>
      <v-col cols="1" class="d-none d-sm-flex w-45">
        <div class="pa-2 ma-2"></div>
      </v-col>

      <v-col>
        <div class="pa-2 ma-2">
          <ServiceCard
            icon="mdi-chart-line"
            title="Cobro de beca estudiantil"
            text="También permite cobrar sus becas estudiantiles de manera sencilla y eficiente. Este servicio está disponible en cualquiera de las sucursales del banco, lo que permite a los estudiantes acceder a sus fondos de manera rápida y segura."
          />
        </div>
      </v-col>
      <v-col>
        <div class="pa-2 ma-2">
          <ServiceCard
            icon="mdi-credit-card-outline"
            title="Retiros en efectivo"
            text="Permite a los estudiantes realizar retiros en efectivo de manera rápida y segura. Los estudiantes pueden realizar retiros en cualquiera de las sucursales del banco."
          />
        </div>
      </v-col>

      <v-col cols="1" class="d-none d-sm-flex w-45">
        <div class="pa-2 ma-2"></div>
      </v-col>
    </v-row>

    <img src="https://universitybank.sirv.com/images/wave.png" class="onda d-none d-sm-flex w-45" />
  </div>
</template>

<style>
.onda {
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: -10;
}
</style>
