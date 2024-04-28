<script setup>
import { ref, onBeforeMount } from 'vue';
import { useFirebaseStore } from '../stores/firebaseStore';
const firebaseStore = useFirebaseStore()

const name = ref(firebaseStore.getName);
const email = ref(firebaseStore.getEmail);
const isVerified = ref(false);
const isLogged = ref(false);

function getCourses(){
    firebaseStore.getCourses();
}

onBeforeMount(() => {
    firebaseStore.checkStatus();    

    if(firebaseStore.getLogged){ 

        isLogged.value=true;

        if(firebaseStore.getVerified){
            isVerified.value=true;
            getCourses();
        }
        else{
            isVerified.value=false;
        }
    }
    else{
        isLogged.value=false;
    }
})


</script>

<template>
    <div>
        <button @click="firebaseStore.resendVerificationEmail()">Reenviar correo de verificación</button>
    </div>
</template>