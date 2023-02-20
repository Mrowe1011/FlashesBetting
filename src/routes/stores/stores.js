import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	signOut
} from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
let currentUser;
let error;
export function onSubmit(username, password) {
	signInWithEmailAndPassword(auth, username, password)
		.catch((error) => {
			alert('Invalid Login: ' + error);
		})
		.then(() => {
			setPersistence(auth, browserSessionPersistence);
			currentUser = auth.currentUser;
			if (!error) {
				location.href = '/homePage'; // Svelte normally appends .html to location hrefs but doesn't for this because its a js file. Remove the .html while your developing otherwise it doesn't work
			}
		});
}

export function signout() {
	signOut(auth)
		.then(() => {
			currentUser = auth.currentUser;
			location.href = '/';
		})
		.catch((error) => {
			alert(error);
		});
}
