<script setup>
const props = defineProps({
    title: String,
    subtitle: String,
    description: String,
    price: String,
    isRecommended: Boolean,
    image: String,
    altText: String
})
</script>

<template>
<div class="flex flex-col items-center h-full w-10/12 sm:w-8/12 md:w-6/12 lg:w-10/12 xl:w-10/12 2xl:w-9/12">
    <span v-if="isRecommended" class="bg-[#C1FF83] self-start lg:w-1.5/12 rounded-t-md text-center text-sm p-1 text-[#016646] z-10 fixed -translate-y-7">Recomendado</span>
    <div class=" text-center rounded-md text-white  h-full grid grid-cols-1 drop-shadow-[8px_8px_3px_rgba(1,102,70,0.15)]"> <!--Primer bono-->
                
                <h2 :class="isRecommended ? 'rounded-tr-xl':'rounded-t-xl'" class="p-8 font-bold text-2xl lg:text-xl lg:p-7 bg-[#016646]">{{title}}:<br>{{subtitle}} </h2>
                <div class="w-full h-40">
                <img :src="props.image" :alt="props.altText" class="object-cover"/>
                </div>
                <div class="p-7 bg-[#E4DBC0] grid sm:grid-cols-1 gap-5 text-[#372100] lg:p-3">
                    <p class="bg-[#E4DBC0] font-semibold text-lg lg:text-sm">
                    {{description}}
                    </p>
                    <span class="font-extrabold text-lg lg:text-base">Desde {{price}} €</span>
                </div>
            <button class="p-6 text-2xl font-semibold bg-[#A88A5E] w-full rounded-b-xl lg:text-base lg:p-4">Quiero verlo</button>
        </div>
</div>        
</template>