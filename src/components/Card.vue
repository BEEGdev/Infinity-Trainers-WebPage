<script setup>
const props = defineProps({
  title: String,
  subtitle: String,
  description: String,
  price: String,
  image: String
})

</script>

<template>
    <div class="w-10/12 bg-[#E4DBC0] text-center rounded-xl text-white sm:w-8/12 md:w-6/12 lg:w-10/12 xl:w-10/12 2xl:w-9/12 h-full grid grid-cols-1"> <!--Primer bono-->
                
                <h2 class="p-8 font-bold text-2xl lg:text-xl lg:p-7 bg-[#016646] rounded-t-xl">{{title}}:<br>{{subtitle}} </h2>
                <div :class="`w-full bg-[url('${props.image}')] bg-cover bg-center h-40`"></div>
                <div class="p-7 bg-[#E4DBC0] grid sm:grid-cols-1 gap-5 text-[#372100] lg:p-3">
                    <p class="bg-[#E4DBC0] font-semibold text-lg lg:text-sm">
                    {{description}}
                    </p>
                    <span class="font-extrabold text-lg lg:text-base">Desde {{price}} €</span>
                </div>
            <button class="p-6 text-2xl font-semibold bg-[#A88A5E] w-full rounded-b-xl lg:text-base lg:p-4">Quiero verlo</button>
        </div>
</template>