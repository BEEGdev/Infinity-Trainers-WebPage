import { defineStore } from "pinia";
import {auth, firestore} from "../firebase";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword , sendEmailVerification, updateProfile, signInWithEmailAndPassword,signOut} from "firebase/auth";
import router from "../router/router";
import { getFirestore, setDoc, doc, getDoc, collection, getDocs } from "firebase/firestore";



export const useFirebaseStore = defineStore('firebaseStore', {
    state: () => ({
        user:{
            name:'',
            email:'',
            isLogged: false,
            isVerified: false,
            role:'',
            error:false,
            errorMessage:''
        }

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

                await setDoc(doc(db, "users", auth.currentUser.uid), {name:name, email:email , role:'user', courses:[], documents:[]});

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

        async handleCourses(){
            console.log('curses');
            const auth = getAuth();
            const db = firestore;
            const coursesDoc = await getDocs(collection(db, "courses")).catch((err)=>(console.log(err)));
            
            coursesDoc.forEach((doc)=>console.log(doc.id)); 
        },

        async handleUserDocuments(){
            const auth = getAuth();
            const db = firestore;
            const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid)).catch((err)=>(console.log(err)));
            this.userDocuments= userDoc.data().documents;
            coursesDoc.forEach((doc)=>console.log(doc.id));
        },

        async checkStatus(reload){
            const auth = getAuth(); 
            const db = firestore;
            
            if (auth.currentUser){
                this.user.isLogged = true

                const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
                console.log("rol:"+userDoc.data().role);
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
    }
    
            }
);