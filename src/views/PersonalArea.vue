<script setup>
import { ref, onBeforeMount, watch} from 'vue';
import { useFirebaseStore } from '../stores/firebaseStore';
import { storeToRefs } from 'pinia';

const firebaseStore = useFirebaseStore();
const emit = defineEmits(['notifyHeader']);

const name = storeToRefs(firebaseStore).getName;
const email = storeToRefs(firebaseStore).getEmail;
const isVerified = storeToRefs(firebaseStore).getVerified;
const isLogged = storeToRefs(firebaseStore).getLogged;

function getCourses(){
    firebaseStore.getCourses();
}

onBeforeMount(() => {
    firebaseStore.checkStatus();
    firebaseStore.handleNavigationAccess();    

    if(isLogged){ 
        emit('notifyHeader');
        if(isVerified){     
            getCourses();
        }
    }
})

function verificationReCheck(){
    firebaseStore.checkStatus(true);

    if(isVerified)getCourses();
}

</script>

<template>
    <div>
    <div class="h-screen flex items-center justify-center flex-col gap-5 w-9/12 m-auto" v-show="!isVerified">
        <div class="flex justify-center items-center flex-col gap-5">
            <p>¡Hola <span class="text-[#016646] font-semibold">{{ name }}</span>!</p>
            <p>Para acceder debes verificar tu identidad a través del correo que hemos enviado a <span class="text-[#016646] font-semibold"> {{ email }}</span></p>
        </div>
        <div class="flex justify-center items-center flex-col gap-5">
            <p>Pulsa este botón cuando hayas completado la verificación en tu correo</p>
            <button @click="verificationReCheck()" class="bg-[#016646] text-white p-2 rounded-lg font-bold">Comprobar verificación</button>
        </div>
        
        <div class="flex justify-center items-center flex-col gap-5">
            <p>¿No has recibido tu correo o el enlace ha caducado?</p>
            <button @click="firebaseStore.resendVerificationEmail()" class="bg-[#016646] text-white p-2 rounded-lg font-bold">Reenviar correo de verificación</button>
        </div>
    </div>

    <div v-show="isVerified">Pelotten</div>
</div>
</template>