import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAp_xGVARkRV7Yy5_Rq89RhIu3FdJh1nxk",
  authDomain: "storage-learning-1db7e.firebaseapp.com",
  projectId: "storage-learning-1db7e",
  storageBucket: "storage-learning-1db7e.appspot.com",
  messagingSenderId: "659320425291",
  appId: "1:659320425291:web:59a13a9c4388f9085236ce",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
