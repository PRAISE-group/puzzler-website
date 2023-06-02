import { db } from '../firebase/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import {
    doc,
    setDoc,
    updateDoc,
    serverTimestamp,
    arrayUnion,
    arrayRemove,
    collectionGroup,
} from 'firebase/firestore';

export const submitPuzzleData = async (loginId, puzzleId, rating, option) => {
    try {
        await updateDoc(doc(db, `puzzlerUserData/${loginId}/submissions`, puzzleId), {
            loginId: loginId,
            puzzleId: puzzleId,
            setRating: true,
            setOption: true,
            submitted: true,
            attempted: true,
            rating: rating,
            option: option,
            submit_time: serverTimestamp(),
            location: window.location.href,
        });
    } catch (e) {
        console.table(e);
    }
};

export const setLoginIdInUse = async (loginId) => {
    try {
        await setDoc(doc(db, 'inUse', loginId), {
            loginId: loginId,
            login_used: serverTimestamp(),
            location: window.location.href,
        });
    } catch (e) {
        console.table(e);
    }
};

export const getUIDusageStatus = async (loginId) => {
    try {
        const q = query(collection(db, 'inUse'), where('loginId', '==', JSON.stringify(loginId)));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // querySnapshot.docs.map(async (t) => {
            //     console.log(JSON.parse(t.data().loginId));
            // });
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.table(e);
    }
};

export const setPuzzleAttempted = async (loginId, puzzleId) => {
    try {
        const q = query(
            collectionGroup(db, 'submissions'),
            where('loginId', '==', loginId),
            where('puzzleId', '==', puzzleId)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            await setDoc(doc(db, `puzzlerUserData/${loginId}/submissions`, puzzleId), {
                loginId: loginId,
                puzzleId: puzzleId,
                setRating: false,
                setOption: false,
                submitted: false,
                attempted: true,
                rating: null,
                option: null,
                attempt_start_time: serverTimestamp(),
                location: window.location.href,
            });
        } else {
            await updateDoc(doc(db, `puzzlerUserData/${loginId}/submissions`, puzzleId), {
                next_attempt_start_time: serverTimestamp(),
            });
        }
    } catch (e) {
        console.table(e);
    }
};

export const getPuzzleSubmissionData = async (loginId, puzzleId) => {
    try {
        const q = query(
            collectionGroup(db, 'submissions'),
            where('loginId', '==', loginId),
            where('puzzleId', '==', puzzleId)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            var data = {};
            querySnapshot.docs.map(async (t) => {
                data = t.data();
            });
            return data;
        } else {
            return null;
        }
    } catch (e) {
        console.table(e);
    }
};

export const getPuzzleSubmissionDataLogin = async (loginId) => {
    try {
        const q = query(
            collectionGroup(db, 'submissions'),
            where('loginId', '==', JSON.stringify(loginId))
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            var data = [];
            querySnapshot.docs.map(async (t) => {
                data.push(t.data());
            });
            return data;
        } else {
            return null;
        }
    } catch (e) {
        console.table(e);
    }
};
