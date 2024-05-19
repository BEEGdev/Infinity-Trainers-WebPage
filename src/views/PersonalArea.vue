<script setup>
import { ref, onBeforeMount, watch} from 'vue';
import { useFirebaseStore } from '../stores/firebaseStore';
import { storeToRefs } from 'pinia';
import Courses from '../components/Courses.vue';
import Users from '../components/Users.vue';
import Documents from '../components/Documents.vue';
import { v4 as uuidv4 } from 'uuid';
import { documentId } from 'firebase/firestore';


const firebaseStore = useFirebaseStore();//lamada a la store

//getter de la store
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

//variables reacitvas para manejo de la visibilidad
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

//variables reactivas para trabajar con los datos en front, rellenado de formularios de edición , creación de listas etc.
const courseName = ref('');//variables para cursos
const courseDescription = ref('');
const coursePosts = ref({});
const courseId = ref('');


const postId = ref(''); //variables para posts
const postName = ref('');
const indexOfOrderedPost=ref();
const orderedPosts = ref([]);
const videoLink = ref('');
const embedInput=ref('');


const orderedDocs= ref([]);//variables para docs
const userDocs=ref({});
const docTitle=ref('');
const docText=ref('');
const docId=ref('');


const userId = ref(''); //variables para users
const userName = ref('');
const userEmail = ref('');
const userRole = ref('');
const isUserAdmin = ref(false);
const userCoursesId=ref([]);
const userDisplayCourses=ref([]);


function handleTab(tab) { //función para cambiar entre tab1 y tab2

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

watch(role, (newRole) => { //función que detecta el rol y actúa en consecuencia
    if(newRole=='admin'){
        tabText.value = 'Cursos';//cambia texto de tabs
        tabText2.value = 'Usuarios';
        firebaseStore.handleCourses('read'); //trae cursos
        firebaseStore.handleUserList('read');//trae lista de usuarios
        isAdmin.value=true; 
    }

    if(newRole=='user'){
        tabText.value = 'Mis cursos';
        tabText2.value = 'Mis documentos';
        firebaseStore.handleUser(); //trae el usuario
        firebaseStore.handleCourses('read');//trae cursos
        isAdmin.value=false;
    } 

})

watch(embedInput, (newEmbed) => { //elimina los estilos por defecto del embed de youtube para hacerlo responsive
let styleLess
let styleLess2
styleLess=newEmbed.replace('width="560" height="315"','')
styleLess2=styleLess.replace('style="position: absolute; top: -100px; width: 1px; height: 1px;"','class="w-inherit h-inherit aspect-video"')
videoLink.value=styleLess2
})

onBeforeMount(() => {
    firebaseStore.modifyState('user.role',''); //fuerzo el cambio de rol antes de comprobar el rol del usuario para que se hagan las llamadas de lectura en el watcher
    firebaseStore.checkStatus(); //compruebo su estado de login
    firebaseStore.handleNavigationAccess(); //si no está logged redirección a /login
})


function verificationReCheck(){ //reload del auth para comprobar que el usuario ha verificado su identidad
    firebaseStore.checkStatus(true);
    if(isVerified)getCourses();
}

function signOut(){ //cierre de sesión
    firebaseStore.signOut();
    firebaseStore.checkStatus(); 
    
}


function handleForms(operation,cancel){ //función maestra de visibilidad de formularios 
    //(en ocasiones también hay alguna operación adicional necesaria, por ejemplo vaciado de variables o refresco de datos)
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
    }
}

function editCourse(emitValue){ //función de edición, llamada por el componente courses
    courseId.value=emitValue; //id del curso (emitido)
    courseName.value = courses.value[courseId.value].name; //rellenado de variables para el formulario
    courseDescription.value = courses.value[courseId.value].description;
    coursePosts.value = courses.value[courseId.value].posts;
    
    orderedPosts.value=[] //vaciado del array de posts
    for (let post in coursePosts.value) {    
        orderedPosts.value.push(coursePosts.value[post]); //rellenado del array
    }

    orderedPosts.value.sort((a, b) => a.creationDate - b.creationDate); //ordenación por propiedad date

    handleForms('edit-course') //formulario se hace visible
}


