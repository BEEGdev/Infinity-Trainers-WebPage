<script setup>
import { useFirebaseStore } from '../stores/firebaseStore';
import { ref ,watch} from 'vue';
const firebaseStore = useFirebaseStore()

const isRegister = ref(false)
const email= ref('');
const name= ref('');
const password= ref('');
const password2= ref('');
const passwordStyle = ref('p-2 rounded-lg outline-none text-xl');
const passwordStyle2 = ref('p-2 rounded-lg outline-none text-xl');
const showError = ref(false);
const loginEmail= ref('');
const loginPassword= ref('');
    
watch(password,() => {
    password.value.length < 6 ? passwordStyle.value="p-2 rounded-lg text-red-600 outline-none text-xl" : passwordStyle.value="p-2 rounded-lg text-green-600 outline-none text-xl";
})

watch(password2,() => {
    password2.value.length < 6 ? passwordStyle2.value="p-2 rounded-lg text-red-600 outline-none text-xl" : passwordStyle2.value="p-2 rounded-lg text-green-600 outline-none text-xl";
})


const isInputOk = false;

function handleToggle(){
    console.log("ola");
    showError.value = false
    isRegister.value = !isRegister.value;
}

function checkRegisterInput(){
    if(
        (name.value != '' && name.value != null) &&
        (password.value != '' && password.value != null) &&
        (password2.value != '' && password2.value != null) &&
        (password.value > 6  ) &&
        (password2.value > 6 ) &&
        (password.value === password2.value)
    ){
        return true;
    }

    else{
        return false;
    }
}

function registerUser(email,password,name){
    checkRegisterInput() ? firebaseStore.registerUser(email,password,name) : showError.value = true;
}; 

function loginUser(email,password){
firebaseStore.doLogin(email,password);
}; 

</script>

<template>
    <div class="h-screen flex items-center justify-center flex-col gap-5">
        
            <div v-show="!isRegister" class="grid grid-cols-1 bg-[#016646] p-12 rounded-lg w-3/12 gap-8">
                <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-10">
                    <input type="email" v-model="loginEmail" placeholder="Correo electrónico" required class="p-2 rounded-lg outline-none text-xl">
                    <input type="password" v-model="loginPassword" placeholder="Contraseña" required class="p-2 rounded-lg outline-none text-xl">
                    <button @click="loginUser(loginEmail,loginPassword)" class="bg-white w-6/12 py-2 rounded-lg font-semibold mx-auto outline-none" >Iniciar sesión</button>
                </form>
                <p class="text-white mx-auto">¿No tienes una cuenta? <span @click="handleToggle()" class="font-bold cursor-pointer underline">regístrate</span> </p>
            </div>
            
            <div v-show="isRegister" class="grid grid-cols-1 bg-[#016646] p-12 rounded-lg w-3/12 gap-8">
                <form @submit.prevent="onSubmit"v-show="isRegister" class="grid grid-cols-1 gap-10" >
                    <input type="email" placeholder="Correo electrónico" v-model="email" required class="p-2 rounded-lg outline-none text-xl">
                    <input type="text" placeholder="Nombre" v-model="name" required class="p-2 rounded-lg outline-none text-xl">
                    <input type="password" placeholder="Contraseña" v-model="password" required :class="passwordStyle">
                    <input type="password" placeholder="Repetir contraseña" v-model="password2"  required :class="passwordStyle2">
                    <button @click="registerUser(email,password,name)" class="bg-white w-6/12 py-2 rounded-lg font-semibold mx-auto">Registrar</button>
                </form>
                    <p class="text-white mx-auto">¿Ya tienes una cuenta? <span @click="handleToggle()" class="font-bold cursor-pointer underline">inicia sesión</span> </p>   
            </div>
            <p class="text-red-600 font-bold text-lg" v-show="showError">No se ha podido <span v-show="!isRegister">iniciar sesión</span> <span v-show="isRegister">hacer el registro</span></p>
    </div>
    
</template>