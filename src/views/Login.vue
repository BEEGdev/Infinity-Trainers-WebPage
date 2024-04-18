<script setup>
import { useFirebaseStore } from '../stores/firebaseStore';
import { ref } from 'vue';
const firebaseStore = useFirebaseStore()

const email= ref('');
const password= ref('');



function registerUser(email,password){
    firebaseStore.registerUser(email,password);
}; 
</script>

<template>
<div class="m-40">
    <form>
        <h2>Iniciar sesión</h2> 
        <input type="email" placeholder="Correo electrónico" required>
        <input type="password" placeholder="Contraseña" required>
    </form>
    
    <form @submit.prevent="onSubmit">
        <h2>Registrarse</h2>
        <input type="email" placeholder="Correo electrónico" v-model="email" required>
        <input type="password" placeholder="Contraseña" v-model="password" required>
        <button @click="registerUser(email,password)">REGISTRAR</button>
    </form>
</div> 
</template>