import { defineStore } from "pinia";
import {auth, firestore} from "../firebase";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword , sendEmailVerification, updateProfile, signInWithEmailAndPassword,signOut} from "firebase/auth";
import router from "../router/router";
import { getFirestore, setDoc, doc, getDoc, collection, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

//PINIA STORE PARA FIREBASE

export const useFirebaseStore = defineStore('firebaseStore', { //declaración de estado
    state: () => ({
        user:{
            name:'',
            email:'',
            isLogged: false,
            isVerified: false,
            role:'',
            error:false,
            errorMessage:'',
            courses: {},
            documents:{},
            coursesId:[],
            userId:''
        },
        userList:{}

    }),
    actions: { 
        async registerUser(email,password,name) { //action para registrar un usuario nuevo
            const auth=getAuth();
            const db = firestore;
            try {
                    await createUserWithEmailAndPassword(auth, email, password); //función de registro
                }
            catch(err) {
                console.log(err);
                this.user.error=true;
                this.user.errorMessage='No se ha podido hacer el registro';
                return;
            }
                //esta función crea un documento relacionado con el usuario en la base de datos
                await setDoc(doc(db, "users", auth.currentUser.uid), {name:name, email:email , role:'user', documents:{}, coursesId:[],creationDate:Date.now(),userId:auth.currentUser.uid},{merge:true});

                //envío de correo de verificación
                await sendEmailVerification(auth.currentUser).catch((err) => console.log(err));

                //guardado de username en el perfil de auth
                await updateProfile(auth.currentUser, { displayName: name }).catch((err) => console.log(err));
                    
                this.user.name = name; //se rellena el estado
                this.user.email = email;
                this.user.isLogged =true;
                this.user.error=false;
                this.user.errorMessage='';

                //si hay current user es que se ha registrado correctamente, así que se redirecciona a /personal
                auth.currentUser?  router.push({ path: '/personal' }) :  router.push({ path: '/login' })
        },

        async doLogin(email,password){ //login
            const auth = getAuth();
            try {
                await signInWithEmailAndPassword(auth, email, password) //se hace el login
            }
            catch(error){
                console.log(error);
                this.user.error=true;
                this.user.errorMessage='No se ha podido iniciar sesión';
                return;
            }
            if (auth.currentUser){ //si hay current user es que se ha logeado
                this.user.name = auth.currentUser.displayName; //se rellena el estado
                this.user.email = auth.currentUser.email;
                this.user.isLogged = true;
                this.user.error=false;
                this.user.errorMessage='';
                router.push({ path: '/personal' }) //redirección a /personal
            }
            
        },

        async resendVerificationEmail(){ //reenviar email de verificación
            const auth = getAuth();
            if ( auth.currentUser.emailVerified == false ){
                await sendEmailVerification(auth.currentUser).catch((err) => console.log(err));
            }
        },

        async handleCourses(operation,documentId,courseName,description,posts){ //función maestra para manejo de cursos
            const auth = getAuth();
            const db = firestore;
            const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid)); //doc del usuario actual a partir del id del currentUser
            const role = userDoc.data().role; //rol del usuario
            let coursesDoc;

            switch (operation){ //este switch realiza todas las operaciones en función de la operación solicitada y el rol del usuario
                case 'read':
                    if(role=='admin'){ 
                        this.user.courses={}; //vaciado del objeto cursos del estado
                        coursesDoc = await getDocs(collection(db, "courses")).catch((err)=>(console.log(err))); //trae todos los cursos

                        coursesDoc.forEach((doc)=>{ 
                            let course = { //se declara objeto cursos vacío
                                name : '',
                                description : '',
                                posts : {}
                            }
                            // rellenado del objeto cursos del estado
                            this.user.courses[doc.id]=course;
                            this.user.courses[doc.id].name = doc.data().name;
                            this.user.courses[doc.id].description = doc.data().description;
                            this.user.courses[doc.id].posts = doc.data().posts;
                        });

                    }

                    if(role=='user'){
                        
                        this.user.courses={}; 

                        for(let i = 0; i< this.user.coursesId.length;i++){ //recorro la lista de id de cursos del usuario
                            //traigo el curso que se corresponde con la id
                            const course = await getDoc(doc(db, "courses",this.user.coursesId[i])).catch((err)=>(console.log(err)));

                            let newCourse = {//se declara objeto cursos vacío
                                name : '',
                                description : '',
                                posts : {}
                            }    
                            // rellenado del objeto cursos del estado
                            this.user.courses[course.id]=newCourse;
                            this.user.courses[course.id].name = course.data().name;
                            this.user.courses[course.id].description = course.data().description;
                            this.user.courses[course.id].posts = course.data().posts;
                        }
                    }
                    
                break;

                case 'write':
                    if (role == 'admin'){
                        //se crea un curso nuevo
                        await setDoc(doc(db, "courses",uuidv4()), {name:courseName, description:description , posts:{} },{ merge: true }).catch((err)=>(console.log(err)));
                    }
                    
                break;

                case 'update':
                    if (role == 'admin'){
                        //se actualiza un curso existente
                        await updateDoc(doc(db, "courses",documentId), {name:courseName, description:description , posts:posts},{ merge: true }).catch((err)=>(console.log(err)));
                    }
                break;

                case 'delete':
                    if (role == 'admin'){
                        //se borra un curso
                        await deleteDoc(doc(db, "courses",documentId)).catch((err)=>(console.log(err)))
                    }    
                break;
            }

        },

        async handleUser(){ //función para manejo del usuario
            const auth = getAuth();
            const db = firestore;
            const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid)).catch((err)=>(console.log(err))); //se trae el documento del usuario
            this.user.documents= userDoc.data().documents;//se rellena el usuario
            this.user.coursesId= userDoc.data().coursesId;
        },

        async handleUserList(operation, name, email, role , documents, coursesId, userId,creationDate){ //función para manejar la lista de usuarios
            const db = firestore;
            switch (operation){
                case 'read':
                    
                    const userList = await getDocs(collection(db, "users")).catch((err)=>(console.log(err))); //se trae toda la lista de usuarios

                    userList.forEach((doc)=>{ //se recorre la lista
                        let user = { //declaración de objeto vacío
                            name:'', 
                            email:'', 
                            role:'', 
                            documents:{}, 
                            coursesId:[],
                            creationDate:'',
                            userId:''
                        };
                        this.userList[doc.id]=user;//se mete el objeto en la lista
                        this.userList[doc.id].name = doc.data().name; //se rellena el objeto
                        this.userList[doc.id].email = doc.data().email;
                        this.userList[doc.id].role = doc.data().role;
                        this.userList[doc.id].documents = doc.data().documents;
                        this.userList[doc.id].coursesId = doc.data().coursesId;
                        this.userList[doc.id].userId = doc.id;
                    });
                break;   

                case 'update': //se actualiza un usuario
                    await updateDoc(doc(db, "users", userId), {name:name, email:email , role:role, documents:documents, coursesId:coursesId, creationDate:creationDate,userId:userId},{ merge: true }).catch((err)=>(console.log(err)));
                break;
            }
        },

        async checkStatus(reload){ // función para comprobar el estado de login del usuario
            const auth = getAuth(); 
            const db = firestore;
            
            if (auth.currentUser){ //si hay currentUser está logged
                this.user.isLogged = true

                const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid)); //se trae el documento del usuario
                if (reload) await auth.currentUser.reload(); //se recarga el auth si se solicita

                
                auth.currentUser.emailVerified ? this.user.isVerified=true : this.user.isVerified=false; //se comprueba si se ha verificado por mail
                this.user.role=userDoc.data().role; //se rellena el user
                this.user.name = auth.currentUser.displayName;
                this.user.email = auth.currentUser.email;
            }
            else{
                this.isLogged = false;
            }

        },

        async handleNavigationAccess(){ //función para evitar que el usuario vaya a /login si está logged o que vaya a /personal si no lo está
            const route = router.currentRoute._rawValue.path;
            switch(route){
                case '/login': if(this.user.isLogged) router.push({ path: '/personal' });
                break;

                case '/personal': if(!this.user.isLogged) router.push({ path: '/login' });
                break;
            }
            
        },

        modifyState(key,value){ //función para modificar distintas propiedades del estado desde fuera del mismo cuando es necesario
            switch (key){
                case 'user.error':
                    this.user.error = value;
                break;
                case 'user.errorMessage':
                    this.user.errorMessage = value;
                break;
                case 'user.role':
                    this.user.role = value;
                break;
            }
        },

        async signOut(){ //logout
            const auth = getAuth();
            try{ await signOut(auth) } //se cierra sesión
            catch(err){
                console.log(err);
            }
            if(!auth.currentUser){
                this.$reset(); //se resetea la store
                this.handleNavigationAccess();
            }
        }
            

    },

    getters:{ //los getters devuelven valores del estado
        getName: (state) => state.user.name,
        getEmail: (state) => state.user.email,
        getLogged: (state) => state.user.isLogged,
        getVerified: (state) => state.user.isVerified,
        getError: (state) => state.user.error,
        getErrorMessage: (state) => state.user.errorMessage,
        getRole: (state) => state.user.role,
        getCourses: (state) => state.user.courses,
        getUserList: (state) => state.userList,
        getDocuments: (state) => state.user.documents,
    }
    
            }
);