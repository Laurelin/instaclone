/** @format */

import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCM96hJKsQbOfoqIDj5U3ZUJ6D9OQGx-4c',
  authDomain: 'instaclone-1e48d.firebaseapp.com',
  projectId: 'instaclone-1e48d',
  storageBucket: 'instaclone-1e48d.appspot.com',
  messagingSenderId: '424272809639',
  appId: '1:424272809639:web:231276bb9f83d696799582'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
