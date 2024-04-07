<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
<div class="bg-[#FAF3E0] font-serif">
<HeaderComponent/>
<router-view v-slot="{ Component }">  
  <transition name="fade" mode="out-in">
        <component :is="Component"/>
  </transition>
</router-view>
<FooterComponent/>
</div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: 400ms ease all;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}</style>