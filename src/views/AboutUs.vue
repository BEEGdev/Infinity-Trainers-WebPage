<script setup>

import InfoDropdown from '../components/InfoDropdown.vue';
import webTexts from '../webTexts.json'
</script>

<template>
<div>
<div class="w-full h-64 bg-cover bg-bottom bg-[url('https://d2hbcuqreawz28.cloudfront.net/FAQ-header.webp')]"> </div>
    <div class="bg-[#016646] text-white p-8 text-center">
        <h1 class="p-1 font-extrabold text-2xl text-center">Entrenador personal a Tu Puerta, Transforma Tu Espacio en lugar ideal para entrenar con Infinity Trainers</h1>
        <p class="p-7">
            Bienvenido a la experiencia definitiva de entrenamiento a domicilio en Madrid capital con Infinity Trainers. Aquí, tu comodidad y objetivos son nuestra prioridad. Olvídate de desplazamientos aglomeraciones y  limitaciones de tiempo; te traemos un servicio de entrenamiento personalizado que se adapta a tu ritmo de vida y necesidades. Descubre cómo cada rincón de tu hogar o de tu zona puede convertirse en el escenario perfecto para tu transformación física y mental.
        </p>
    </div>
        <div class="grid grid-cols place-items-center my-14 gap-12">
            <InfoDropdown v-for="aboutUs in webTexts.aboutUs"
            :title="aboutUs.title"
            :text="aboutUs.text"
            :list="aboutUs.list"
            />
</div>
</div>
</template>
