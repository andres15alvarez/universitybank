<template>
  <v-toolbar>
    <img
      class="ml-10 ml-md-3 d-sm-none d-md-flex w-25"
      src="https://universitybank.sirv.com/images/logo-no-background.png"
      width="300"
    />

    <v-container>
      <v-btn-group variant="text" class="mx-10 mx-md-2 mx-sm-1" color="#085F63">
        <v-btn class="navigationBtn text-none mx-8 mx-md-2 mx-sm-auto" text="Servicios"></v-btn>
        <v-btn
          class="navigationBtn text-none mx-8 mx-md-2 mx-sm-auto"
          text="Sobre Nosotros"
        ></v-btn>
        <v-btn class="navigationBtn text-none mx-8 mx-md-2 mx-sm-auto" text="Contacto"></v-btn>
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
</template>

<style>
.v-toolbar__content {
  background-color: #fff;
}

.navigationBtn {
  font-size: 20px !important;
  font-family: MontserratAlternates-Bold;
}
</style>
