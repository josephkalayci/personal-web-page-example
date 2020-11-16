import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyDLdx6_U0-GIectU4YM8xjZY681tuz_g0Y',
  authDomain: 'muhammet-gok.firebaseapp.com',
  databaseURL: 'https://muhammet-gok.firebaseio.com',
  projectId: 'muhammet-gok',
  storageBucket: 'muhammet-gok.appspot.com',
  messagingSenderId: '381945127728',
  appId: '1:381945127728:web:b88d2cbecab4475f575ef5',
  measurementId: 'G-TH3M4BVFHC',
};

firebase.initializeApp(firebaseConfig);

//Sayfa acik oldugu surece authorized ediyor
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default firebase;
