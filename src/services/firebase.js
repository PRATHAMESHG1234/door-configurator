// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCElStLV_1hdETi-wcJte5E_0K0nEkZQqw',
	authDomain: 'codegen-mailer.firebaseapp.com',
	projectId: 'codegen-mailer',
	storageBucket: 'codegen-mailer.appspot.com',
	messagingSenderId: '815243916202',
	appId: '1:815243916202:web:c6cc2186e496e2946ef1d3',
	measurementId: 'G-ZVZS8V7186',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
