<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { watch } from 'vue';
import router from './router/router';

watch(router.currentRoute,() => { //watcher para mover el scroll al principio de la página cuando cambia la ruta
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

</script>

<template>
<div class="bg-white font-serif">
<HeaderComponent/>
<router-view></router-view>
<FooterComponent class=""/>
</div>
</template>