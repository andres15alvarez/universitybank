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
      <v-btn-group variant="text" class="mx-10 mx-md-2 mx-sm-1" color="primary">
        <v-btn
          class="font-weight-bold text-h6 mx-8 mx-md-2 mx-sm-auto"
          text="Servicios"
          to="/services"
        >
        </v-btn>
        <v-btn
          class="font-weight-bold text-h6 mx-8 mx-md-2 mx-sm-auto"
          text="Sobre Nosotros"
          to="/about"
        ></v-btn>
        <v-btn
          class="font-weight-bold text-h6 mx-8 mx-md-2 mx-sm-auto"
          text="Contacto"
          to="/contact"
        ></v-btn>
      </v-btn-group>
    </v-container>

    <v-btn
      class="font-weight-bold text-h6 mr-10 mr-md-3 text-none"
      variant="flat"
      color="primary"
      size="default"
      rounded="4"
      text="Acceder"
      to="/login"
    ></v-btn>
  </v-toolbar>

  <v-toolbar class="d-xs-flex d-sm-none" color="#fff">
    <v-btn>
      <v-icon color="primary" size="x-large" icon="mdi-menu"></v-icon>
      <v-menu activator="parent">
        <v-list>
          <v-list-item>
            <v-btn
              variant="text"
              class="font-weight-bold text-h6 mx-8 mx-md-2 mx-sm-auto"
              text="Servicios"
              color="primary"
              to="/services"
            ></v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              variant="text"
              class="font-weight-bold text-h6 mx-8 mx-md-2 mx-sm-auto"
              text="Sobre Nosotros"
              color="primary"
              to="/about"
            ></v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              variant="text"
              class="font-weight-bold text-h6 mx-8 mx-md-2 mx-sm-auto"
              text="Contacto"
              color="primary"
              to="/contact"
            ></v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              variant="flat"
              class="font-weight-bold text-h6 mx-8 mx-md-2 mx-sm-auto"
              text="Acceder"
              color="primary"
              to="/login"
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
