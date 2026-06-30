import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAU8OTASMBuXXHV7fJJVbhStJJyRLOBbZ0",
  authDomain: "ai-recruiter-bea1d.firebaseapp.com",
  databaseURL: "https://ai-recruiter-bea1d-default-rtdb.firebaseio.com",
  projectId: "ai-recruiter-bea1d",
  storageBucket: "ai-recruiter-bea1d.firebasestorage.app",
  messagingSenderId: "330287494519",
  appId: "1:330287494519:web:b6b2f9501c05d4a9d69d72",
  measurementId: "G-KJPK0GFCS5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getDatabase(app);