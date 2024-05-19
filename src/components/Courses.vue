<script setup>
import { ref, watch} from 'vue';
import { useFirebaseStore } from '../stores/firebaseStore';
import { storeToRefs } from 'pinia';

const firebaseStore = useFirebaseStore(); //llamada a la store

const courses = storeToRefs(firebaseStore).getCourses; //cursos de la store
const role = storeToRefs(firebaseStore).getRole;    //rol de la store
const isAdmin = ref('false'); //bool para controlar la visibilidad del botón de editar
const emit = defineEmits(['editCourse','viewCourse']); //emits

function viewCourse(courseId){ //emit para ver el curso (click sobre el)
    emit('viewCourse',courseId);
}
function editCourse(courseId){//emit para editar el curso (click sobre editar)
    emit('editCourse',courseId);
}

watch(role, (newRole) => { //watcher que cambia el bool de admin en función al rol

    if(newRole=='admin'){
        isAdmin.value=true;
    }

    if(newRole=='user'){
        isAdmin.value=false;
    } 

})
</script>

<template>

<!-- Este es el componente de lista de cursos -->

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