<script>
import { ref } from 'vue' 
import { RouterLink } from 'vue-router';
const isLogged = ref(false); 


</script>
<template>
    <div v-if="!isLogged">
        <RouterLink to="/login"><span>Iniciar sesión</span></RouterLink>
    </div>
    <div v-if="isLogged">Sesión iniciada</div>
</template>