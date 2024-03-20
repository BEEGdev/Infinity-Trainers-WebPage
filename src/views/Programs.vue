<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
</script>

<template class="">
    <HeaderComponent/>
    <img src="https://cloud1.email2go.io/7efeb6400e09756814e99049835fa47b/6e815769a32d64e399e8e6df1121d4346d258a72edd67b9af4f637ef99f51071.jpg" alt="" class="w-full">
    <div class="bg-[#016646] text-white p-8">
        <p class="p-1 font-extrabold text-2xl text-center">¿Estás dispuesto a apostar por ti?</p>
        <p class="p-7">
        Invertir en ti mismo es inestimable. En Infinity Trainers, más allá de un precio, ofrecemos un resultado. Diseñamos tarifas pensando en tus sueños, en esos retos personales que te has planteado. Porque entendemos que eres único, y tu entrenamiento debe ser tan especial como tú.
        </p>
    </div>
        <div class="grid place-items-center my-10 w-full gap-20 drop-shadow-md" > <!--Tarjetas de bono-->

            <div class="w-10/12 bg-[#016646] text-center rounded-xl text-white"> <!--Primer bono-->
                
                    <h2 class="p-8 font-bold text-2xl   ">ESSENCE:<br>BONO 5 SESIONES</h2>
                    <img src="https://cloud1.email2go.io/7efeb6400e09756814e99049835fa47b/7c503a1b396b218d34b7f9953720f5a3d4befe13bacc523af79cdbaa209fe98a.jpg" alt="" class=" w-full">
                    <div class="p-7 bg-[#E4DBC0] grid sm:grid-cols-1 gap-5 text-[#372100]">
                        <p class="bg-[#E4DBC0] font-semibold text-lg">
                        Comienza en el entrenamiento personal por la puerta grande. 
                        En este paquete comenzarás un cambio que te guiará a conseguir los objetivos que te propongas
                        </p>
                        <span class="font-extrabold text-lg">Desde 195 €</span>
                    </div>
                <button class="p-6 text-2xl font-semibold bg-[#A88A5E] w-full rounded-b-xl">Quiero verlo</button>
            </div>

            <div class="w-10/12 bg-[#016646] text-center rounded-xl text-white drop-shadow-md"> <!--Segundo bono-->
                
                <h2 class="p-8 font-bold text-2xl">LIMITLESS: <br>BONO 10 SESIONES</h2>
                <img src="https://cloud1.email2go.io/7efeb6400e09756814e99049835fa47b/1abe314cd802166ac89fae60aa9413c7ba4ed5afc48c7b89c278481fcff7b539.jpg" alt="" class="h-full w-full">
                <div class="p-7 bg-[#E4DBC0] grid sm:grid-cols-1 gap-5 text-[#372100]">
                    <p class="bg-[#E4DBC0] font-semibold text-lg">
                        Diseñado para aquellos que buscan un gran cambio, un entrenamiento que te cambiará físicamente a pasos agigantados.
                    </p>
                    <span class="font-extrabold text-lg">Desde 210 €</span>
                </div>
            <button class="p-6 text-2xl font-semibold bg-[#A88A5E] w-full rounded-b-xl">Quiero verlo</button>
            </div>

            <div class="w-10/12 bg-[#016646] text-center rounded-xl text-white drop-shadow-md"> <!--Tercer bono-->
                
                <h2 class="p-8 font-bold text-2xl">INFINITY ELITE <br>EXPERIENCE</h2>
                <img src="https://cloud1.email2go.io/7efeb6400e09756814e99049835fa47b/657187fb37458f2f3021ee3e4293a22b3852e6d08f026d5a33430b1b3806e9eb.jpg" alt="" class="h-full w-full">
                <div class="p-7 bg-[#E4DBC0] grid sm:grid-cols-1 gap-5 text-[#372100]">
                    <p class="bg-[#E4DBC0] font-semibold text-lg">
                        Nuestro paquete premium. Con todo un equipo de profesionales de la actividad física, nutricionistas y fisioterapeutas se coordinan para ofrecerte la transformación más increíble que hay en el sector.
                    </p>
                    <span class="font-extrabold text-lg">Desde 800€/mes</span>
                </div>
            <button class="p-6 text-2xl font-semibold bg-[#A88A5E] w-full rounded-b-xl">Quiero verlo</button>
            </div>
        </div>

    <FooterComponent/>
</template>
