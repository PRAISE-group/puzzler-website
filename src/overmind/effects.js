import { db } from '../firebase/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import {
    doc,
    setDoc,
    updateDoc,
    serverTimestamp,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore';

export const getRegistrationData = async (loginId) => {
    // const q = query(
    //     collection(db, 'courseRegData'),
    //     where('loginId', '==', JSON.stringify(`${loginId.toString()}`))
    // )
    // const querySnapshot = await getDocs(q)
    // if (!querySnapshot.empty) {
    //     var data = {}
    //     querySnapshot.docs.map(async (t) => {
    //         data = t.data()
    //     })
    //     return data
    // } else {
    //     return null
    // }
};

export const getPaymentDetails = async (loginId) => {
    // const q = query(
    //     collection(db, 'paymentData'),
    //     where('loginId', '==', JSON.stringify(`${loginId.toString()}`))
    // )
    // const querySnapshot = await getDocs(q)
    // if (!querySnapshot.empty) {
    //     var data = {}
    //     querySnapshot.docs.map(async (t) => {
    //         data = t.data()
    //     })
    //     return data
    // } else {
    //     return null
    // }
};

export const submitPuzzleRating = async (loginId, puzzleId, rating) => {
    try {
        await setDoc(doc(db, `puzzlerUserData/${loginId}/${puzzleId}`, 'rating'), {
            timestamp: serverTimestamp(),
            setRating: true,
            rating: rating,
        });
    } catch (e) {
        alert(e);
    }
};

export const submitPuzzleOption = async (loginId, puzzleId, option) => {
    try {
        await setDoc(doc(db, `puzzlerUserData/${loginId}/${puzzleId}`, 'option'), {
            timestamp: serverTimestamp(),
            optionChoosen: true,
            option: option,
        });
    } catch (e) {
        alert(e);
    }
};
