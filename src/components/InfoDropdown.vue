<script setup>
import { ref } from 'vue';
const props = defineProps({
  title: String,
  text: String,
  list: Array
})

const isDropdownOpen = ref(false);

function handleDropDown() {
    isDropdownOpen.value = !isDropdownOpen.value;
} 

</script>

<template>
    <div class="grid grid-cols-1 place-items-center w-full ">
            <div class="grid grid-cols-1 place-items-center w-full md:w-10/12">
            <div class="flex justify-between w-11/12 bg-[#A88A5E]  font-bold rounded-md text-white">
                <div class="p-3 text-xs md:text-xl self-center">
                    {{title}}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" @click="handleDropDown" v-if="!isDropdownOpen" class="bg-[#016646] h-full rounded-r-md p-2.5 cursor-pointer" width="56" height="56" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 6l-.112 .006a1 1 0 0 0 -.669 1.619l3.501 4.375l-3.5 4.375a1 1 0 0 0 .78 1.625h6a1 1 0 0 0 .78 -.375l4 -5a1 1 0 0 0 0 -1.25l-4 -5a1 1 0 0 0 -.78 -.375h-6z" stroke-width="0" fill="currentColor" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" @click="handleDropDown" v-if="isDropdownOpen" class="bg-[#016646] h-full rounded-r-md p-2.5 cursor-pointer" width="56" height="56" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M16.375 6.22l-4.375 3.498l-4.375 -3.5a1 1 0 0 0 -1.625 .782v6a1 1 0 0 0 .375 .78l5 4a1 1 0 0 0 1.25 0l5 -4a1 1 0 0 0 .375 -.78v-6a1 1 0 0 0 -1.625 -.78z" stroke-width="0" fill="currentColor" />
                </svg>
            </div>
                <div v-if="isDropdownOpen" class="p-5 w-11/12 text-pretty grid grid-cols-1 gap-3 bg-[#E4DBC0] rounded-b-md">
                    <p class="w-11/12 text-lg">{{text}}</p>
                    <ul v-if="list.length>0"> 
                        <li v-for="element in list" class="text-lg">{{ element }}</li>
                    </ul>
                </div>
            </div>
        </div>
</template>