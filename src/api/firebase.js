import { firebase } from "@firebase/app"
import "@firebase/firestore"
import "@firebase/storage"

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyD00GaAvmnYZvgt5pLXPndSzvhK1t9GNUA",
    authDomain: "kiteeducation-179216.firebaseapp.com",
    databaseURL: "https://kiteeducation-179216.firebaseio.com",
    projectId: "kiteeducation-179216",
    storageBucket: "kiteeducation-179216.appspot.com",
    messagingSenderId: "175684396006"
})
const firestore = firebaseApp.firestore()
const storage = firebaseApp.storage()

const settings = { timestampsInSnapshots: true }
firestore.settings(settings)
const db = firestore
export { db, storage }
