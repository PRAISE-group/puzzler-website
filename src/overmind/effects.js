import { db } from '../firebase/firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import {
    doc,
    setDoc,
    updateDoc,
    serverTimestamp,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore'

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
}

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
}

export const writeCourseData = async (loginId, courseData) => {
    // try {
    //     await setDoc(doc(db, 'courseRegData', loginId), {
    //         loginId: JSON.stringify(loginId),
    //         registeredData: courseData,
    //         lastUpdated: serverTimestamp(),
    //         sawform: false,
    //         paymentConfirmed: false,
    //     })
    //     await setDoc(doc(db, 'clickAnalytics', loginId), {
    //         paymentClick: arrayUnion({
    //             linkClick: 'User clicked to freeze course',
    //             url: window.location.href,
    //         }),
    //         creationTimestamp: serverTimestamp(),
    //     })
    //     await setDoc(doc(db, 'paymentData', loginId), {
    //         loginId: JSON.stringify(loginId),
    //         paymentList: arrayUnion({
    //             referenceId: -1,
    //             paymentDetails: {},
    //             reconciliationStatus: 'failed',
    //             reconciliationText: 'This is not a payment.',
    //         }),
    //         creationTimestamp: serverTimestamp(),
    //     })
    // } catch (e) {
    //     //
    // }
}