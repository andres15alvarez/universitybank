<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import ServiceCom from '@/components/ServiceCom.vue'
</script>

<template>
  <NavigationBar />
  <div class="text-center">
    <h3>Servicios</h3>
  </div>

  <div class="containerServices">
    <v-row no-gutters>
      <v-col>
        <div class="pa-2 ma-2">
          <ServiceCom
            iconService="mdi-account-convert"
            titleService="Transferencias sin comisión"
            textService="El Banco Universitario ofrece un servicio de transferencias entre estudiantes sin costo alguno."
          />
        </div>
      </v-col>
      <v-col>
        <div class="pa-2 ma-2">
          <ServiceCom
            iconService="mdi-clock-outline"
            titleService="Depósitos y retiros las 24 horas"
            textService="Permite realizar depósitos en efectivo de manera sencilla y cómoda en cualquiera de sus sucursales las 24 horas del día, los 7 días de la semana."
          />
        </div>
      </v-col>
      <v-col>
        <div class="pa-2 ma-2">
          <ServiceCom
            iconService="mdi-currency-usd"
            titleService="Pago de matrícula estudiantil"
            textService="Permite a los estudiantes universitarios pagar sus matrículas de manera rápida y sencilla."
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
          <ServiceCom
            iconService="mdi-chart-line"
            titleService="Cobro de beca estudiantil"
            textService="También permite cobrar sus becas estudiantiles de manera sencilla y eficiente. Este servicio está disponible en cualquiera de las sucursales del banco, lo que permite a los estudiantes acceder a sus fondos de manera rápida y segura."
          />
        </div>
      </v-col>
      <v-col>
        <div class="pa-2 ma-2">
          <ServiceCom
            iconService="mdi-credit-card-outline"
            titleService="Retiros en efectivo"
            textService="Permite a los estudiantes realizar retiros en efectivo de manera rápida y segura. Los estudiantes pueden realizar retiros en cualquiera de las sucursales del banco."
          />
        </div>
      </v-col>

      <v-col cols="1" class="d-none d-sm-flex w-45">
        <div class="pa-2 ma-2"></div>
      </v-col>
    </v-row>

    <img src="../../public/onda.png" class="onda d-none d-sm-flex w-45" />
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
