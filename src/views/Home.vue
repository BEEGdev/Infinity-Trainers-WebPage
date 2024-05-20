<script setup>
import Card from '../components/Card.vue';
import webTexts from '../webTexts.json'
</script>

<template>

    <!-- Componente Home -->

    <div>
    <div class="h-[calc(100vh-80px)]">
        <div class="grid grid-cols-1 bg-[url('https://d2hbcuqreawz28.cloudfront.net/hero2.webp')] w-full h-full bg-no-repeat bg-cover bg-left sm:bg-[url('https://d2hbcuqreawz28.cloudfront.net/hero.webp')] sm:bg-center pb-20 relative">
            <div class="p-0 text-right grid grid-cols-1 place-items-center w-full gap-40">
                <div class="grid grid-cols-1 place-items-center mx-auto p-0 gap-4 w-fuññ sm:gap-8 sm:w-8/12">
                    <img class="w-5/12 sm:w-3/12 md:w-3/12" src="https://d2hbcuqreawz28.cloudfront.net/logo.png" alt="Infinity Trainers logo">
                    <span class="text-[#016646] font-bold text-3xl sm:text-2xl md:text-3xl xl:text-6xl">Infinity Trainers</span>
                </div>
            </div>
            <router-link to="/programs" class="text-white flex justify-between w-10/12 sm:w-5/12 lg:w-4/12 xl:w-3/12 font-bold bg-[#016646] p-3 rounded-md m-auto  hover:bg-white hover:text-[#016646] cursor-pointer absolute text-sm mx-auto self-end justify-self-center mb-10">
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
<div class="p-10 bg-[#016646] grid grid-cols-1 text-white text-center gap-8 font-bold place-items-center lg:grid-cols-2 ">
    <span>Entrenamiento personal en Madrid desde la comodidad de tu casa</span>
    <router-link to="/aboutus" class="border p-2 w-9/12 rounded-md hover:bg-white hover:text-[#016646] sm:w-6/12 xl:w-4/12 cursor-pointer">Encontrar mi zona</router-link>
</div> 
<div class="grid place-items-center my-10 w-full gap-20 md:my-24 lg:grid-flow-col lg:grid-cols-2 lg:gap-1 xl:gap-10 xl:w-10/12 xl:mx-auto">

        <Card  
            :title = "webTexts.bonds.bond_0.title"
            :subtitle = "webTexts.bonds.bond_0.subtitle"
            :description="webTexts.bonds.bond_0.description"
            :price="webTexts.bonds.bond_0.price"
            :isRecommended="webTexts.bonds.bond_0.isRecommended"
            :image="webTexts.bonds.bond_0.image"
        />

    <div class="h-full  grid grid-rows-3 w-11/12">
        <div class=" rounded-xl shadow-md shadow-gray-300 row-span-2 p-12 flex flex-col justify-between">
            <div class="flex flex-col gap-5">
                <p class="text-[#016646] font-black text-3xl">¿ Ya eres miembro ?</p>
                <p class="text-[#016646] text-xl">Entra en tu área personal</p>
            </div>
            <div class="w-full flex flex-col items-end">
                <router-link to="/login" class="w-8/12 md:w-4/12 lg:w-6/12 text-center font-bold text-lg text-white bg-[#016646] rounded-lg p-2 hover:bg-white hover:text-[#016646] cursor-pointer"> Iniciar sesión </router-link>
            </div>       
        </div>
        <div class="p-12 rounded-xl shadow-md shadow-gray-300 flex flex-row justify-between">
            <div class="flex flex-col gap-4 justify-between sm:justify-normal">
                <p class="text-2xl font-bold text-[#016646] w-10/12 sm:w-full">Nuestras redes</p>
                <p class="text-[#016646] w-8/12 sm:w-full">Para que no te pierdas nada</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-10 items-center justify-between sm:justify-center align-middle">
					<a href="https://www.instagram.com/infinity_trainers_/">
						<svg xmlns="http://www.w3.org/2000/svg" class="transition duration-300 border-b-4 border-transparent hover:border-white rounded-b" width="52" height="52" viewBox="0 0 24 24" stroke-width="1.5" stroke="#016646" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
							<path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
							<path d="M16.5 7.5l0 .01" />
						</svg>
					</a>
					<a href="https://www.facebook.com/profile.php?id=61550704021113&locale=es_ES">
						<svg xmlns="http://www.w3.org/2000/svg" class="transition duration-300 border-b-4 border-transparent hover:border-white rounded-b" width="50" height="50" viewBox="0 0 24 24" stroke-width="1.2" stroke="#016646" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
						</svg>
					</a>
			</div>
        </div>
    </div>
</div>
</div>
</template>