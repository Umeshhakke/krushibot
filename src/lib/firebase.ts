import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA3KndqBzP2Awx-xXhW8MRrsIzu-lCcFvY",
  authDomain: "krishi-bot.firebaseapp.com",
  databaseURL: "https://krishi-bot-default-rtdb.firebaseio.com",
  projectId: "krishi-bot",
  storageBucket: "krishi-bot.firebasestorage.app",
  messagingSenderId: "665106218234",
  appId: "1:665106218234:web:5ad51fbec2e1a199589d43",
  measurementId: "G-WTBZY2ZE1R"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export default app;
