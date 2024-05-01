import { defineStore } from "pinia";
import {firestore, auth } from "../firebase";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword , sendEmailVerification, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import router from "../router/router";



export const useFirebaseStore = defineStore('firebaseStore', {
    state: () => ({
        user:{
            name:'',
            email:'',
            isLogged: false,
            isVerified: false,
            error:false,
            errorMessage:''
        }

    }),
    actions: {
        async registerUser(email,password,name) {
            const auth=getAuth();

            try {
                    await createUserWithEmailAndPassword(auth, email, password)
                }
            catch(err) {
                console.log(err);
                this.user.error=true;
                this.user.errorMessage='No se ha podido hacer el registro';
                return;
            }
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

        async getCourses(){
            const auth = getAuth();
            if(auth.currentUser && auth.currentUser.emailVerified){

            }
        },

        async checkStatus(reload){
            const auth = getAuth(); 
            
            if (reload) await auth.currentUser.reload();

            if (auth.currentUser){
                this.isLogged = true
                auth.currentUser.emailVerified ? this.user.isVerified=true : this.user.isVerified=false;

                if(this.user.name==''||this.user.name==undefined||this.user.name==null){
                    this.user.name = auth.currentUser.displayName;
                }

                if(this.user.email==''||this.user.email==undefined||this.user.email==null){
                    this.user.email = auth.currentUser.email;
                }
                    
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
            }
        }
            

    },

    getters:{
        getName: (state) => state.user.name,
        getEmail: (state) => state.user.email,
        getLogged: (state) => state.user.isLogged,
        getVerified: (state) => state.user.isVerified,
        getError: (state) => state.user.error,
        getErrorMessage: (state) => state.user.errorMessage
    }
    
            }
);