function createCourse(){ //función de añadir curso

    firebaseStore.handleCourses('write',null,courseName.value,courseDescription.value,null); //se añade un curso
    courseName.value=''; //vaciado de variables
    courseDescription.value='';
    isAddCourse.value=false;
    showTabs.value=true;
    firebaseStore.handleCourses('read');//refresco de datos
}

function updateCourse(){//función de actualizar curso

    firebaseStore.handleCourses('update',courseId.value,courseName.value,courseDescription.value,coursePosts.value); //se actualiza
    isEditCourse.value=false; //se cierra la edición de curso
    showTabs.value=true;    //se muestran los tabs
    firebaseStore.handleCourses('read'); //refresco de datos
}

function deleteCourse(){ //función de borrado de curso

firebaseStore.handleCourses('delete',courseId.value); // Borrado de curso
isEditCourse.value=false; //se cierra edición de curso
showTabs.value=true;    //se muestran los tabs
firebaseStore.handleCourses('read'); //refresco de datos
}

function createPost(){ //función de creación de post
    let newPost={ //objeto de post vacío con fecha now()
        name:'',
        link:'',
        id:'',
        creationDate:Date.now()
    }
    let postId = uuidv4(); //generación de id

    coursePosts.value[postId]=newPost; //se añade al objeto
    coursePosts.value[postId].name = postName.value; //se rellena el objeto
    coursePosts.value[postId].link = videoLink.value;
    coursePosts.value[postId].id = postId;


    orderedPosts.value.push(coursePosts.value[postId]); //se añade el objeto rellenado al array de front

    isEditCourse.value=true; //Se muestra edición de curso
    isCreatePost.value=false; //Se oculta creación de post
    postName.value=''; //vaciado de variables
    videoLink.value='';
    embedInput.value='';
    newPost={ //vaciado de objeto
    }
}

function editPost(key,index){ //funcion de editar publicación
    isEditCourse.value=false; //se oculta edición de curso
    isEditPost.value=true;  //se muestra edición de publicación
    postId.value=key;
    indexOfOrderedPost.value=index
    postName.value = coursePosts.value[postId.value].name; //rellenado de variables para edición
    videoLink.value = coursePosts.value[postId.value].link;
}

function updatePost(){ //función de actualizar post
    let updatedPost={ //declaración de objeto vacío
        name:'',
        link:''
    }
    coursePosts.value[postId.value] = updatedPost; //se añade al array
    coursePosts.value[postId.value].name = postName.value; //se rellena el objeto
    coursePosts.value[postId.value].link = videoLink.value;
    isEditCourse.value=true; //Se muestra edición de curso
    isEditPost.value=false;//se oculta edición de publicación
    postName.value=''; //vaciado de variables
    videoLink.value='';  
    embedInput.value='';
}

function deletePost(key,index){ //función de borrado de post
    delete coursePosts.value[key]; //borrado del objeto de cursos
    orderedPosts.value.splice(index, 1); //borrado del array de front
} 

function editUser(key){ //Función de edición de usuario(emit)
    userId.value=key;
    userName.value=userList.value[userId.value].name; //rellenado de variables
    userEmail.value=userList.value[userId.value].email;
    userCoursesId.value=userList.value[userId.value].coursesId;
    userDocs.value=userList.value[userId.value].documents;
    

    if (userList.value[userId.value].role=='admin') isUserAdmin.value=true; //marcar el check de admin si es admin
    else isUserAdmin.value=false;

    for (let i in Object.entries(courses.value)) { //mostrar lista de cursos y marcar aquellos que el usuario tenga añadidos a su lista

        let checkbox=document.querySelector(`#check${i}`);

        for(let j in userCoursesId.value){
            if(checkbox.value==userCoursesId.value[j]){
                checkbox.checked=true;
            }
        }
        if(checkbox.checked)userCoursesId.value.push(checkbox.value);
    }

    orderedDocs.value=[] //vaciado de array de docs
    for (let doc in userDocs.value) { 
        orderedDocs.value.push(userDocs.value[doc]); //rellenado de array de docs
    }
    orderedDocs.value.sort((a, b) => a.creationDate - b.creationDate);//ordenación de los docs por fecha de creación

    handleForms('edit-user') //se muestra edit user
}

