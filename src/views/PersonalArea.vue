<script setup>
import { ref, onBeforeMount, watch} from 'vue';
import { useFirebaseStore } from '../stores/firebaseStore';
import { storeToRefs } from 'pinia';
import Courses from '../components/Courses.vue';
import Users from '../components/Users.vue';
import Documents from '../components/Documents.vue';
import { v4 as uuidv4 } from 'uuid';
import { documentId } from 'firebase/firestore';


const firebaseStore = useFirebaseStore();
const name = storeToRefs(firebaseStore).getName;
const email = storeToRefs(firebaseStore).getEmail;
const isVerified = storeToRefs(firebaseStore).getVerified;
const role = storeToRefs(firebaseStore).getRole;
const courses = storeToRefs(firebaseStore).getCourses;
const documents = storeToRefs(firebaseStore).getDocuments;
const userList = storeToRefs(firebaseStore).getUserList;
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
const isAddDocument = ref(false);
const isEditDocument = ref(false);
const isViewCourse = ref(false);
const isViewUser= ref(false);
const isViewDoc= ref(false);

const courseName = ref('');
const courseDescription = ref('');
const coursePosts = ref({});
const courseId = ref('');
const postId = ref('');
const indexOfOrderedPost=ref();
const orderedPosts = ref([]);
const orderedDocs= ref([]);
const userId = ref('');
const userName = ref('');
const userEmail = ref('');
const userRole = ref('');
const isUserAdmin = ref(false);
const userCoursesId=ref([]);
const userDisplayCourses=ref([]);
const userDocs=ref({});
const docTitle=ref('');
const docText=ref('');
const docId=ref('');


const postName = ref('');
const videoLink = ref('');





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
        firebaseStore.handleUser();
        firebaseStore.handleCourses('read');
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
        case 'view-course':
            if(cancel) {
                isViewCourse.value=false ;
                showForms.value=false; 
                showTabs.value=true;
            }
            else {
                isViewCourse.value=true;
                showTabs.value=false;
                showForms.value=true; 
            }
        break;

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
            if (cancel){
                isEditUser.value=false;
                showTabs.value=true;
                for(let i in Object.entries(courses.value)) {
                    let checkbox=document.querySelector(`#check${i}`);
                    checkbox.checked=false;
                }
                adminCheck.checked=false
                isUserAdmin.value=false;
                firebaseStore.handleUserList('read');
            } 
            else{
                
                isEditUser.value=true;
                showTabs.value=false;
            }
        break;

        case 'view-user':
            if (cancel){
                isViewUser.value=false;
                showTabs.value=true;
            } 
            else{
                isViewUser.value=true;
                showTabs.value=false;
            }
        break;

        case 'add-document':

            if(cancel){
                isAddDocument.value=false;
                isEditUser.value=true;
                docText.value='';
                docTitle.value='';
            }
            else{
                isAddDocument.value=true;
                isEditUser.value=false;
            }

        break;

        case 'edit-document':

            if(cancel){
                isEditDocument.value=false;
                isEditUser.value=true;
                docText.value='';
                docTitle.value='';
            }
            else{
                isEditDocument.value=true;
                isEditUser.value=false;
            }

        break;

        case 'view-document':

            if(cancel){
                isViewDoc.value=false;
                showTabs.value=true;
                docText.value='';
                docTitle.value='';
            }
            else{
                isViewDoc.value=true;
                showTabs.value=false;
            }

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
firebaseStore.handleCourses('read');
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
    coursePosts.value[postId.value   ] = updatedPost;
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

