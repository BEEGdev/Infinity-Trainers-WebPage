<script setup>
import { ref } from 'vue';
const props = defineProps({
  title: String,
  text: String,
  list: Array
})

const isDropdownOpen = ref(false);
let buttonSymbol ='+';

function openDropDown() {
    isDropdownOpen.value = !isDropdownOpen.value;
    isDropdownOpen.value? buttonSymbol = '-':buttonSymbol = '+';
} 

</script>

<template>
    <div class="grid grid-cols-1 place-items-center w-full">
            <div class="grid grid-cols-1 place-items-center w-full md:w-10/12">
            <div class="flex justify-between w-11/12 bg-[#A88A5E]  font-bold rounded-md text-white">
                <div class="p-3 text-xl">
                    {{title}}
                </div>
                <button @click="openDropDown" class="font-black bg-[#016646] p-3 px-5 rounded-r-md">{{ buttonSymbol }}</button>
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