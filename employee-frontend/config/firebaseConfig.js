// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwxehZw1_2-TlBQJm_SFULwUoJDSpaAww",
    authDomain: "employee-a22d0.firebaseapp.com",
    projectId: "employee-a22d0",
    storageBucket: "employee-a22d0.appspot.com",
    messagingSenderId: "376016740247",
    appId: "1:376016740247:web:19c12c026cb64e13ce2ed2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);