import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBSnnvRvjttgu7pmrB6Heh5-DaetT-IFRk",
  
    authDomain: "guesscountry-8b104.firebaseapp.com",
  
    projectId: "guesscountry-8b104",
  
    storageBucket: "guesscountry-8b104.appspot.com",
  
    messagingSenderId: "597223259458",
  
    appId: "1:597223259458:web:fad064305c2bc2ee625cdb",
  };
  
initializeApp(firebaseConfig);

const db = getFirestore();

export default db;