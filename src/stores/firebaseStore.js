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
        }

    }),
    actions: {
        async registerUser(email,password,name) {
            const auth=getAuth();
            try {
                await createUserWithEmailAndPassword(auth, email, password).catch((err) => console.log(err));
                
                await sendEmailVerification(auth.currentUser).catch((err) => console.log(err));

                await updateProfile(auth.currentUser, { displayName: name }).catch((err) => console.log(err));
                    
                this.user.name = name;
                this.user.email = email;
                this.user.isLogged =true;
                } catch (err) {
                console.log(err);
                }
                auth.currentUser?  router.push({ path: '/personal' }) :  router.push({ path: '/login' })
        },

        async checkStatus(){
            const auth = getAuth(); 
            if (auth.currentUser){
                this.isLogged = true
                auth.currentUser.emailVerified ? this.user.isVerified=true : this.user.isVerified=false;
            }
            else{
                this.isLogged = false;
                router.push({ path: '/login' });
            }
        },

        async doLogin(email,password){
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    if (auth.currentUser){
                    this.user.name = auth.currentUser.displayName;
                    this.user.email = auth.currentUser.email;
                    this.user.isLogged = true;
                    router.push({ path: '/personal' })
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
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
        }

    },

    getters:{
        getName: (state) => state.user.name,
        getEmail: (state) => state.user.email,
        getLogged: (state) => state.user.isLogged,
        getVerified: (state) => state.user.isVerified
    }
    
            }
);