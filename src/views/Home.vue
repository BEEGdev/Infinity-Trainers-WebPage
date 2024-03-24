<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
</script>

<template>
    <div class="h-screen">
        <HeaderComponent/>
        <div class="grid grid-cols-1 bg-[url('https://cloud1.email2go.io/7efeb6400e09756814e99049835fa47b/e1beceff925ff8ae203df2843b3d5e0ad72966eca5507931106b428ed0c27bb8.jpg')] w-full h-full bg-no-repeat bg-cover bg-left sm:bg-[url('https://cloud1.email2go.io/7efeb6400e09756814e99049835fa47b/53d59bd066ffbe0a18a059107073018b16cc2467ccb1d48a855831f02068f984.jpg')] sm:bg-center pb-20">
            <div class="p-0 text-right grid grid-cols-1 place-items-end pt-20 w-full gap-40">
                <div class="grid grid-cols-1 place-items-center m-0 p-0 gap-4 w-7/12 sm:gap-8">
                    <img class="w-6/12 sm:w-3/12 md:2xl" src="https://cloud1.email2go.io/7efeb6400e09756814e99049835fa47b/d3c31ff47edb18b08863aec6e5bc73c653b77692c75243ef85d046e63c36d31a.png" alt="Infinity Trainers logo">
                    <span class="text-[#016646] font-bold text-2xl sm:text-2xl md:text-3xl xl:text-4xl">Infinity Trainers</span>
                </div>
                <div class="text-white flex gap-16 bg-[#016646] p-4 rounded-md m-auto sm:gap-44">
                    <span class="text-bold">Consultar programas</span>
                    <span>></span>
                </div>    
            </div>
        </div>
    </div>
    <FooterComponent/>
</template>