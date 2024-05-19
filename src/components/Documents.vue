<script setup>
import { ref } from 'vue';
import { useFirebaseStore } from '../stores/firebaseStore';
import { storeToRefs } from 'pinia';

const firebaseStore = useFirebaseStore();

const documents = storeToRefs(firebaseStore).getDocuments;



const emit = defineEmits(['viewDoc']);

function viewDoc(docId){
    emit('viewDoc',docId);
}



</script>

<template>
<div class="grid grid-cols-1 gap-5">
    <div v-for="(doc,key) in documents" :key="key">
        <div class="bg-white text-[#016646] p-6 rounded-lg shadow-lg shadow-gray-300 flex flex-row justify-between">
            <div @click="viewDoc(key)" class="w-full">
                <div class="grid grid-cols-1 gap-5 align-middle">
                    <p class="font-bold text-lg">{{ doc.title }}</p>
                    <p>{{ doc.text }}</p>
                </div>
            </div>
        </div>
    </div>
</div>        
</template>