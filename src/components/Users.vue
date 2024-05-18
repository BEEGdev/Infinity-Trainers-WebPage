<script setup>

import { useFirebaseStore } from '../stores/firebaseStore';
import { storeToRefs } from 'pinia';

const firebaseStore = useFirebaseStore();

const userList = storeToRefs(firebaseStore).getUserList;
const emit = defineEmits(['editUser','viewUser'])


function editUser(key){
    emit('editUser',key);
}

function viewUser(key){
    emit('viewUser',key);
}
</script>

<template>
<div class="grid grid-cols-1 gap-5">

    <div v-for="(user,key) in userList" :key="key">
        <div class="bg-white text-[#016646] p-6 rounded-lg shadow-lg shadow-gray-300 flex flex-row justify-between">
            <div @click="viewUser(key)" class="w-full">
                <div class="grid grid-cols-1 gap-5 align-middle">
                    <p class="font-bold text-lg">{{ user.name }}</p>
                    <div class="flex flex-row gap-9">
                        <p>{{ user.email }}</p>
                        <p>{{ user.role }}</p>
                    </div>
                    
                </div>
        </div>
        <div class="align-middle">
                <button class="hover:underline z-800" @click="editUser(key)">Editar</button>
            </div>
        </div>
    
    </div>

</div>        
</template>