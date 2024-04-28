<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
<div class="bg-white font-serif">
<HeaderComponent/>
<router-view v-slot="{ Component }">  
  <transition name="fade" mode="out-in">
        <component :is="Component"/>
  </transition>
</router-view>
<FooterComponent class=""/>
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