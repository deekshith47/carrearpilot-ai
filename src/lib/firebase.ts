import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

export const isFirebaseConfigured = 
  firebaseConfig && 
  firebaseConfig.projectId && 
  firebaseConfig.projectId !== 'remixed-project-id' &&
  !firebaseConfig.projectId.includes('remixed');

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and export
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Auth and export
export const auth = getAuth(app);

