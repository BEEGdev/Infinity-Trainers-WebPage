<script setup>
const props = defineProps({
    title: String,
    subtitle: String,
    description: String,
    price: String,
    isRecommended: Boolean,//este bool controla la chapa de recomendado
    image: String,
    altText: String
})
</script>



<template>
    <!-- Este es el componente para las tarjetas de información sobre los programas -->
<div class="flex flex-col items-center h-full w-10/12 sm:w-8/12 md:w-6/12 lg:w-10/12 xl:w-10/12 2xl:w-9/12">
    <span v-if="isRecommended" class="bg-[#C1FF83] self-start lg:w-1.5/12 rounded-t-md text-center text-sm p-1 text-[#016646] z-10 fixed -translate-y-7">Recomendado</span>
    <div class=" text-center rounded-md text-white  h-full grid grid-cols-1 shadow-lg"> 
                
                <h2 :class="isRecommended ? 'rounded-tr-xl':'rounded-t-xl'" class="p-8 font-bold text-2xl lg:text-xl lg:p-7 bg-[#016646]">{{title}}:<br>{{subtitle}} </h2>
                <div class="w-full h-40">
                <img :src="props.image" :alt="props.altText" class="object-cover"/>
                </div>
                <div class="p-7 bg-white grid sm:grid-cols-1 gap-5 text-black lg:p-3">
                    <p class="bg-white font-semibold text-lg lg:text-sm">
                    {{description}}
                    </p>
                    <span class="font-extrabold text-lg lg:text-base p-2 w-6/12 mx-auto rounded-xl text-[#016646] bg-[#C1FF83]">Desde {{price}} €</span>
                </div>
            <a href="https://api.whatsapp.com/send?phone=111111111" class="p-6 text-2xl font-semibold bg-[#016646] w-full rounded-b-xl lg:text-base lg:p-4">Reservar</a>
        </div>
</div>        
</template>