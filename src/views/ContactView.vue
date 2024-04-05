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
            url="https://maps.app.goo.gl/wzSe9V52PX2QWeuQ6"
            subtitle="Av. Universidad, Edificio Banco Universitario, piso 12, Caracas, Venezuela."
          />
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="d-flex justify-center">
          <ContactCard
            icon="mdi-phone"
            title="Teléfono"
            url="https://api.whatsapp.com/send?phone=582125555555"
            subtitle="+58 212-555-5555"
          />
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet class="d-flex justify-center">
          <ContactCard
            icon="mdi-message-processing-outline"
            title="Fax"
            url="https://api.whatsapp.com/send?phone=582125555555"
            subtitle="+58 212-555-5556"
          />
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="d-flex justify-center">
          <ContactCard
            icon="mdi-email"
            title="Correo electrónico"
            url="mailto:info@bancouniversitario.com.ve"
            subtitle="info@bancouniversitario.com.ve"
          />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
  <FooterBar />
</template>
