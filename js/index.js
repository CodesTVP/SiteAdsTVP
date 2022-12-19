const firebaseConfig = {
    apiKey: "AIzaSyA2UrVcfcR3_co-0SRvggAfritNB832t-4",
    authDomain: "send-mail-news.firebaseapp.com",
    projectId: "send-mail-news",
    storageBucket: "send-mail-news.appspot.com",
    messagingSenderId: "735458348101",
    appId: "1:735458348101:web:9448e2b6fd09b61efee72c"
}

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const listIds = []

function adaptName(text) {
    return 'ad-' + text.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        .toLowerCase().replace(/ /g, "-")
}

function generateID(size) {
    const randomized = Math.ceil(Math.random() * Math.pow(10, size))
    return randomized
}