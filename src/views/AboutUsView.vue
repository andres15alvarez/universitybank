<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import AboutUsCard from '@/components/AboutUsCard.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<template>
  <NavigationBar />
  <div class="text-center">
    <p class="font-weight-bold text-h4 text-md-h3 text-primary">
      Sobre nosotros
    </p>
  </div>
  <div class="aboutUsContainer mx-5 mx-md-16">
    <v-container class="my-5">
      <v-row>
        <v-col>
          <v-sheet
            class="d-flex justify-center mt-5"
            color="transparent"
          >
            <AboutUsCard
              title="Visión"
              content="Queremos ser la mejor opción financiera para estudiantes
              universitarios en el país. Deseamos ser reconocidos por nuestros servicios
              innovadores, la calidad de atención al cliente y nuestro compromiso con la
              educación y el desarrollo social."
            />
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet
            class="d-flex justify-center mt-5"
            color="transparent"
          >
            <AboutUsCard
              title="Misión"
              content="Somos una institución financiera comprometida con los
              estudiantes universitarios, brindando soluciones financieras
              ágiles y eficientes. Nuestra misión es facilitar la gestión de
              sus recursos y contribuir al crecimiento económico y personal de
              nuestros clientes."
            />
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-sheet
            class="d-flex justify-center mt-5"
            color="transparent"
          >
            <v-card
              class="text-center"
              variant="tonal"
              color="transparent"
              max-width="800"
            >
              <div class="pa-6">
                <v-card-title class="font-weight-bold my-2 text-white text-h5 text-md-h4">
                  Objetivos
                </v-card-title>
                <v-divider
                  class="border-opacity-100 mx-auto"
                  thickness="2"
                  color="primary"
                  length="55"
                />
                <v-card-text class="font-weight-medium my-15 text-white text-h6 text-md-h5">
                  <li>
                    Brindar a los estudiantes universitarios un servicio eficiente y de calidad en
                    la gestión de sus recursos financieros, a través de nuestros canales digitales y
                    nuestros puntos de atención presencial.
                  </li>
                  <br>
                  <li>
                    Fomentar el uso de nuestras plataformas digitales para hacer transferencias
                    entre estudiantes sin comisión, depósitos y retiros en efectivo, ofreciendo
                    herramientas tecnológicas fáciles y seguras.
                  </li>
                  <br>
                  <li>
                    Promover la educación financiera de los estudiantes universitarios, a través de
                    charlas, talleres y capacitaciones sobre temas como el ahorro, la inversión y el
                    uso responsable del crédito.
                  </li>
                  <br>
                  <li>
                    Establecer alianzas estratégicas con universidades y empresas para ofrecer
                    beneficios exclusivos a nuestros clientes, tales como descuentos en matrículas,
                    becas, prácticas laborales, entre otros.
                  </li>
                  <br>
                  <li>
                    Mantener una cultura de innovación y mejora continua en nuestros procesos,
                    productos y servicios, para estar siempre a la vanguardia de las necesidades de
                    nuestros clientes y del mercado.
                  </li>
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
