// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC44WstZFTiMSu_EsepOb06GexnBreEBKA',
  authDomain: 'jshop-994e0.firebaseapp.com',
  projectId: 'jshop-994e0',
  storageBucket: 'jshop-994e0.firebasestorage.app',
  messagingSenderId: '16879329175',
  appId: '1:16879329175:web:2424d1359c571ef4d82ed2',
  measurementId: 'G-0548HBS50W',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
