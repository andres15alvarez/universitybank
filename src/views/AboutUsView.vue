<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
</script>

<template>
  <NavigationBar />
  <div class="text-center">
    <h3>Sobre nosotros</h3>
  </div>
  <v-container class="aboutUsContainer my-5 d-flex align-center">
    <v-row>
      <v-col>
        <v-sheet class="d-flex justify-center my-5" color="transparent">
          <v-card class="text-center" rounded="10" outlined color="transparent" width="400">
            <div class="pa-6">
              <v-card-title class="Montserrat-Bold my-2 whiteText titleFontSize"
                >Visión</v-card-title
              >
              <v-divider
                class="border-opacity-100 mx-auto"
                thickness="2"
                color="#085f63"
                length="55"
              ></v-divider>
              <v-card-text class="Montserrat-SemiBold my-15 whiteText textFontSize">
                Queremos ser la mejor opción financiera para estudiantes universitarios en el país.
                Deseamos ser reconocidos por nuestros servicios innovadores, la calidad de atención
                al cliente y nuestro compromiso con la educación y el desarrollo social.
              </v-card-text>
            </div>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="d-flex justify-center my-5" color="transparent">
          <v-card class="text-center" outlined color="transparent" rounded="10" width="400">
            <div class="pa-6">
              <v-card-title class="Montserrat-Bold my-2 whiteText titleFontSize"
                >Misión</v-card-title
              >
              <v-divider
                class="border-opacity-100 mx-auto"
                thickness="2"
                color="#085f63"
                length="55"
              ></v-divider>
              <v-card-text class="Montserrat-SemiBold my-15 whiteText textFontSize">
                Somos una institución financiera comprometida con los estudiantes universitarios,
                brindando soluciones financieras ágiles y eficientes. Nuestra misión es facilitar la
                gestión de sus recursos y contribuir al crecimiento económico y personal de nuestros
                clientes.
              </v-card-text>
            </div>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.aboutUsContainer {
  background: url('https://universitybank.sirv.com/images/about-us.png');
  background-size: cover;
}

.whiteText {
  color: white;
}

.titleFontSize {
  font-size: 36px !important;
}

.textFontSize {
  font-size: 24px !important;
}
</style>
