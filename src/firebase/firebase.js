// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBYlKO9oOKba2HLvGooYcgqvY6dpWNEfVE",
    authDomain: "puzzler-project.firebaseapp.com",
    projectId: "puzzler-project",
    storageBucket: "puzzler-project.appspot.com",
    messagingSenderId: "231479705139",
    appId: "1:231479705139:web:61e657d14c71fd91f66d46",
    measurementId: "G-9LFBK8GYR1"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)
export { db, analytics }
