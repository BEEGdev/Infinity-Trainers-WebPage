<script setup>  
import LoginWidget from '../components/LoginWidget.vue';
import { ref } from 'vue';

const props = defineProps({
    isLogged:Boolean
})

const isMenuVisible = ref(false);
    function showMobileMenu() {
    isMenuVisible.value = !isMenuVisible.value;
    } 

const handleScroll= () => {
    
    if (isMenuVisible.value == true){
        isMenuVisible.value = false;
    }
}

window.addEventListener('scroll', handleScroll);
</script>

<template>
    <header class="flex w-full bg-[#016646] sm:justify-between px-4 text-white sm:bg-yellow-600 md:bg-orange-600 lg:bg-blue-600 xl:bg-gray-600 2xl:bg-[#016646] ">
        <nav class="self-center">
            <router-link to="/"><span class=""><img src="https://d2hbcuqreawz28.cloudfront.net/logo-alt.png" alt="Infinity Trainers Logo" class="h-12 m-auto xl:m-0 self-center"></span></router-link>
        </nav>
        <div class="sm:hidden m-auto sm:m-0 text-2xl text-center">Infinity Trainers</div>
        <nav class="sm:justify-right">
            <ul class="p-5 hidden sm:flex sm:text-lg md:text-lg lg:text-2xl sm:gap-5 md:gap-10 lg:gap-10 xl:gap-24 sm:justify-center">
                <router-link to="/"><li class="p-1 rounded-md sm:px-1 align-middle hover:text-[#016646] hover:bg-white cursor-pointer transition duration-300">Inicio</li></router-link>
                <router-link to="/programs"><li class="p-1 rounded-md sm:px-1 align-middle hover:text-[#016646] hover:bg-white cursor-pointer transition duration-300">Nuestros entrenamientos</li></router-link>
                <router-link to="/aboutus"><li class="p-1 rounded-md sm:px-1 align-middle hover:text-[#016646] hover:bg-white cursor-pointer transition duration-300">Sobre nosotros</li></router-link>
            </ul>
        </nav>
        <nav class="self-center hidden sm:flex"><LoginWidget :isLogged="props.isLogged"/></nav>
        <div>
            <button class="relative group sm:hidden p-3" @click="showMobileMenu">
                <div
                    class="relative flex items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-[#FAF3E0] ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                    <div
                        class="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 group-focus:-rotate-[45deg] origin-center">
                        <div
                            class="bg-black h-[2px] w-1/2 rounded transform transition-all duration-300 group-focus:-rotate-90 group-focus:h-[1px] origin-right delay-75 group-focus:-translate-y-[1px]">
                        </div>
                        <div class="bg-black h-[1px] rounded"></div>
                        <div
                            class="bg-black h-[2px] w-1/2 rounded self-end transform transition-all duration-300 group-focus:-rotate-90 group-focus:h-[1px] origin-left delay-75 group-focus:translate-y-[1px]">
                        </div>
                    </div>
                </div>
            </button>
        </div>
    </header>
    <div class="w-screen absolute">
        <nav class="sm:hidden justify-end w-full" v-if="isMenuVisible">
            <ul class="text-right text-white text-2xl">
                <li class="p-6 sm:px-2 bg-[#016646]" @click="showMobileMenu"><LoginWidget :isLogged="props.isLogged"/></li>
                <router-link to="/"><li class="p-6 sm:px-2 bg-[#016646]" @click="showMobileMenu">Inicio</li></router-link>
                <router-link to="/programs"><li class="p-6 sm:px-2 bg-[#016646]" @click="showMobileMenu">Nuestros entrenamientos</li></router-link>
                <router-link to="/aboutus"><li class="p-6 sm:px-2 bg-[#016646]"@click="showMobileMenu">Sobre nosotros</li></router-link>
            </ul>
        </nav>
    </div>
</template>
    