function updateUser(){ //función de actualización de usuario
    let adminCheck= document.querySelector('#adminCheck'); //selección de check de admin
    let updatedRole; //variable para el rol nuevo
    let creationDate= userList.value[userId.value].creationDate; //selección de fecha de creación del usuario
    let newCoursesId =[];  //creaciónd de array vacío

    adminCheck.checked ? updatedRole='admin' : updatedRole='user'; //asignar nuevo rol

    for (let i in Object.entries(courses.value)) { //rellenar el nuevo array de id de cursos
        let checkbox=document.querySelector(`#check${i}`);
        if(checkbox.checked)newCoursesId.push(checkbox.value);
    }
    userCoursesId.value=newCoursesId; //actualizar el array con el nuevo valor
    firebaseStore.handleUserList('update', userName.value, userEmail.value, updatedRole, userDocs.value ,userCoursesId.value,userId.value,creationDate)
    userCoursesId.value=[]; //vaciado de variables
    userDocs.value={};
    userDocs.value={};


    for(let i in Object.entries(courses.value)) { //desmarcado de checkboxes
        let checkbox=document.querySelector(`#check${i}`);
        checkbox.checked=false;
    }
    adminCheck.checked=false //reseteo de variables
    isUserAdmin.value=false;
    showTabs.value=true; //mostrar tabs
    isEditUser.value=false; //ocultar edición de user
    firebaseStore.handleUserList('read'); //refresco de datos
}

function addDocument(){ //función de añadir documento
    let uuid = uuidv4(); //generación de id
    let newDoc={ //doc vacío con fecha now()
        title:'',
        text:'',
        Date:Date.now(),
        id:uuid
    }
    
    userDocs.value[uuid]=newDoc;//se añade al objeto de docs
    userDocs.value[uuid].title=docTitle.value; //se rellena
    userDocs.value[uuid].text=docText.value;

    orderedDocs.value.push(userDocs.value[uuid]); //se añade al array de docs

    docTitle.value=''; //vaciado de varibles
    docText.value='';
    isAddDocument.value=false; //se oculta añadir docmento
    isEditUser.value=true; //se muestra edit user
}

function editDocument(key){ //función para editar documento
    docId.value = key;
    docTitle.value = userDocs.value[docId.value].title; //rellenado de formulario
    docText.value = userDocs.value[docId.value].text;
    
    handleForms('edit-document'); //se muestra edit doc
}

function updateDocument(){ //función para actualizar el documento
    userDocs.value[docId.value].title = docTitle.value; //se actualizan los valores
    userDocs.value[docId.value].text = docText.value;
    
    isEditDocument.value=false; //se oculta editar doc
    isEditUser.value=true; //se muestra editar user
}

function deleteDocument(key,index){ //función para borrar documento
    delete userDocs.value[key]; //se borra del objeto
    orderedDocs.value.splice(index, 1);  //se borra del array
}

function viewCourse(key){ //función para ver el curso (emit)
    courseId.value=key;
    courseName.value = courses.value[courseId.value].name; //rellenado de variables
    courseDescription.value = courses.value[courseId.value].description;
    coursePosts.value = courses.value[courseId.value].posts;
    
    orderedPosts.value=[] //vaciado de publicaciones
    for (let post in coursePosts.value) { //rellenado de publicaciones
        orderedPosts.value.push(coursePosts.value[post]); 
    }

    orderedPosts.value.sort((a, b) => a.creationDate - b.creationDate); //ordenado de publicaciones


    handleForms('view-course')
}

