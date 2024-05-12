import { defineStore } from "pinia";
import {auth, firestore} from "../firebase";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword , sendEmailVerification, updateProfile, signInWithEmailAndPassword,signOut} from "firebase/auth";
import router from "../router/router";
import { getFirestore, setDoc, doc, getDoc, collection, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';



export const useFirebaseStore = defineStore('firebaseStore', {
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
            coursesId:[]
        },
        userList:{}

    }),
    actions: {
        async registerUser(email,password,name) {
            const auth=getAuth();
            const db = firestore;
            try {
                    await createUserWithEmailAndPassword(auth, email, password);
                }
            catch(err) {
                console.log(err);
                this.user.error=true;
                this.user.errorMessage='No se ha podido hacer el registro';
                return;
            }

                await setDoc(doc(db, "users", auth.currentUser.uid), {name:name, email:email , role:'user', documents:{}, coursesId:[]},{merge:true});

                await sendEmailVerification(auth.currentUser).catch((err) => console.log(err));

                await updateProfile(auth.currentUser, { displayName: name }).catch((err) => console.log(err));
                    
                this.user.name = name;
                this.user.email = email;
                this.user.isLogged =true;
                this.user.error=false;
                this.user.errorMessage='';

                auth.currentUser?  router.push({ path: '/personal' }) :  router.push({ path: '/login' })
        },

        async doLogin(email,password){
            const auth = getAuth();
            try {
                await signInWithEmailAndPassword(auth, email, password)
            }
            catch(error){
                console.log(error);
                this.user.error=true;
                this.user.errorMessage='No se ha podido iniciar sesión';
                return;
            }
            if (auth.currentUser){
                this.user.name = auth.currentUser.displayName;
                this.user.email = auth.currentUser.email;
                this.user.isLogged = true;
                this.user.error=false;
                this.user.errorMessage='';
                router.push({ path: '/personal' })
                }
            
        },

        async resendVerificationEmail(){
            const auth = getAuth();
            if ( auth.currentUser.emailVerified == false ){
                await sendEmailVerification(auth.currentUser).catch((err) => console.log(err));
            }
        },

        async handleCourses(operation,documentId,courseName,description,posts){
            const auth = getAuth();
            const db = firestore;
            const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
            const role = userDoc.data().role;
            let coursesDoc;

            switch (operation){
                case 'read':
                    if(role=='admin'){ 
                        this.user.courses={};
                        coursesDoc = await getDocs(collection(db, "courses")).catch((err)=>(console.log(err)));

                        coursesDoc.forEach((doc)=>{
                            let course = {
                                name : '',
                                description : '',
                                posts : {}
                            }
                
                            this.user.courses[doc.id]=course;
                            this.user.courses[doc.id].name = doc.data().name;
                            this.user.courses[doc.id].description = doc.data().description;
                            this.user.courses[doc.id].posts = doc.data().posts;
                        });

                    }

                    if(role=='user'){
                        
                        coursesDoc = await getDocs(collection(db, "courses")).catch((err)=>(console.log(err)));
                    }
                    
                break;

                case 'write':
                    if (role == 'admin'){
                        await setDoc(doc(db, "courses",uuidv4()), {name:courseName, description:description , posts:{} },{ merge: true }).catch((err)=>(console.log(err)));
                        
                    }
                    
                break;

                case 'update':
                    await updateDoc(doc(db, "courses",documentId), {name:courseName, description:description , posts:posts},{ merge: true }).catch((err)=>(console.log(err)));
                break;

                case 'delete':
                    await deleteDoc(doc(db, "courses",documentId)).catch((err)=>(console.log(err)))
                break;
            }

        },

        async handleUser(){
            const auth = getAuth();
            const db = firestore;
            const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid)).catch((err)=>(console.log(err)));
            this.user.documents= userDoc.data().documents;
            this.user.coursesId= userDoc.data().coursesId;
            coursesDoc.forEach((doc)=>console.log(doc.id));
        },

        async handleUserList(operation, name, email, role , documents, coursesId, userId){
            const db = firestore;
            switch (operation){
                case 'read':
                    
                    const userList = await getDocs(collection(db, "users")).catch((err)=>(console.log(err)));

                    userList.forEach((doc)=>{
                        let user = {
                            name:'', 
                            email:'', 
                            role:'', 
                            documents:{}, 
                            coursesId:[]
                        };
                        this.userList[doc.id]=user;
                        this.userList[doc.id].name = doc.data().name;
                        this.userList[doc.id].email = doc.data().email;
                        this.userList[doc.id].role = doc.data().role;
                        this.userList[doc.id].documents = doc.data().documents;
                        this.userList[doc.id].coursesId = doc.data().coursesId;
                    });
                break;

                case 'update':
                    await updateDoc(doc(db, "users", userId), {name:courseName, description:description , posts:{}},{ merge: true }).catch((err)=>(console.log(err)));
                break;
            }
        },

        async checkStatus(reload){
            const auth = getAuth(); 
            const db = firestore;
            
            if (auth.currentUser){
                this.user.isLogged = true

                const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
                if (reload) await auth.currentUser.reload();

                
                auth.currentUser.emailVerified ? this.user.isVerified=true : this.user.isVerified=false;
                this.user.role=userDoc.data().role;
                this.user.name = auth.currentUser.displayName;
                this.user.email = auth.currentUser.email;
            }
            else{
                this.isLogged = false;
            }

        },

        async handleNavigationAccess(){
            const route = router.currentRoute._rawValue.path;
            switch(route){
                case '/login': if(this.user.isLogged) router.push({ path: '/personal' });
                break;

                case '/personal': if(!this.user.isLogged) router.push({ path: '/login' });
                break;
            }
            
        },

        modifyState(key,value){
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

        async signOut(){
            const auth = getAuth();
            try{ await signOut(auth) }
            catch(err){
                console.log(err);
            }
            if(!auth.currentUser){
                this.$reset();
                this.handleNavigationAccess();
            }
        }
            

    },

    getters:{
        getName: (state) => state.user.name,
        getEmail: (state) => state.user.email,
        getLogged: (state) => state.user.isLogged,
        getVerified: (state) => state.user.isVerified,
        getError: (state) => state.user.error,
        getErrorMessage: (state) => state.user.errorMessage,
        getRole: (state) => state.user.role,
        getCourses: (state) => state.user.courses,
        getUserList: (state) => state.userList,
    }
    
            }
);