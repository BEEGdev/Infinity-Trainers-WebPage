<script setup>
import Card from '../components/Card.vue';
import webTexts from '../webTexts.json'
</script>

<template>
    <div>
    <div class="h-[calc(100vh-80px)]">
        <div class="grid grid-cols-1 bg-[url('https://d2hbcuqreawz28.cloudfront.net/hero2.webp')] w-full h-full bg-no-repeat bg-cover bg-left sm:bg-[url('https://d2hbcuqreawz28.cloudfront.net/hero.webp')] sm:bg-center pb-20">
            <div class="p-0 text-right grid grid-cols-1 place-items-end pt-20 w-full gap-40">
                <div class="grid grid-cols-1 place-items-center m-0 p-0 gap-4 w-7/12 sm:gap-8 sm:w-8/12">
                    <img class="w-6/12 sm:w-5/12 md:w-4/12" src="https://d2hbcuqreawz28.cloudfront.net/logo.png" alt="Infinity Trainers logo">
                    <span class="text-[#016646] font-bold text-2xl sm:text-4xl md:text-5xl xl:text-6xl">Infinity Trainers</span>
                </div>
                <router-link to="/programs" class="text-white flex gap-16 font-bold bg-[#016646] p-4 rounded-md m-auto sm:gap-44 hover:bg-white hover:text-[#016646] cursor-pointer">
                    <span class="">Consultar programas</span>
                    <span class="items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="m-0 p-0 h-full" width="20" height="20" viewBox="0 0 24 24" stroke-width="0.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M7 6l-.112 .006a1 1 0 0 0 -.669 1.619l3.501 4.375l-3.5 4.375a1 1 0 0 0 .78 1.625h6a1 1 0 0 0 .78 -.375l4 -5a1 1 0 0 0 0 -1.25l-4 -5a1 1 0 0 0 -.78 -.375h-6z" stroke-width="0" fill="currentColor" />
                        </svg>
                    </span>
                </router-link>    
            </div>
        </div>
    </div>
<div class="p-10 bg-[#016646] grid grid-cols-1 text-white text-center gap-8 font-bold place-items-center lg:grid-cols-2 ">
    <span>Entrenamiento personal en Madrid desde la comodidad de tu casa</span>
    <router-link to="/aboutus" class="border p-2 w-9/12 rounded-md hover:bg-white hover:text-[#016646] sm:w-6/12 xl:w-4/12 cursor-pointer">Encontrar mi zona</router-link>
</div> 
<div class="grid place-items-center my-10 w-full gap-20 drop-shadow-md md:my-24 lg:grid-flow-col lg:grid-cols-2 lg:gap-1 xl:gap-10 xl:w-10/12 xl:mx-auto">
    <Card  
        :title = "webTexts.bonds.bond_0.title"
        :subtitle = "webTexts.bonds.bond_0.subtitle"
        :description="webTexts.bonds.bond_0.description"
        :price="webTexts.bonds.bond_0.price"
        :isRecommended="webTexts.bonds.bond_0.isRecommended"
        :image="webTexts.bonds.bond_0.image"
    />
</div>
</div>
</template>