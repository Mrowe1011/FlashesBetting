//firebase zone
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	signOut
} from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
//firebase zone

// subscribe to auth state
import { userStore } from 'sveltefire';
export let currentUser = userStore(auth);
// auth state

//get points profile
//get profile

export function onSubmit(username, password) {
	signInWithEmailAndPassword(auth, username, password)
		.catch((error) => {
			alert('Invalid Login: ' + error);
		})
		.then(() => {
			setPersistence(auth, browserSessionPersistence);
			location.href = '/homePage.html'; // Svelte normally appends .html to location hrefs but doesn't for this because its a js file. Remove the .html while your developing otherwise it doesn't work
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
