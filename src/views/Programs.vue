<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
</script>

<template>
    <HeaderComponent/>

     <div class=""> <!--Tarjetas de bono-->
        <div class="w-96 bg-[#016646] rounded text-center"> <!--Primer bono-->
            <div>
                <h2>ESSENCE:BONO 5 SESIONES</h2>
                <img src="https://cloud1.email2go.io/7efeb6400e09756814e99049835fa47b/53d59bd066ffbe0a18a059107073018b16cc2467ccb1d48a855831f02068f984.jpg" alt="" class="h-full">
                <p>
                    Comienza en el entrenamiento personal por la puerta grande. 
                    En este paquete comenzarás un cambio que te guiará a conseguir los objetivos que te propongas
                </p>
                <span>Desde 195 €</span>
            </div>
            <button>Quiero verlo</button>
        </div>
    </div>
    <FooterComponent/>
</template>