function viewUser(key){ //función para ver el user (emit)
    userDisplayCourses.value=[]//vaciado de array de cursos
    userId.value=key;
    userName.value=userList.value[userId.value].name;//rellenado de variables
    userEmail.value=userList.value[userId.value].email;
    userCoursesId.value=userList.value[userId.value].coursesId;
    userDocs.value=userList.value[userId.value].documents;
    userRole.value=userList.value[userId.value].role;
    
    for(let i in userCoursesId.value){
        if(userCoursesId.value[i] in courses.value){//rellenado de array de cursos
            userDisplayCourses.value.push(courses.value[userCoursesId.value[i]].name)
        }
    }

    orderedDocs.value=[] //vaciado de array de docs
    for (let doc in userDocs.value) {    
        orderedDocs.value.push(userDocs.value[doc]); //rellenado de array de docs
    }
    orderedDocs.value.sort((a, b) => a.creationDate - b.creationDate); //ordenación de docs
    handleForms('view-user')
}

function viewDoc(key){ //función para ver el doc (emit)
    
    docId.value = key;
    docTitle.value = documents.value[docId.value].title; //rellenado de variables
    docText.value = documents.value[docId.value].text;
    
    handleForms('view-document'); //se muestra el doc
}

</script>

<template>
    <div>
    <!-- Si el user no esta verificado ve esta pantalla -->
    <div v-show="!isVerified" class="h-screen flex items-center justify-center flex-col gap-5 w-9/12 m-auto">
        <button @click="signOut()" class="bg-[#016646] hover:bg-white hover:text-[#016646] text-white px-2 rounded-lg font-bold">Cerrar sesión</button>
        <div class="flex justify-center items-center flex-col gap-5">
            <p>¡Hola <span class="text-[#016646] font-semibold">{{ name }}</span>!</p>
            <p>Para acceder debes verificar tu identidad a través del correo que hemos enviado a <span class="text-[#016646] font-semibold"> {{ email }}</span></p>
        </div>
        <div class="flex justify-center items-center flex-col gap-5">
            <p>Pulsa este botón cuando hayas completado la verificación en tu correo</p>
            <button @click="verificationReCheck()" class="bg-[#016646] hover:bg-white hover:text-[#016646] text-white p-2 rounded-lg font-bold">Comprobar verificación</button>
        </div>
        
        <div class="flex justify-center items-center flex-col gap-5">
            <p>¿No has recibido tu correo o el enlace ha caducado?</p>
            <button @click="firebaseStore.resendVerificationEmail()" class="bg-[#016646] hover:bg-white hover:text-[#016646] text-white p-2 rounded-lg font-bold">Reenviar correo de verificación</button>
        </div>
    </div>

    <!-- Si está verificado ve esta pantalla -->
    <div v-show="isVerified" class="h-full flex flex-col gap-20">
        <div class="flex flex-col md:flex-row justify-center md:gap-20 p-4 text-xl text-[#016646] text-center items-center">
            <p class="p-3 rounded-lg">{{ name }}</p>
            <p class="p-3 rounded-lg">{{ email }}</p>
            <button @click="signOut()" class="bg-[#016646] hover:bg-white hover:text-[#016646] text-white px-2 md:px-0 rounded-lg font-bold  w-5/12 md:w-3/12 lg:w-2/12 py-2 text-sm md:text-lg">Cerrar sesión</button>
        </div>

        <!-- Tabs -->
        <div v-show="showTabs" class="flex flex-col h-screen gap-10">
            <div class="grid grid-cols-2 w-11/12 md:w-6/12 text-center font-black text-lg self-center gap-24 place">
                <p @click="handleTab(1)" :class="tabStyle1" class="h-full">{{ tabText }}</p>
                <p @click="handleTab(2)" :class="tabStyle2" class="h-full">{{ tabText2 }}</p>
            </div>
            
            <div v-show="isTab1" class="w-11/12 md:w-6/12 self-center grid grid-cols-1 gap-4">
                <button v-show="isAdmin" @click="handleForms('add-course')" class="bg-[#016646] w-6/12 md:w-4/12 font-bold text-white rounded-lg p-2 cursor-pointer">Añadir curso</button>
                <Courses @editCourse="editCourse($event)" @viewCourse="viewCourse($event)"/>
            </div>
            <div v-show="isTab2" class="w-11/12 md:w-6/12 self-center grid grid-cols-1 gap-4">
                <Users @editUser="editUser($event)" @viewUser="viewUser($event)"/>
                <Documents @viewDoc="viewDoc($event)"/>
            </div>
        </div>

        <!-- Formularios -->
        <div v-show="showForms">
            
