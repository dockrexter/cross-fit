import {auth,dbRef} from "../../Firebase/firebase";
import { 
    doc,
    getDoc
} from "firebase/firestore";

const getUser=async(setter)=>{
    console.log(auth.currentUser.uid,"apple is here and there");
    const userRef = doc(dbRef, "Users", auth.currentUser.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        setter(docSnap.data());
    } 
    else{
        auth.signOut();
    }
}

export default getUser;