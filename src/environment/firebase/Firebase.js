// Packages
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, EmailAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const {
  REACT_APP_API_KEY: API_KEY,
  REACT_APP_AUTH_DOMAIN: AUTH_DOMAIN,
  REACT_APP_PROJECT_ID: PROJECT_ID,
  REACT_APP_STORAGE_BUCKET: STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID: MESSAGING_SENDER_ID,
  REACT_APP_APP_ID: APP_ID,
  REACT_APP_REALTIME_DATABASE_URL: DATABASE_URL,
} = process.env;

const firebaseConfig = {
  apiKey: API_KEY,
  appId: APP_ID,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  messagingSenderID: MESSAGING_SENDER_ID,
  projectID: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getDatabase(app);
export const provider = new EmailAuthProvider();