<!-- Ver curso -->
            <div v-show="isViewCourse"  class="bg-white w-11/12 lg:w-9/12 xl:8/12 mx-auto grid grid-cols-1 p-2 md:p-20 rounded-lg shadow-lg text-center gap-8">
            <button @click="handleForms('view-course','cancel')" class="bg-[#016646] hover:bg-white hover:text-[#016646] px-4 font-bold text-white rounded-lg cursor-pointer w-8/12 sm:w-3/12 md:w-5/12 lg:w-4/12 justify-self-center">Cerrar</button>
                    <div  class=" grid grid-cols-1 text-center gap-6 justify-items-center" >
                        <h4 class="text-xl text-[#016646] font-bold">{{ courseName }}</h4>
                        <p>{{ courseDescription }}</p>
                    </div>
                    <div class="w-full flex justify-center">
                        <h4 class="text-lg text-[#016646] font-bold mt-20 border-[#016646] border-b-2 p-2 w-6/12">Publicaciones</h4>
                    </div>
                    <div v-for="(post) in orderedPosts" class="w-full lg:w-8/12 mx-auto items-center">
                        <div class="grid grid-cols-1 justify-items-center text-lg text-[#016646] font-bold gap-8 rounded-lg shadow-lg bg-gray-50 p-10 w-full lg:w-10/12 mx-auto">
                            <p>{{ post.name }}</p>
                                <div v-html="post.link" class="aspect-video"></div>
                        </div>
                    </div>
            </div>

<!-- Editar curso -->
            <div v-show="isEditCourse"  class="bg-white w-11/12 lg:w-9/12 xl:8/12 m-auto grid grid-cols-1 md:p-20 rounded-lg shadow-lg text-center gap-8">
                <button @click="deleteCourse()" class="bg-red-500 hover:bg-white hover:text-red-500 py-2 rounded-lg text-white font-bold text-sm w-10/12 sm:w-4/12 md:w-3/12 mx-auto">Eliminar curso</button>
                    <h4 class="text-xl text-[#016646] font-bold">Editar curso</h4>
                    <form @submit.prevent="onSubmit" class=" grid grid-cols-1 text-center gap-6 justify-items-center items-center" >
                        <input v-model="courseName" type="text" placeholder="Nombre del curso" class="w-11/12 md:w-8/12 border-4 border-[#016646] p-2 rounded-lg">
                        <input v-model="courseDescription" type="text" placeholder="Descripción" class="w-11/12 md:w-8/12 border-4 border-[#016646] p-2 rounded-lg">
                        <div class="flex flex-row gap-10 sm:gap-20 text-lg w-full lg:w-8/12 place-content-center">
                            <button @click="handleForms('edit-course','cancel')" class="bg-gray-400 hover:bg-white hover:text-gray-400 py-2 px-4 rounded-lg text-white font-bold">Cancelar</button>
                            <button @click="updateCourse()" class="bg-green-500 hover:bg-white hover:text-green-500 py-2 px-4 rounded-lg text-white font-bold">Guardar</button>
                        </div>
                    </form>
                    <div class="w-full flex  justify-center">
                        <h4 class="text-lg text-[#016646] font-bold mt-20 border-[#016646] border-b-2 p-2 w-6/12">Publicaciones</h4>
                    </div>
                    <button v-show="isAdmin" @click="handleForms('create-post')" class="bg-[#016646] hover:bg-white hover:text-[#016646] w-8/12 md:w-3/12 font-bold text-white rounded-lg p-2 cursor-pointer mx-auto mb-5">Añadir publicación</button>
                    <div v-for="(post,index) in orderedPosts" class="w-full lg:w-8/12 mx-auto items-center">
                        <div class="grid grid-cols-1 justify-items-center text-lg text-[#016646] font-bold gap-8 rounded-lg shadow-lg bg-gray-50 p-10 w-full lg:w-10/12 mx-auto">
                            <p>{{ post.name }}</p>
                            <div v-html="post.link"></div>
                            <div class="flex flex-row gap-20 text-lg">
                            <button @click="deletePost(post.id,index)" class="bg-red-600 hover:bg-white hover:text-red-600 py-2 px-4 rounded-lg text-white font-bold">Borrar</button>
                            <button @click="editPost(post.id,index)" class="bg-green-500 hover:bg-white hover:text-red-500 py-2 px-4 rounded-lg text-white font-bold">Editar</button>
                        </div>
                        </div>
                    </div>
            </div>
