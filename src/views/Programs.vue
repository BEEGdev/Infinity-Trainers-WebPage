<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import Card from '../components/Card.vue';
import webTexts from '../webTexts.json';
</script>

<template class="">
    <HeaderComponent/>
    <div class="w-full h-64 bg-cover bg-center bg-[url('https://cloud1.email2go.io/7efeb6400e09756814e99049835fa47b/6e815769a32d64e399e8e6df1121d4346d258a72edd67b9af4f637ef99f51071.jpg')]"> </div>
    <div class="bg-[#016646] text-white p-8 text-center">
        <p class="p-1 font-extrabold text-2xl text-center">¿Estás dispuesto a apostar por ti?</p>
        <p class="p-7">
        Invertir en ti mismo es inestimable. En Infinity Trainers, más allá de un precio, ofrecemos un resultado. Diseñamos tarifas pensando en tus sueños, en esos retos personales que te has planteado. Porque entendemos que eres único, y tu entrenamiento debe ser tan especial como tú.
        </p>
    </div>
        <div class="grid place-items-center my-10 w-full gap-20 drop-shadow-md md:my-24 lg:grid-flow-col lg:grid-cols-3 lg:gap-1 xl:gap-10 xl:w-10/12 xl:mx-auto" > <!--Tarjetas de bono-->

        <Card v-for="bond in webTexts.bonds" 
        :title = "bond.title"
        :subtitle = "bond.subtitle"
        :description="bond.description"
        :price="bond.price"
        :image="bond.image"
        />
            
        </div>

    <FooterComponent/>
</template>

