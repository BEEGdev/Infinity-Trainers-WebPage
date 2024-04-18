<script setup>
import Card from '../components/Card.vue';
import webTexts from '../webTexts.json';
import ContactInfo from '../components/ContactInfo.vue';
</script>

<template class=""><div>
    <div class="w-full h-64 bg-cover bg-center bg-[url('https://d2hbcuqreawz28.cloudfront.net/programs-header.webp')]"> </div>
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
        :is-recommended="bond.isRecommended"
        :image="bond.image"
        :altText="bond.altText"
        /> 
    </div>

    <div class="grid grid-cols-1 place-items-center my-10">
        <ContactInfo/>
    </div>
</div>
</template>

