import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth' ;

const config = {
        apiKey: "AIzaSyAV9HzYuksc2HVlB9AhGWWesYegOv6mYeA",
        authDomain: "crwn-store-ded49.firebaseapp.com",
        projectId: "crwn-store-ded49",
        storageBucket: "crwn-store-ded49.appspot.com",
        messagingSenderId: "783934858507",
        appId: "1:783934858507:web:361ade1057e291208aee0e",
        measurementId: "G-J2ZLXTMSP3"
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleAuth = () => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(googleAuthProvider);
}
 
export const createUserProfileDocument = async (userAuth, addotionalData) => {
        if(!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);

        const snapShot = await userRef.get();

        if(!snapShot.exists) {
                const {displayName, email} = userAuth;
                const createdAt = new Date();

                try {
                        await userRef.set({
                                displayName,
                                email,
                                createdAt,
                                ...addotionalData
                        })
                } catch (error) {
                        console.log('error creating user', error.message);
                }
        }

        return userRef;
}

export default firebase;
