<script setup>
import { computed, ref , watch} from 'vue' 
import { RouterLink } from 'vue-router';
import { useFirebaseStore } from '../stores/firebaseStore';
import { storeToRefs } from 'pinia';
const firebaseStore = useFirebaseStore();

const isLogged= storeToRefs(firebaseStore).getLogged
const name= storeToRefs(firebaseStore).getName

</script>

<template>
    <div v-if="!isLogged" class="sm:text-lg md:text-lg lg:text-2xl sm:gap-5 p-">
        <RouterLink to="/login"><span class="">Iniciar sesión</span></RouterLink>
    </div>
    <div v-if="isLogged" class="sm:text-lg md:text-lg lg:text-2xl sm:gap-5 p-1">
        <RouterLink to="/login"><span class="">{{ name }}</span></RouterLink>
    </div>

</template>