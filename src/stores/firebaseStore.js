import { defineStore } from "pinia";
import {firestore, auth } from "../firebase";
import { AuthErrorCodes, getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useFirebaseStore = defineStore('firebaseStore', {
    state: () => ({
        user:{},
        errorCode:'',
        errorMessage:''
    }),
    actions: {
        registerUser(email,password){
            console.log('ENTRANDO');
            const auth=getAuth()
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            this.user = userCredential;
            console.log(this.user)
            })
            .catch((error) => {
            this.errorCode = error.code;
            this.errorMessage = error.message;

            console.log(this.errorCode + ' '+ this.errorMessage)
            })
        }
    }
}
);