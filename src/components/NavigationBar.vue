<template>
  <v-toolbar class="d-none d-sm-flex" color="#fff">
    <a href="/">
      <img
        class="ml-10 ml-md-3 d-none d-md-flex w-75"
        src="https://universitybank.sirv.com/images/logo-no-background.png"
        width="300"
      />
    </a>

    <v-container>
      <v-btn-group variant="text" class="mx-10 mx-md-2 mx-sm-1" color="#085F63">
        <v-btn class="navigationBtn text-none mx-8 mx-md-2 mx-sm-auto" text="Servicios"></v-btn>
        <v-btn
          class="navigationBtn text-none mx-8 mx-md-2 mx-sm-auto"
          text="Sobre Nosotros"
        ></v-btn>
        <v-btn
          class="navigationBtn text-none mx-8 mx-md-2 mx-sm-auto"
          text="Contacto"
          to="/contact"
        ></v-btn>
      </v-btn-group>
    </v-container>

    <v-btn
      class="navigationBtn mr-10 mr-md-3 text-none"
      variant="flat"
      color="#085F63"
      size="default"
      rounded="4"
      text="Acceder"
    ></v-btn>
  </v-toolbar>

  <v-toolbar class="d-xs-flex d-sm-none" color="#fff">
    <v-btn color="#085F63" icon="mdi-menu">
      <v-menu activator="parent">
        <v-list>
          <v-list-item>
            <v-btn
              variant="text"
              class="navigationBtn text-none mx-8 mx-md-2 mx-sm-auto"
              text="Servicios"
              color="#085F63"
            ></v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              variant="text"
              class="navigationBtn text-none mx-8 mx-md-2 mx-sm-auto"
              text="Sobre Nosotros"
              color="#085F63"
            ></v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              variant="text"
              class="navigationBtn text-none mx-8 mx-md-2 mx-sm-auto"
              text="Contacto"
              color="#085F63"
            ></v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              variant="flat"
              class="navigationBtn text-none mx-8 mx-md-2 mx-sm-auto"
              text="Acceder"
              color="#085F63"
            ></v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>

    <a href="/">
      <img
        class="ml-10 w-50"
        src="https://universitybank.sirv.com/images/logo-no-background.png"
        width="75"
      />
    </a>
  </v-toolbar>
</template>

<style>
.navigationBtn {
  font-size: 20px !important;
  font-family: MontserratAlternates-Bold;
}
</style>
