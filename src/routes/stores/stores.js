import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	signOut
} from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import { getDocs, getDoc, collection, doc, setDoc, updateDoc, increment } from 'firebase/firestore';
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export let currentUser;

onAuthStateChanged(auth, (user) => {
	if (user) {
		currentUser = user;
	}
});
export function onSubmit(username, password) {
	signInWithEmailAndPassword(auth, username, password)
		.catch((error) => {
			alert('Invalid Login: ' + error);
		})
		.then(() => {
			setPersistence(auth, browserSessionPersistence);
			currentUser = auth.currentUser;
			location.href = '/homePage'; // Svelte normally appends .html to location hrefs but doesn't for this because its a js file. Remove the .html while your developing otherwise it doesn't work
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

export let games = getdata();

async function getdata() {
	let querySnapshot = await getDocs(collection(db, 'Games'));
	games = [];
	querySnapshot.forEach((doc) => {
		games.push(doc.data());
	});
	return games;
}
