<script setup>
import { ref, watch} from 'vue';
import { useFirebaseStore } from '../stores/firebaseStore';
import { storeToRefs } from 'pinia';

const firebaseStore = useFirebaseStore();

const courses = storeToRefs(firebaseStore).getCourses;
const role = storeToRefs(firebaseStore).getRole;
const isAdmin = ref('false');
const emit = defineEmits(['editCourse','viewCourse']);

function viewCourse(courseId){
    emit('viewCourse',courseId);
}
function editCourse(courseId){
    emit('editCourse',courseId);
}

watch(role, (newRole) => {

if(newRole=='admin'){
    isAdmin.value=true;
}

if(newRole=='user'){
    isAdmin.value=false;
} 

})



</script>

<template>
<div class="grid grid-cols-1 gap-5">
    <div v-for="(course,key) in courses" :key="key">
        <div class="bg-white text-[#016646] p-6 rounded-lg shadow-lg shadow-gray-300 flex flex-col sm:flex-row justify-between">
            <div @click="viewCourse(key)" class="w-full">
                <div class="grid grid-cols-1 gap-5 align-middle">
                    <p class="font-bold text-lg">{{ course.name }}</p>
                    <p>{{ course.description }}</p>
                </div>
            </div>
            <div class="align-middle mt-8 sm:mt-0">
                    <button v-show="isAdmin" class="hover:underline z-999" @click="editCourse(key)">Editar</button>
            </div>
        </div>
    </div>
</div>        
</template>