<!-- Añadir curso -->
            <div v-show="isAddCourse">
                <form @submit.prevent="onSubmit" class="bg-white md:w-8/12 lg:w-6/12 sm:m-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-8 justify-items-center h-full" >
                    <h2 class="text-[#016646] font-bold text-lg">Crear curso</h2>
                    <input v-model="courseName" type="text" placeholder="Nombre del curso" class="w-11/12 md:w-8/12 lg:w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <input v-model="courseDescription" type="text" placeholder="Descripción" class="w-11/12 md:w-8/12 lg:w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <div class=" flex flex-row gap-14 mb-40"> 
                        <button @click="handleForms('add-course','cancel')" class="bg-gray-400 hover:bg-white hover:text-gray-400 py-2 px-4 rounded-lg text-white font-bold">Cancelar</button>
                        <button @click="createCourse()" class="bg-[#016646] hover:bg-white hover:text-[#016646] w-8/12 font-bold text-white rounded-lg p-2 cursor-pointer">Crear curso</button>
                    </div>
                    
                </form>
            </div>

<!-- Crear Post -->            
            <div v-show="isCreatePost">
                
                <form @submit.prevent="onSubmit" class="bg-white md:w-8/12 lg:w-6/12 sm:m-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-8 justify-items-center h-full">
                    <h2 class="text-[#016646] font-bold text-lg">Crear publicación</h2>
                    <input v-model="postName" type="text" placeholder="Título" class="w-11/12 md:w-8/12 lg:w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <input v-model="embedInput" type="text" placeholder="Enlace" class="w-11/12 md:w-8/12 lg:w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <div v-html="videoLink" class=""></div>

                    <div class=" flex flex-row gap-14 mb-40">
                        <button @click="handleForms('create-post','cancel')" class="bg-gray-400 hover:bg-white hover:text-gray-400 py-2 px-4 rounded-lg text-white font-bold">Cancelar</button>
                        <button @click="createPost()" class="bg-[#016646] hover:bg-white hover:text-[#016646] w-8/12 font-bold text-white rounded-lg p-2 cursor-pointer">Crear publicación</button>
                    </div>
                    
                </form>
            </div>

