import firebase, { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBdpsr5ETbjlDh6yXATp71kd6TzBsk7qvs",
    authDomain: "trading-website.firebaseapp.com",
    projectId: "trading-website",
    storageBucket: "trading-website.appspot.com",
    messagingSenderId: "622438189094",
    appId: "1:622438189094:web:4548a08d8b452e9133fee7",
    measurementId: "G-RT6NM55XZY"
};

const firebaseapp = initializeApp(firebaseConfig);
export default firebaseapp
export const auth = getAuth()
