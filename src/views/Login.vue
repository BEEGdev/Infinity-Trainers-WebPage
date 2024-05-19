<script setup>
import { storeToRefs } from 'pinia';
import { useFirebaseStore } from '../stores/firebaseStore';
import { ref ,watch, onBeforeMount} from 'vue';
const firebaseStore = useFirebaseStore()

const isRegister = ref(false) //bool para controlar la visibilidad login/registro
const email= ref(''); //referencias reactivas para los formularios
const name= ref('');
const password= ref('');
const password2= ref('');
const passwordStyle = ref('p-2 rounded-lg outline-none text-xl');
const passwordStyle2 = ref('p-2 rounded-lg outline-none text-xl');
const error = storeToRefs(firebaseStore).getError; //traigo el error de la store
const errorMessage = storeToRefs(firebaseStore).getErrorMessage; //traigo el mensaje de error de la store
const loginEmail= ref('');
const loginPassword= ref('');
    
watch(password,() => { //watcher para el color de la contraseña
    password.value.length < 6 ? passwordStyle.value="p-2 rounded-lg text-red-600 outline-none text-xl" : passwordStyle.value="p-2 rounded-lg text-green-600 outline-none text-xl";
})

watch(password2,() => {//watcher para el color de la contraseña
    password2.value.length < 6 ? passwordStyle2.value="p-2 rounded-lg text-red-600 outline-none text-xl" : passwordStyle2.value="p-2 rounded-lg text-green-600 outline-none text-xl";
})

function handleToggle(){ //manejo de la visibilidad de los formularios
    firebaseStore.modifyState('user.error',false);
    firebaseStore.modifyState('user.errorMessage','');
    isRegister.value = !isRegister.value;
}

function checkRegisterInput(){ //verificiación del formulario de registro
    if(
        (name.value != '' && name.value != null) &&
        (password.value != '' && password.value != null) &&
        (password2.value != '' && password2.value != null) &&
        (password.value > 6  ) &&
        (password2.value > 6 ) &&
        (password.value === password2.value)
    ){
        firebaseStore.modifyState('user.error',false);
        firebaseStore.modifyState('user.errorMessage','');
        return true;
    }

    else{
        firebaseStore.modifyState('user.error',true);
        firebaseStore.modifyState('user.errorMessage','Datos de registro no válidos');
        return false;
    }
}

function registerUser(email,password,name){ 
    //si el check es exitoso se hace el registro, si no se lanza error
    checkRegisterInput() ? firebaseStore.registerUser(email,password,name) : firebaseStore.modifyState('user.error',true);
}; 

function loginUser(email,password){
    //se hace el login
    firebaseStore.doLogin(email,password);

}; 

onBeforeMount(() => { //antes de que la pagina cargue
    firebaseStore.checkStatus();   //comprobación de estado de login
    firebaseStore.handleNavigationAccess(); //navigation access para actuar en consecuencia, si está logged va a /personal
});

</script>
<!-- Componente de formularios de login/registro -->
<template>
    <div class="h-screen flex items-center justify-center flex-col gap-5">
        
            <div v-show="!isRegister" class="grid grid-cols-1 bg-[#016646] p-12 rounded-lg sm:w-9/12 lg:w-6/12 xl:w-4/12 2xl:w-3/12 gap-8">
                <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-10">
                    <input type="email" v-model="loginEmail" placeholder="Correo electrónico" required class="p-2 rounded-lg outline-none text-xl">
                    <input type="password" v-model="loginPassword" placeholder="Contraseña" required class="p-2 rounded-lg outline-none text-xl">
                    <button @click="loginUser(loginEmail,loginPassword)" class="bg-white w-6/12 py-2 rounded-lg font-semibold mx-auto outline-none text-[#016646]" >Iniciar sesión</button>
                </form>
                <p class="text-white mx-auto">¿No tienes una cuenta? <span @click="handleToggle()" class="font-bold cursor-pointer underline">regístrate</span> </p>
            </div>
            
            <div v-show="isRegister" class="grid grid-cols-1 bg-[#016646] p-12 rounded-lg w-3/12 gap-8">
                <form @submit.prevent="onSubmit"v-show="isRegister" class="grid grid-cols-1 gap-10" >
                    <input type="email" placeholder="Correo electrónico" v-model="email" required class="p-2 rounded-lg outline-none text-xl">
                    <input type="text" placeholder="Nombre" v-model="name" required class="p-2 rounded-lg outline-none text-xl">
                    <input type="password" placeholder="Contraseña" v-model="password" required :class="passwordStyle">
                    <input type="password" placeholder="Repetir contraseña" v-model="password2"  required :class="passwordStyle2">
                    <button @click="registerUser(email,password,name)" class="bg-white w-6/12 py-2 rounded-lg font-semibold mx-auto text-[#016646]">Registrar</button>
                </form>
                    <p class="text-white mx-auto">¿Ya tienes una cuenta? <span @click="handleToggle()" class="font-bold cursor-pointer underline">inicia sesión</span> </p>   
            </div>
            <p class="text-red-600 font-bold text-lg" v-show="error">{{ errorMessage }}</p>
    </div>
    
</template>