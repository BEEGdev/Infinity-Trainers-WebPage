<script setup>
import { ref, onBeforeMount, watch} from 'vue';
import { useFirebaseStore } from '../stores/firebaseStore';
import { storeToRefs } from 'pinia';
import Courses from '../components/Courses.vue';
import Users from '../components/Users.vue';
import { v4 as uuidv4 } from 'uuid';


const firebaseStore = useFirebaseStore();
const name = storeToRefs(firebaseStore).getName;
const email = storeToRefs(firebaseStore).getEmail;
const isVerified = storeToRefs(firebaseStore).getVerified;
const role = storeToRefs(firebaseStore).getRole;
const courses = storeToRefs(firebaseStore).getCourses;
const isAdmin = ref(false);
const isTab1=ref(true);
const isTab2=ref(false);
const tabText=ref('Mis cursos');
const tabText2=ref('Mis documentos');
const tabStyle1 = ref('text-[#016646] border-b-2 border-[#0166465f] hover:bg-[#5bcfaa43] bg-[#5bcfaa43] cursor-pointer self-center');
const tabStyle2 = ref('text-[#016646] border-b-2 border-[#0166465f] hover:bg-[#5bcfaa43] cursor-pointer self-center');
const showTabs = ref(true);
const showForms = ref(false);

const isAddCourse = ref(false);
const isEditCourse =ref(false);
const isCreatePost =ref(false);
const isEditPost =ref(false);
const isEditUser =ref(false);

const courseName = ref('');
const courseDescription = ref('');
const coursePosts = ref({});
const courseId = ref('');
const postId = ref('');
const indexOfOrderedPost=ref();
const orderedPosts = ref([]);


const postName = ref('');
const videoLink = ref('');

const giveAdmin = ref(false);



function handleTab(tab) {

    switch (tab) {
        case 1 :
            isTab1.value=true;
            isTab2.value=false;
            tabStyle1.value='text-[#016646] border-b-2 border-[#0166465f] hover:bg-[#5bcfaa43] bg-[#5bcfaa43] cursor-pointer self-center';
            tabStyle2.value='text-[#016646] border-b-2 border-[#0166465f] hover:bg-[#5bcfaa43] cursor-pointer self-center';
        break;
        
        case 2:
            isTab1.value=false;
            isTab2.value=true;
            tabStyle1.value='text-[#016646] border-b-2 border-[#0166465f] hover:bg-[#5bcfaa43] cursor-pointer self-center';
            tabStyle2.value='text-[#016646] border-b-2 border-[#0166465f] hover:bg-[#5bcfaa43] bg-[#5bcfaa43] cursor-pointer self-center';
        break;
    }
    
}

