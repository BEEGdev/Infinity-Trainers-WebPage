<script>
import { ref } from 'vue' 
import { RouterLink } from 'vue-router';
import { useFirebaseStore } from '../stores/firebaseStore';
const isLogged = ref(false); 


</script>
<template>
    <div v-if="pelotas == false">
        <RouterLink to="/login"><span>Iniciar sesión</span></RouterLink>
    </div>
    <div v-if="pelotas == true">Sesión iniciada</div>
</template>