<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import ContactCard from '@/components/ContactCard.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<template>
  <NavigationBar />
  <div class="text-center">
    <p class="font-weight-bold text-h4 text-md-h3 text-primary">Contáctanos</p>
  </div>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet class="d-flex justify-center">
          <ContactCard
            icon="mdi-home"
            title="Dirección"
            subtitle="Av. Universidad, Edificio Banco Universitario, piso 12, Caracas, Venezuela."
          />
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="d-flex justify-center">
          <ContactCard icon="mdi-phone" title="Teléfono" subtitle="+58 212-555-5555" />
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet class="d-flex justify-center">
          <ContactCard
            icon="mdi-message-processing-outline"
            title="Fax"
            subtitle="+58 212-555-5556"
          />
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="d-flex justify-center">
          <ContactCard
            icon="mdi-email"
            title="Correo electrónico"
            subtitle="info@bancouniversitario.com.ve"
          />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
  <FooterBar />
</template>
