<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<template>
  <NavigationBar />
  <div class="text-center">
    <p class="font-weight-bold text-h4 text-md-h3 text-primary">Sobre nosotros</p>
  </div>
  <div class="aboutUsContainer mx-16">
    <v-container class="my-5 d-flex align-center" fill-height>
      <v-row>
        <v-col>
          <v-sheet class="d-flex justify-center my-5" color="transparent">
            <v-card class="text-center" outlined color="transparent" width="400">
              <div class="pa-6">
                <v-card-title class="font-weight-bold my-2 text-white text-h5 text-md-h4"
                  >Visión
                </v-card-title>
                <v-divider
                  class="border-opacity-100 mx-auto"
                  thickness="2"
                  color="primary"
                  length="55"
                ></v-divider>
                <v-card-text class="font-weight-medium my-15 text-white text-h6 text-md-h5">
                  Queremos ser la mejor opción financiera para estudiantes universitarios en el
                  país. Deseamos ser reconocidos por nuestros servicios innovadores, la calidad de
                  atención al cliente y nuestro compromiso con la educación y el desarrollo social.
                </v-card-text>
              </div>
            </v-card>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="d-flex justify-center my-5" color="transparent">
            <v-card class="text-center" outlined color="transparent" width="400">
              <div class="pa-6">
                <v-card-title class="font-weight-bold my-2 text-white text-h5 text-md-h4"
                  >Misión
                </v-card-title>
                <v-divider
                  class="border-opacity-100 mx-auto"
                  thickness="2"
                  color="primary"
                  length="55"
                ></v-divider>
                <v-card-text class="font-weight-medium my-15 text-white text-h6 text-md-h5">
                  Somos una institución financiera comprometida con los estudiantes universitarios,
                  brindando soluciones financieras ágiles y eficientes. Nuestra misión es facilitar
                  la gestión de sus recursos y contribuir al crecimiento económico y personal de
                  nuestros clientes.
                </v-card-text>
              </div>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <FooterBar />
</template>

<style>
.aboutUsContainer {
  position: relative;
}

.aboutUsContainer::before {
  content: ' ';
  position: absolute;
  width: 100%;
  height: 105%;
  opacity: 0.93;
  background-image: url('https://universitybank.sirv.com/images/about-us.png');
  background-size: 100%;
  background-repeat: repeat;
}
</style>
