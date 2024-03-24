<script setup>
import { ref } from 'vue';

ref

const isMenuVisible = ref(false);
    function showMobileMenu() {
    isMenuVisible.value = !isMenuVisible.value;
    } 

const handleScroll= (e) => {
    
    if (isMenuVisible.value == true){
        isMenuVisible.value = false;
    }
}

window.addEventListener('scroll', handleScroll);

</script>

<template>
    <header class="flex w-100 bg-[#016646] sm:justify-between sm:p-0 text-white sm:bg-yellow-600 md:bg-orange-600 lg:bg-blue-600 xl:bg-gray-600 2xl:bg-red-700">
        <nav>
            <span class=""><img src="../assets/logo.jpg" alt="Infinity Trainers Logo" class=" h-20 p-0"></span>
        </nav>
        <div class="sm:hidden m-auto sm:m-0 text-2xl text-center">Infinity Trainers</div>
        <nav class="sm:justify-right">
            <ul class="hidden sm:flex sm:text-lg md:text-lg lg:text-2xl sm:gap-5 md:gap-10 lg:gap-10 xl:gap-24 sm:justify-center">
                <li class="p-6 sm:px-1 align-middle">Inicio</li>
                <li class="p-6 sm:px-1 align-middle">Nuestros entrenamientos</li>
                <li class="p-6 sm:px-1 align-middle">Sobre nosotros</li>
            </ul>
        </nav>
        <div>
            <button class="relative group sm:hidden p-3" @click="showMobileMenu" v-on:focusout="showMobileMenu" >
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
    <div class="">
        <nav class="relative sm:hidden justify-end w-full z-50" v-if="isMenuVisible">
            <ul class="text-right text-white text-2xl ">
                <li class="p-6 sm:px-1 bg-[#016646]">Inicio</li>
                <li class="p-6 sm:px-1 bg-[#016646]">Nuestros entrenamientos</li>
                <li class="p-6 sm:px-1 bg-[#016646]">A domicilio</li>
                <li class="p-6 sm:px-1 bg-[#016646]">Sobre nosotros</li>
            </ul>
        </nav>
    </div>
</template>
