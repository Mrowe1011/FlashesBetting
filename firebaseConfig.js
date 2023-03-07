export const firebaseConfig = {
	apiKey: 'AIzaSyB7MD2n11jJ3_9fbl18XSgGTJ06rldttH8',
	authDomain: 'flashesbetting.firebaseapp.com',
	databaseURL: 'https://flashesbetting-default-rtdb.firebaseio.com',
	projectId: 'flashesbetting',
	storageBucket: 'flashesbetting.appspot.com',
	messagingSenderId: '918858891705',
	appId: '1:918858891705:web:683ea97df0cb8265353668',
	measurementId: 'G-S65EMFKM3W'
};

import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	signOut
} from 'firebase/auth';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
let currentUser;

export function onSubmit(username, password) {
	signInWithEmailAndPassword(auth, username, password)
		.catch((error) => {
			alert('Invalid Login: ' + error);
		})
		.then(() => {
			setPersistence(auth, browserSessionPersistence);
			currentUser = auth.currentUser;
			location.href = '/homePage.html'; // Svelte normally appends .html to location hrefs but doesn't for this because its a js file. Remove the .html while your developing otherwise it doesn't work
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