<!-- Ver Post -->            
            <div v-show="isEditPost" >
                <form @submit.prevent="onSubmit" class="bg-white md:w-8/12 lg:w-6/12 sm:m-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-8 justify-items-center h-full">
                    <h2 class="text-[#016646] font-bold text-lg">Crear publicación</h2>
                    <input v-model="postName" type="text" placeholder="Título" class="w-11/12 md:w-8/12 lg:w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <input v-model="videoLink" type="text" placeholder="Enlace" class="w-11/12 md:w-8/12 lg:w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <div v-html="videoLink" class=""></div>

                    <div class=" flex flex-row gap-14 mb-40">
                        <button @click="handleForms('edit-post','cancel')" class="bg-gray-400 hover:bg-white hover:text-gray-400 py-2 px-4 rounded-lg text-white font-bold">Cancelar</button>
                        <button @click="updatePost()" class="bg-[#016646] hover:bg-white hover:text-[#016646] w-8/12 font-bold text-white rounded-lg p-2 cursor-pointer">Guardar</button>
                    </div>
                    
                </form>
            </div>

<!-- Ver User -->            
            <div v-show="isViewUser">
                <div  class=" bg-white w-11/12 lg:w-9/12 xl:8/12 mx-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-10 justify-items-center">
                    <button @click="handleForms('view-user','cancel')" class="bg-[#016646] hover:bg-white hover:text-[#016646] px-2 font-bold text-white rounded-lg cursor-pointer w-6/12 sm:w-3/12 md:w-2/12 xl:w-1/12 text-center">Cerrar</button>
                    <div class="flex flex-col text-xl gap-5 text-[#016646]">
                        <p>{{userName}}</p>
                        <p>{{userEmail}}</p>
                        <p>{{userRole}}</p>
                    </div>        

                    <div class="grid grid-cols-1 gap-5">
                        <p class="text-2xl text-[#016646] font-bold">Cursos</p>
                            <div>
                                <div v-for="course in userDisplayCourses" id="checkboxes" class="flex flex-row gap-2 text-lg text-[#016646]">
                                    <p for="check">{{ course }}</p>
                                </div>
                            </div>
                        </div>
                        <p class="text-2xl text-[#016646] font-bold">Documentos</p>
                        <div v-for="(doc) in orderedDocs" class="mx-auto items-center w-11/12 md:w-9/12">
                            <div class="grid grid-cols-1 justify-items-center text-lg text-[#016646] gap-8 rounded-lg shadow-lg bg-gray-50 p-10 w-full ">
                                <p class=" font-bold">{{ doc.title }}</p>
                                <p class="font-lg">{{ doc.text }}</p>
                            </div>
                        </div>
                </div>
            </div>

<!-- Editar user -->
            <div v-show="isEditUser">
                <form @submit.prevent="onSubmit" class="bg-white w-11/12 lg:w-9/12 xl:8/12 mx-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-10 justify-items-center">
                    
                    <div class="flex flex-col text-xl gap-5 text-[#016646]">
                        <p>{{userName}}</p>
                        <p>{{userEmail}}</p>
                    </div>
                    
                    <div class="flex flex-row gap-2 text-lg text-[#016646]">
                        <input type="checkbox" id="adminCheck" :checked="isUserAdmin" value="admin">
                        <label for="adminCheck">Admin</label>
                    </div>

                    <div class=" flex flex-row gap-14 mb-10">
                        <button @click="handleForms('edit-user','cancel')" class="bg-gray-400 hover:bg-white hover:text-gray-400 py-2 px-4 rounded-lg text-white font-bold">Cancelar</button>
                        <button @click="updateUser()" class="bg-[#016646] hover:bg-white hover:text-[#016646] w-8/12 font-bold text-white rounded-lg p-2 cursor-pointer">Guardar</button>
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
                        <button v-show="isAdmin" @click="handleForms('add-document')" class="bg-[#016646] hover:bg-white hover:text-[#016646] w-10/12 sm:w-3/12 font-bold text-white rounded-lg p-2 cursor-pointer">Añadir documento</button>
                        <div v-for="(doc,key,index) in orderedDocs" class="w-full lg:w-8/12 mx-auto ">
                            <div class="grid grid-cols-1 justify-items-center text-lg text-[#016646] gap-8 rounded-lg shadow-lg bg-gray-50 p-10 w-full lg:w-10/12 mx-auto ">
                                <p class=" font-bold">{{ doc.title }}</p>
                                <p class="font-lg">{{ doc.text }}</p>
                                <div class="flex flex-row gap-5 sm:gap-20 text-lg">
                                    <button @click="deleteDocument(doc.id,index)" class="bg-red-600 hover:bg-white hover:text-red-600 py-2 px-4 rounded-lg text-white font-bold">Borrar</button>
                                    <button @click="editDocument(doc.id,index)" class="bg-green-500 hover:bg-white hover:text-green-500 py-2 px-4 rounded-lg text-white font-bold">Editar</button>
                                </div>
                            </div>
                        </div>
                    </form>
            </div>

