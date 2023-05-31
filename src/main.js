import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOWlCu3Oy5059NMcZizM6fBsYqGcMN3gM",
  authDomain: "if-chat-29cb0.firebaseapp.com",
  databaseURL: "https://if-chat-29cb0-default-rtdb.firebaseio.com",
  projectId: "if-chat-29cb0",
  storageBucket: "if-chat-29cb0.appspot.com",
  messagingSenderId: "426559289495",
  appId: "1:426559289495:web:17cabc3b70c6399f05d1d2"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

createApp(App).use(store).use(router).use(storage).mount('#app')