function editUser(key){
    userId.value=key;
    userName.value=userList.value[userId.value].name;
    userEmail.value=userList.value[userId.value].email;
    userCoursesId.value=userList.value[userId.value].coursesId;
    userDocs.value=userList.value[userId.value].documents;
    

    if (userList.value[userId.value].role=='admin') isUserAdmin.value=true
    else isUserAdmin.value=false;

    for (let i in Object.entries(courses.value)) {

        let checkbox=document.querySelector(`#check${i}`);

        for(let j in userCoursesId.value){
            if(checkbox.value==userCoursesId.value[j]){
                checkbox.checked=true;
            }
        }
        if(checkbox.checked)userCoursesId.value.push(checkbox.value);
    }

    orderedDocs.value=[]
    console.log(orderedDocs.value)
    for (let doc in userDocs.value) {    
        orderedDocs.value.push(userDocs.value[doc]); 
    }
    console.log(orderedDocs.value)
    orderedDocs.value.sort((a, b) => a.creationDate - b.creationDate);

    handleForms('edit-user')
}

function updateUser(){
    let adminCheck= document.querySelector('#adminCheck');
    let updatedRole;
    let creationDate= userList.value[userId.value].creationDate;
    let newCoursesId =[];
    console.log(userId.value)

    adminCheck.checked ? updatedRole='admin' : updatedRole='user';

    for (let i in Object.entries(courses.value)) {
        let checkbox=document.querySelector(`#check${i}`);
        if(checkbox.checked)newCoursesId.push(checkbox.value);
    }
    userCoursesId.value=newCoursesId;
    firebaseStore.handleUserList('update', userName.value, userEmail.value, updatedRole, userDocs.value ,userCoursesId.value,userId.value,creationDate)
    userCoursesId.value=[];
    userDocs.value={};
    userDocs.value={};


    for(let i in Object.entries(courses.value)) {
        let checkbox=document.querySelector(`#check${i}`);
        checkbox.checked=false;
    }
    adminCheck.checked=false
    isUserAdmin.value=false;
    showTabs.value=true;
    isEditUser.value=false;
    firebaseStore.handleUserList('read');
}

function addDocument(){
    let uuid = uuidv4();
    let newDoc={
        title:'',
        text:'',
        Date:Date.now(),
        id:uuid
    }
    
    userDocs.value[uuid]=newDoc;
    userDocs.value[uuid].title=docTitle.value;
    userDocs.value[uuid].text=docText.value;

    orderedDocs.value.push(userDocs.value[uuid]);

    docTitle.value='';
    docText.value='';
    isAddDocument.value=false;
    isEditUser.value=true;
}

function editDocument(key,index){
    docId.value = key;
    docTitle.value = userDocs.value[docId.value].title;
    docText.value = userDocs.value[docId.value].text;
    
    handleForms('edit-document');
}

function updateDocument(){
    console.log(userDocs.value[docId.value])
    userDocs.value[docId.value].title = docTitle.value;
    userDocs.value[docId.value].text = docText.value;
    
    isEditDocument.value=false;
    isEditUser.value=true;
    firebaseStore.handleUserList('read');
}

function deleteDocument(key,index){
    console.log(userDocs.value)
    delete userDocs.value[key];
    console.log(userDocs.value)
    orderedDocs.value.splice(index, 1);
}

function viewCourse(key){
    courseId.value=key;
    courseName.value = courses.value[courseId.value].name;
    courseDescription.value = courses.value[courseId.value].description;
    coursePosts.value = courses.value[courseId.value].posts;
    
    orderedPosts.value=[]
    for (let post in coursePosts.value) {    
        orderedPosts.value.push(coursePosts.value[post]);
    }

    orderedPosts.value.sort((a, b) => a.creationDate - b.creationDate);


    handleForms('view-course')
}

function viewUser(key){
    userDisplayCourses.value=[]
    userId.value=key;
    userName.value=userList.value[userId.value].name;
    userEmail.value=userList.value[userId.value].email;
    userCoursesId.value=userList.value[userId.value].coursesId;
    userDocs.value=userList.value[userId.value].documents;
    userRole.value=userList.value[userId.value].role;
    
    for(let i in userCoursesId.value){
        if(userCoursesId.value[i] in courses.value){
            userDisplayCourses.value.push(courses.value[userCoursesId.value[i]].name)
        }
    }

    orderedDocs.value=[]
    for (let doc in userDocs.value) {    
        orderedDocs.value.push(userDocs.value[doc]); 
    }
    orderedDocs.value.sort((a, b) => a.creationDate - b.creationDate);
    handleForms('view-user')
}

