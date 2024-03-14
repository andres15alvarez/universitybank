<template>
  <container class="containerService">
    <div>
      <v-icon :icon="icon" size="60px" color="#085f63"></v-icon>
    </div>
    <div class="divTextos">
      <h4 class="tituloService">
        {{ title }}
      </h4>

      <v-divider class="border-opacity-100" thickness="2" color="#085f63" length="90"></v-divider>

      <p class="parrafoService">
        {{ text }}
      </p>
    </div>
  </container>
</template>

<style>
.tituloService {
  display: inline-block;
  font-size: 25px;
  padding-bottom: 7px;

  line-height: 1.25;
}
.containerService {
  display: flex;
}
.parrafoService {
  font-size: 16px;
}
.divTextos {
  padding-left: 16px;
}
</style>

<script>
export default {
  props: {
    icon: String,
    title: String,
    text: String
  }
}
</script>