<!-- Añadir documento -->            
            <div v-show="isAddDocument">
                <form @submit.prevent="onSubmit" class="bg-white md:w-8/12 lg:w-6/12 sm:m-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-8 justify-items-center h-full" >
                    <h2 class="text-[#016646] font-bold text-lg">Añadir documento</h2>
                    <input v-model="docTitle" type="text" placeholder="Título" class="w-11/12 md:w-8/12 lg:w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <textarea v-model="docText" placeholder="Texto" class="w-11/12 md:w-8/12 lg:w-6/12 border-4 border-[#016646] p-2 rounded-lg h-8/12" >{{ docText }}</textarea>
                    <div class=" flex flex-row gap-14 mb-40"> 
                        <button @click="handleForms('add-document','cancel')" class="bg-gray-400 hover:bg-white hover:text-gray-400 py-2 px-4 rounded-lg text-white font-bold">Cancelar</button>
                        <button @click="addDocument()" class="bg-[#016646] hover:bg-white hover:text-[#016646] w-8/12 font-bold text-white rounded-lg p-2 cursor-pointer">Guardar</button>
                    </div>
                </form>
                
            </div>

<!-- Editar documento -->
            <div v-show="isEditDocument">
                <form @submit.prevent="onSubmit" class="bg-white md:w-8/12 lg:w-6/12 sm:m-auto m-auto grid grid-cols-1 p-10 rounded-lg shadow-lg text-center gap-8 justify-items-center h-full" >
                    <h2 class="text-[#016646] font-bold text-lg">Añadir documento</h2>
                    <input v-model="docTitle" type="text" placeholder="Título" class="w-11/12 md:w-8/12 lg:w-6/12 border-4 border-[#016646] p-2 rounded-lg">
                    <textarea v-model="docText" placeholder="Texto" class="w-11/12 md:w-8/12 lg:w-6/12 border-4 border-[#016646] p-2 rounded-lg h-8/12" >{{ docText }}</textarea>
                    <div class=" flex flex-row gap-14 mb-40"> 
                        <button @click="handleForms('edit-document','cancel')" class="bg-gray-400 hover:bg-white hover:text-gray-400 py-2 px-4 rounded-lg text-white font-bold">Cancelar</button>
                        <button @click="updateDocument()" class="bg-[#016646] hover:bg-white hover:text-[#016646] w-8/12 font-bold text-white rounded-lg p-2 cursor-pointer">Guardar</button>
                    </div>
                </form>
                
            </div>

<!-- Ver documento  -->
            <div v-show="isViewDoc">
                <div  class="bg-white md:w-8/12 lg:w-6/12 sm:mx-auto flex flex-col p-10 rounded-lg shadow-lg text-center gap-8 items-center mb-80" >
                    <button @click="handleForms('view-document','cancel')" class="bg-[#016646] hover:bg-white hover:text-[#016646] px-4 font-bold text-white rounded-lg cursor-pointer w-8/12 sm:w-3/12 md:w-5/12 lg:w-4/12 justify-self-center">Cerrar</button>
                    <h2 class="text-[#016646] font-bold text-lg">{{ docTitle }}</h2>
                    <p class="text-[#016646] w-full md:w-10/12  p-2 rounded-lg">{{ docText }}</p>
                </div>
            </div>  
        </div>

    </div>
</div>
</template>