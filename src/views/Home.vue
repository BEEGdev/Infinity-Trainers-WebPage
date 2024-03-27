<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
</script>

<template>
    <div class="h-screen block">
        <HeaderComponent/>
        <div class="grid grid-cols-1 bg-[url('https://cloud1.email2go.io/7efeb6400e09756814e99049835fa47b/e1beceff925ff8ae203df2843b3d5e0ad72966eca5507931106b428ed0c27bb8.jpg')] w-full h-full bg-no-repeat bg-cover bg-left sm:bg-[url('https://cloud1.email2go.io/7efeb6400e09756814e99049835fa47b/53d59bd066ffbe0a18a059107073018b16cc2467ccb1d48a855831f02068f984.jpg')] sm:bg-center pb-20">
            <div class="p-0 text-right grid grid-cols-1 place-items-end pt-20 w-full gap-40">
                <div class="grid grid-cols-1 place-items-center m-0 p-0 gap-4 w-7/12 sm:gap-8 sm:w-8/12">
                    <img class="w-6/12 sm:w-5/12 md:w-4/12" src="https://cloud1.email2go.io/7efeb6400e09756814e99049835fa47b/d3c31ff47edb18b08863aec6e5bc73c653b77692c75243ef85d046e63c36d31a.png" alt="Infinity Trainers logo">
                    <span class="text-[#016646] font-bold text-2xl sm:text-4xl md:text-5xl xl:text-6xl">Infinity Trainers</span>
                </div>
                <div class="text-white flex gap-16 font-bold bg-[#016646] p-4 rounded-md m-auto sm:gap-44 hover:bg-white hover:text-[#016646]">
                    <span class="">Consultar programas</span>
                    <span>></span>
                </div>    
            </div>
        </div>
    </div>
<div class="p-10 bg-[#016646] grid grid-cols-1 text-white text-center gap-8 font-bold place-items-center lg:grid-cols-2">
    <span>Entrenamiento personal en Madrid desde la comodidad de tu casa</span>
    <span class="border p-2 w-9/12 rounded-md hover:bg-white hover:text-[#016646] sm:w-6/12 xl:w-4/12 ">Encontrar mi zona</span>
</div> 
<div class="grid grid-cols-1 place-items-center my-10">
    <div class="w-10/12 bg-[#016646] text-center rounded-xl text-white sm:w-8/12 md:w-6/12 lg:w-10/12 xl:w-10/12 2xl:w-9/12"> <!--Primer bono-->
                
                <h2 class="p-8 font-bold text-2xl lg:text-xl lg:p-7">ESSENCE:<br>BONO 5 SESIONES</h2>
                <div class=" w-full bg-[url('https://cloud1.email2go.io/7efeb6400e09756814e99049835fa47b/7c503a1b396b218d34b7f9953720f5a3d4befe13bacc523af79cdbaa209fe98a.jpg')] h-36 bg-cover bg-center md:h-40"></div>
                <div class="p-7 bg-[#E4DBC0] grid sm:grid-cols-1 gap-5 text-[#372100] lg:p-3">
                    <p class="bg-[#E4DBC0] font-semibold text-lg lg:text-sm">
                    Comienza en el entrenamiento personal por la puerta grande. 
                    En este paquete comenzarás un cambio que te guiará a conseguir los objetivos que te propongas
                    </p>
                    <span class="font-extrabold text-lg lg:text-base">Desde 195 €</span>
                </div>
            <button class="p-6 text-2xl font-semibold bg-[#A88A5E] w-full rounded-b-xl lg:text-base lg:p-4">Quiero verlo</button>
        </div>
</div>

    <FooterComponent/>
</template>