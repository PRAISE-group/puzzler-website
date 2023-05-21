// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyACCZE-uxScKNwt8ZGdCM4d0k1LUO-Erlo',
    authDomain: 'acasummerschool.firebaseapp.com',
    projectId: 'acasummerschool',
    storageBucket: 'acasummerschool.appspot.com',
    messagingSenderId: '521103735908',
    appId: '1:521103735908:web:0d5435ca858cc9a1b43371',
    measurementId: 'G-NXEYSK1K4G',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)
export { db, analytics }
