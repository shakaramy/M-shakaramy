// تنظیمات Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvsbUvF-wN0vn59lAYdVVI8mdXIQgfV0k",
  authDomain: "chatroomfa.firebaseapp.com",
  projectId: "chatroomfa",
  storageBucket: "chatroomfa.firebasestorage.app",
  messagingSenderId: "171089269229",
  appId: "1:171089269229:web:c793342c786cae3c4fd7e4",
  measurementId: "G-H6F99TS3PT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ارسال پیام
document.getElementById('send-btn').addEventListener('click', () => {
    const message = document.getElementById('message-input').value;
    if (message.trim() !== '') {
        push(messagesRef, { text: message });
        document.getElementById('message-input').value = '';
    }
});

// دریافت پیام‌ها
onChildAdded(messagesRef, (snapshot) => {
    const message = snapshot.val();
    const li = document.createElement('li');
    li.textContent = message.text;
    document.getElementById('messages').appendChild(li);
});
