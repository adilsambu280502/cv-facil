import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const provider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');

export {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  doc, setDoc, getDoc, collection, getDocs, query, where, Timestamp
};
export type { User };