watch(role, (newRole) => {

    if(newRole=='admin'){
        tabText.value = 'Cursos';
        tabText2.value = 'Usuarios';
        firebaseStore.handleCourses('read');
        firebaseStore.handleUserList('read');
        isAdmin.value=true;
    }

    if(newRole=='user'){
        tabText.value = 'Mis cursos';
        tabText2.value = 'Mis documentos';
        firebaseStore.handleCourses('read');
        firebaseStore.handleUserList('read');
        isAdmin.value=false;
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


function handleForms(operation,cancel){
    showTabs.value=false;
    showForms.value = true;

    switch (operation){
        case 'add-course':
            if(cancel){
                showTabs.value=true;
                isAddCourse.value=false;
            }
            else {
                courseName.value=''
                courseDescription.value=''
                isAddCourse.value=true;
                showTabs.value=false;
            }  
        break;

        case 'edit-course':
            if(cancel) {
                isEditCourse.value=false ;
                showForms.value=false; 
                showTabs.value=true;
                courseId.value=''
                firebaseStore.handleCourses('read');
            }
            else isEditCourse.value=true;
        break;

        case 'create-post':
        if(cancel) {
                isEditCourse.value=true;
                isCreatePost.value=false;
                postName.value='';
                videoLink.value='';  
            }
            else {
                isEditCourse.value=false;
                isCreatePost.value=true;
            }
        break;

        case 'edit-post':
            if(cancel){
                isEditPost.value=false;
                isEditCourse.value=true;
            }
            else{
                isEditPost.value=true;
            }   
        break;

        case 'edit-user':
            cancel? isEditUser.value=false : isEditUser.value=true;
        break;

        case 'close':
            isAddCourse.value=false
            isEditCourse.value=false
            isCreatePost.value=false
            showForms.value=false;
            isEditPost.value=false
            isEditUser.value=false
            showTabs.value=true;
        break;
    }
}

function editCourse(emitValue){
    courseId.value=emitValue;
    courseName.value = courses.value[courseId.value].name;
    courseDescription.value = courses.value[courseId.value].description;
    coursePosts.value = courses.value[courseId.value].posts;
    
    orderedPosts.value=[]
    for (let post in coursePosts.value) {    
        orderedPosts.value.push(coursePosts.value[post]);
    }

    orderedPosts.value.sort((a, b) => a.creationDate - b.creationDate);

    for (let i=0; i<orderedPosts.value.length;i++) {    
        console.log(orderedPosts.value[i].creationDate);
    }

    handleForms('edit-course')
}


function createCourse(){

    firebaseStore.handleCourses('write',null,courseName.value,courseDescription.value,null);
    courseName.value='';
    courseDescription.value='';
    isAddCourse.value=false;
    showTabs.value=true;
    firebaseStore.handleCourses('read');
}

function updateCourse(){

firebaseStore.handleCourses('update',courseId.value,courseName.value,courseDescription.value,coursePosts.value);
isEditCourse.value=false;
showTabs.value=true;
}

function deleteCourse(){

firebaseStore.handleCourses('delete',courseId.value);
isEditCourse.value=false;
showTabs.value=true;
firebaseStore.handleCourses('read');
}

function createPost(){
    let newPost={
        name:'',
        link:'',
        id:'',
        creationDate:Date.now()
    }
    let postId = uuidv4();

    coursePosts.value[postId]=newPost;
    coursePosts.value[postId].name = postName.value;
    coursePosts.value[postId].link = videoLink.value;
    coursePosts.value[postId].id = postId;


    orderedPosts.value.push(coursePosts.value[postId]);

    isEditCourse.value=true;
    isCreatePost.value=false;
    postName.value='';
    videoLink.value='';

    console.log(newPost.creationDate.value)
    newPost={
    }
}

function editPost(key,index){
    isEditCourse.value=false;
    isEditPost.value=true;
    postId.value=key;
    indexOfOrderedPost.value=index
    postName.value = coursePosts.value[postId.value].name;
    videoLink.value = coursePosts.value[postId.value].link;
}

function updatePost(){
    let updatedPost={
        name:'',
        link:''
    }
    coursePosts.value[postId] = updatedPost;
    coursePosts.value[postId.value].name = postName.value;
    coursePosts.value[postId.value].link = videoLink.value;
    isEditCourse.value=true;
    isEditPost.value=false;
    postName.value='';
    videoLink.value='';  
}

function deletePost(key,index){
    console.log(key)
    console.log(index)
    delete coursePosts.value[key];
    orderedPosts.value.splice(index, 1);
}

function editUser(){
    firebaseStore.handleUserList('update');
}
</script>

<template>
    <div>
    <div v-show="!isVerified" class="h-screen flex items-center justify-center flex-col gap-5 w-9/12 m-auto">
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

    <div v-show="isVerified" class="h-full flex flex-col gap-20">
        <div class="flex justify-center gap-20 p-4 text-xl text-[#016646] text-center ">
            <p class="p-3 rounded-lg">{{ name }}</p>
            <p class="p-3 rounded-lg">{{ email }}</p>
            <button @click="signOut()" class="bg-[#016646] text-white px-2 rounded-lg font-bold">Cerrar sesión</button>
        </div>


        <div v-show="showTabs" class="flex  flex-col h-screen gap-10 ">
            <div class="grid grid-cols-2 w-6/12 text-center font-black text-2xl self-center gap-24">
                <p @click="handleTab(1)" :class="tabStyle1">{{ tabText }}</p>
                <p @click="handleTab(2)" :class="tabStyle2">{{ tabText2 }}</p>
            </div>
            
            <div v-show="isTab1" class="w-6/12 self-center grid grid-cols-1 gap-4">
                <button v-show="isAdmin" @click="handleForms('add-course')" class="bg-[#016646] w-2/12 font-bold text-white rounded-lg p-2 cursor-pointer">Añadir curso</button>
                <Courses @editCourse="editCourse($event)"/>
            </div>
            <div v-show="isTab2" class="w-6/12 self-center grid grid-cols-1 gap-4">
                <Users/>
            </div>
        </div>

        <div v-show="showForms">

            <button @click="handleForms('close')" class="bg-[#016646] px-4 font-bold text-white rounded-lg cursor-pointer">X</button>
            
            <div v-show="isEditCourse"  class="bg-white w-6/12 m-auto grid grid-cols-1 p-20 rounded-lg shadow-lg text-center gap-8">
                <button @click="deleteCourse()" class="bg-red-500 py-2 rounded-lg text-white font-bold text-sm w-2/12">Eliminar curso</button>
                    <h4 class="text-xl text-[#016646] font-bold">Editar curso</h4>
                    <form @submit.prevent="onSubmit" class=" grid grid-cols-1 text-center gap-6 justify-items-center" >
                        <input v-model="courseName" type="text" placeholder="Nombre del curso" class="w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                        <input v-model="courseDescription" type="text" placeholder="Descripción" class="w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                        <div class="flex flex-row gap-20 text-lg">
                            <button @click="handleForms('edit-course','cancel')" class="bg-gray-400 py-2 px-4 rounded-lg text-white font-bold">Cancelar</button>
                            <button @click="updateCourse()" class="bg-green-500 py-2 px-4 rounded-lg text-white font-bold">Guardar</button>
                        </div>
                    </form>
                    <div class="w-full flex  justify-center">
                        <h4 class="text-lg text-[#016646] font-bold mt-20 border-[#016646] border-b-2 p-2 w-6/12">Publicaciones</h4>
                    </div>
                    <button v-show="isAdmin" @click="handleForms('create-post')" class="bg-[#016646] w-3/12 font-bold text-white rounded-lg p-2 cursor-pointer">Añadir publicación</button>
                    <div v-for="(post,index) in orderedPosts">
                        <div class="grid grid-cols-1 justify-items-center text-lg text-[#016646] font-bold gap-8 rounded-lg shadow-lg bg-gray-50 p-10">
                            <p>{{ post.name }}</p>
                            <div v-html="post.link"></div>
                            <div class="flex flex-row gap-20 text-lg">
                            <button @click="deletePost(post.id,index)" class="bg-red-600 py-2 px-4 rounded-lg text-white font-bold">Borrar</button>
                            <button @click="editPost(post.id,index)" class="bg-green-500 py-2 px-4 rounded-lg text-white font-bold">Editar</button>
                        </div>
                        </div>
                    </div>
            </div>

            <div v-show="isAddCourse">
                <form @submit.prevent="onSubmit" class="bg-white w-6/12 m-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-8 justify-items-center h-full" >
                    <h2 class="text-[#016646] font-bold text-lg">Crear curso</h2>
                    <input v-model="courseName" type="text" placeholder="Nombre del curso" class="w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <input v-model="courseDescription" type="text" placeholder="Descripción" class="w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                   
                    <div class=" flex flex-row gap-14 mb-40"> 
                        <button @click="handleForms('add-course','cancel')" class="bg-gray-400 py-2 px-4 rounded-lg text-white font-bold">Cancelar</button>
                        <button @click="createCourse()" class="bg-[#016646] w-8/12 font-bold text-white rounded-lg p-2 cursor-pointer">Crear curso</button>
                    </div>
                    
                </form>
            </div>

            
            <div v-show="isCreatePost">
                
                <form @submit.prevent="onSubmit" class="bg-white w-6/12 m-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-8 justify-items-center h-full">
                    <h2 class="text-[#016646] font-bold text-lg">Crear publicación</h2>
                    <input v-model="postName" type="text" placeholder="Título" class="w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <input v-model="videoLink" type="text" placeholder="Enlace" class="w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <div v-html="videoLink" class=""></div>

                    <div class=" flex flex-row gap-14 mb-40">
                        <button @click="handleForms('create-post','cancel')" class="bg-gray-400 py-2 px-4 rounded-lg text-white font-bold">Cancelar</button>
                        <button @click="createPost()" class="bg-[#016646] w-8/12 font-bold text-white rounded-lg p-2 cursor-pointer">Crear publicación</button>
                    </div>
                    
                </form>
            </div>

            <div v-show="isEditPost" >
                <form @submit.prevent="onSubmit" class="bg-white w-6/12 m-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-8 justify-items-center h-full">
                    <h2 class="text-[#016646] font-bold text-lg">Crear publicación</h2>
                    <input v-model="postName" type="text" placeholder="Título" class="w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <input v-model="videoLink" type="text" placeholder="Enlace" class="w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <div v-html="videoLink" class=""></div>

                    <div class=" flex flex-row gap-14 mb-40">
                        <button @click="handleForms('edit-post','cancel')" class="bg-gray-400 py-2 px-4 rounded-lg text-white font-bold">Cancelar</button>
                        <button @click="updatePost()" class="bg-[#016646] w-8/12 font-bold text-white rounded-lg p-2 cursor-pointer">Guardar</button>
                    </div>
                    
                </form>
            </div>

            <div v-show="isEditUser">
                <form @submit.prevent="onSubmit">
                    <p>Nombre</p>
                    <p>Correo</p>
                    <label for="check">Admin</label>
                    <input type="radius" id="check" v-model="giveAdmin" :checked="giveAdmin">
                    <button @click="editUser()">Editar usuario</button>
                    <button @click="handleForms('edit-user','cancel')">Cancelar</button>
                </form>
            </div>

        </div>

    </div>
</div>
</template>