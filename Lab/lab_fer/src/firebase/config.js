// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK1J6ACaT2eLd4C71LVqmtmm508Py09KU",
  authDomain: "orchid-management-001.firebaseapp.com",
  projectId: "orchid-management-001",
  storageBucket: "orchid-management-001.firebasestorage.app",
  messagingSenderId: "448162917885",
  appId: "1:448162917885:web:8f21169068dbd130c7fd94",
  measurementId: "G-D9MQTDLJGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account' // Always show account selection
});

export default app;