function viewDoc(key){
    
    docId.value = key;
    docTitle.value = documents.value[docId.value].title;
    docText.value = documents.value[docId.value].text;
    
    handleForms('view-document');
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
                <Courses @editCourse="editCourse($event)" @viewCourse="viewCourse($event)"/>
            </div>
            <div v-show="isTab2" class="w-6/12 self-center grid grid-cols-1 gap-4">
                <Users @editUser="editUser($event)" @viewUser="viewUser($event)"/>
                <Documents @viewDoc="viewDoc($event)"/>
            </div>
        </div>

        <div v-show="showForms">

            <button @click="handleForms('close')" class="bg-[#016646] px-4 font-bold text-white rounded-lg cursor-pointer">X</button>

            <div v-show="isViewCourse"  class="bg-white w-6/12 m-auto grid grid-cols-1 p-20 rounded-lg shadow-lg text-center gap-8">
                
            <button @click="handleForms('view-course','cancel')" class="bg-[#016646] px-4 font-bold text-white rounded-lg cursor-pointer w-1/12">X</button>
                    <div  class=" grid grid-cols-1 text-center gap-6 justify-items-center" >
                        <h4 class="text-xl text-[#016646] font-bold">{{ courseName }}</h4>
                        <p>{{ courseDescription }}</p>
                    </div>
                    <div class="w-full flex  justify-center">
                        <h4 class="text-lg text-[#016646] font-bold mt-20 border-[#016646] border-b-2 p-2 w-6/12">Publicaciones</h4>
                    </div>
                    <div v-for="(post) in orderedPosts">
                        <div class="grid grid-cols-1 justify-items-center text-lg text-[#016646] font-bold gap-8 rounded-lg shadow-lg bg-gray-50 p-10">
                            <p>{{ post.name }}</p>
                            <div v-html="post.link"></div>
                        </div>
                    </div>
            </div>

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

            <div v-show="isViewUser">
                <div  class="bg-white w-6/12 m-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-10 justify-items-center">
                    <button @click="handleForms('view-user','cancel')" class="bg-[#016646] px-4 font-bold text-white rounded-lg cursor-pointer w-1/12">X</button>
                    <div class="flex flex-col text-xl gap-5 text-[#016646]">
                        <p>{{userName}}</p>
                        <p>{{userEmail}}</p>
                        <p>{{userRole}}</p>
                    </div>        

                    <div class="grid grid-cols-1 gap-5">
                        <p class="text-2xl text-[#016646]">Cursos</p>
                            <div>
                                <div v-for="course in userDisplayCourses" id="checkboxes" class="flex flex-row gap-2 text-lg text-[#016646]">
                                    <p for="check">{{ course }}</p>
                                </div>
                            </div>
                        </div>
                        <p class="text-2xl text-[#016646]">Documentos</p>
                        <div v-for="(doc) in orderedDocs">
                            <div class="grid grid-cols-1 justify-items-center text-lg text-[#016646] gap-8 rounded-lg shadow-lg bg-gray-50 p-10">
                                <p class=" font-bold">{{ doc.title }}</p>
                                <p class="font-lg">{{ doc.text }}</p>
                            </div>
                        </div>
                </div>
            </div>

            <div v-show="isEditUser">
                <form @submit.prevent="onSubmit" class="bg-white w-6/12 m-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-10 justify-items-center">
                    
                    <div class="flex flex-col text-xl gap-5 text-[#016646]">
                        <p>{{userName}}</p>
                        <p>{{userEmail}}</p>
                    </div>
                    
                    <div class="flex flex-row gap-2 text-lg text-[#016646]">
                        <input type="checkbox" id="adminCheck" :checked="isUserAdmin" value="admin">
                        <label for="adminCheck">Admin</label>
                    </div>

                    <div class=" flex flex-row gap-14 mb-10">
                        <button @click="handleForms('edit-user','cancel')" class="bg-gray-400 py-2 px-4 rounded-lg text-white font-bold">Cancelar</button>
                        <button @click="updateUser()" class="bg-[#016646] w-8/12 font-bold text-white rounded-lg p-2 cursor-pointer">Guardar</button>
                    </div>
                    
                    <div class="grid grid-cols-1 gap-5">
                        <p class="text-2xl text-[#016646]">Cursos</p>
                            <div>
                                <div v-for="(course,key,index) in courses" id="checkboxes" class="flex flex-row gap-2 text-lg text-[#016646]">
                                    <input type="checkbox" :id="'check'+index" :value="key">
                                    <label for="check">{{ course.name }}</label>
                                </div>
                            </div>
                        </div>
                        <p class="text-2xl text-[#016646]">Documentos</p>
                        <button v-show="isAdmin" @click="handleForms('add-document')" class="bg-[#016646] w-3/12 font-bold text-white rounded-lg p-2 cursor-pointer">Añadir documento</button>
                        <div v-for="(doc,key,index) in orderedDocs">
                            <div class="grid grid-cols-1 justify-items-center text-lg text-[#016646] gap-8 rounded-lg shadow-lg bg-gray-50 p-10">
                                <p class=" font-bold">{{ doc.title }}</p>
                                <p class="font-lg">{{ doc.text }}</p>
                                <div class="flex flex-row gap-20 text-lg">
                                    <button @click="deleteDocument(doc.id,index)" class="bg-red-600 py-2 px-4 rounded-lg text-white font-bold">Borrar</button>
                                    <button @click="editDocument(doc.id,index)" class="bg-green-500 py-2 px-4 rounded-lg text-white font-bold">Editar</button>
                                </div>
                            </div>
                        </div>
                    </form>
            </div>

            <div v-show="isAddDocument">
                <form @submit.prevent="onSubmit" class="bg-white w-6/12 m-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-8 justify-items-center h-full" >
                    <h2 class="text-[#016646] font-bold text-lg">Añadir documento</h2>
                    <input v-model="docTitle" type="text" placeholder="Título" class="w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <textarea v-model="docText" placeholder="Texto" class="w-6/12 border-4 border-[#016646] p-2 rounded-lg h-8/12" >{{ docText }}</textarea>
                    <div class=" flex flex-row gap-14 mb-40"> 
                        <button @click="handleForms('add-document','cancel')" class="bg-gray-400 py-2 px-4 rounded-lg text-white font-bold">Cancelar</button>
                        <button @click="addDocument()" class="bg-[#016646] w-8/12 font-bold text-white rounded-lg p-2 cursor-pointer">Guardar</button>
                    </div>
                </form>
                
            </div>

            <div v-show="isEditDocument">
                <form @submit.prevent="onSubmit" class="bg-white w-6/12 m-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-8 justify-items-center h-full" >
                    <h2 class="text-[#016646] font-bold text-lg">Añadir documento</h2>
                    <input v-model="docTitle" type="text" placeholder="Título" class="w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <textarea v-model="docText" placeholder="Texto" class="w-6/12 border-4 border-[#016646] p-2 rounded-lg h-8/12" >{{ docText }}</textarea>
                    <div class=" flex flex-row gap-14 mb-40"> 
                        <button @click="handleForms('add-document','cancel')" class="bg-gray-400 py-2 px-4 rounded-lg text-white font-bold">Cancelar</button>
                        <button @click="updateDocument()" class="bg-[#016646] w-8/12 font-bold text-white rounded-lg p-2 cursor-pointer">Guardar</button>
                    </div>
                </form>
                
            </div>

            <div v-show="isViewDoc">
                <div  class="bg-white w-6/12 m-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-8 justify-items-center h-full" >
                    <button @click="handleForms('view-document','cancel')" class="bg-[#016646] px-4 font-bold text-white rounded-lg cursor-pointer w-1/12">X</button>
                    <h2 class="text-[#016646] font-bold text-lg">Ver Documento</h2>
                    <p class="w-6/12  p-2 rounded-lg">{{ docTitle }}</p>
                    <p class="w-6/12  p-2 rounded-lg">{{ docText }}</p>
                </div>
            </div>
        </div>

    </div>
</div>
</template>