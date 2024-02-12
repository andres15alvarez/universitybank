<template>
      <v-toolbar height="55">

        <img src="../../logo-no-background.png" class="logo"/>

        <div class="Montserrat-Bold div-nav" >
            <p>Servicios</p>
            <p>Sobre Nosotros</p>
            <p>Contacto</p>
        </div>


        <v-btn class="Montserrat-Bold text-none" variant="flat" color="#085F63" size="small" rounded="xs">
            Acceder
        </v-btn>

      </v-toolbar>

      
    <div class="container">
        <div class="a">
            <h3 class="Montserrat-SemiBold">Institución comprometida con los estudiantes universitarios</h3>
            <p class="Montserrat-SemiBold">soluciones financieras ágiles y eficientes</p>
            <div class="boton">
              <v-btn block class="Montserrat-SemiBold text-none" variant="flat" color="#085F63" size="small" rounded="xs">
                ¡Únete ahora!
              </v-btn>
            </div>   

        
        </div>
        <div class="b">
          <img src="../../public/ImagenHome.png" class="imagenHome">
        </div>
    </div>


    
</template>

<style>
.container{

    display: flex;
}
.a{
    display: inline-block;
    width: 55%;
    height: 365px;
    padding-left: 120px;
    padding-top: 110px;
    

}
.b{
    display: inline-block;
    width: 45%;
    height: 365px;
    

}


.boton{
    width: 180px;
    margin-top: 5px;
    margin-left: 75px;
}


h3{
    font-size: 20px;
    color: #085F63;
}

.v-toolbar__content{ 
    background-color: #fff;
}

.imagenHome{
    width: 400px;
    margin-left: -20px;
    margin-top: -30px;

}

.logo{
    width: 20% ;
    margin-left: 30px;
}

p {
    font-size: 12px;
    display: inline;
    color: #085F63;
    padding: 30px;
    

}

.div-nav{
    width: 62%;
    justify-content: space-between;
    padding: 55px;
}

.a p{
    color: rgba(0, 0, 0, 0.575);
    padding-left: 0%;
}


</style>