<script setup>
import { ref, onBeforeMount, watch} from 'vue';
import { useFirebaseStore } from '../stores/firebaseStore';
import { storeToRefs } from 'pinia';


const firebaseStore = useFirebaseStore();
const name = storeToRefs(firebaseStore).getName;
const email = storeToRefs(firebaseStore).getEmail;
const isVerified = storeToRefs(firebaseStore).getVerified;
const role = storeToRefs(firebaseStore).getRole;
const isAdmin = ref(role==='admin');
const isTab1=ref(true);
const isTab2=ref(false);
const tabText=ref('Mis cursos');
const tabText2=ref('Mis documentos');

function handleTab(tab) {

    switch (tab) {
        case 1 :
            isTab1.value=true;
            isTab2.value=false;
        break;
        
        case 2:
            isTab1.value=false;
            isTab2.value=true;
        break;
    }
    
}

watch(role, (newRole) => {
    if(newRole=='admin'){
        tabText.value = 'Cursos';
        tabText2.value = 'Usuarios';
        firebaseStore.handleCourses();
    }

    if(newRole=='user'){
        tabText.value = 'Mis cursos';
        tabText2.value = 'Mis documentos';
        firebaseStore.handleCourses();
} 

})

onBeforeMount(() => {
    firebaseStore.modifyState('user.role','');
    firebaseStore.checkStatus();   
    firebaseStore.handleNavigationAccess();    
})


function verificationReCheck(){
    firebaseStore.checkStatus(true);
    if(isVerified)getCourses();
}

function signOut(){
    firebaseStore.signOut();
    firebaseStore.checkStatus();
    
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

    <div v-show="isVerified" class="h-screen flex flex-col gap-20">
        <div class="flex justify-center gap-20 p-4 text-xl text-[#016646] text-center ">
            <p class="p-3 rounded-lg">{{ name }}</p>
            <p class="p-3 rounded-lg">{{ email }}</p>
            <button @click="signOut()" class="bg-[#016646] text-white px-2 rounded-lg font-bold">Cerrar sesión</button>
        </div>

        <div class="grid grid-cols-2 w-6/12 text-center font-black text-2xl self-center gap-24">
            <p @click="handleTab(1)" class="text-[#016646] border-b-2 border-[#0166465f] hover:bg-[#5bcfaa43] cursor-pointer">{{ tabText }}</p>
            <p @click="handleTab(2)" class="text-[#016646] border-b-2 border-[#0166465f] hover:bg-[#5bcfaa43] cursor-pointer">{{ tabText2 }}</p>
        </div>

        <div v-show="isTab1">

        </div>
        <div v-show="isTab2">
            
        </div>
    </div>
</div>
</template>