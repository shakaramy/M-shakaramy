import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// تنظیمات Firebase
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

// ردیابی دستگاه کاربر
const fpPromise = FingerprintJS.load();

document.getElementById('survey-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageElement = document.getElementById('message');
    const selectedOption = document.querySelector('input[name="vote"]:checked');

    if (!selectedOption) {
        messageElement.textContent = "لطفاً یک گزینه را انتخاب کنید.";
        return;
    }

    const vote = selectedOption.value;
    const fp = await fpPromise;
    const result = await fp.get();
    const userId = result.visitorId;

    const userRef = ref(database, `votes/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
        messageElement.textContent = "شما قبلاً رأی داده‌اید!";
    } else {
        await set(userRef, { vote });
        messageElement.textContent = "رأی شما با موفقیت ثبت شد!";
    }
});
