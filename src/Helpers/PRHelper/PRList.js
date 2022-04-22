// import * as firebase from "firebase"
import { dbRef } from "../../Firebase/firebase";
import { 
    doc,
    getDoc,
    getDocs,
    collection,
    onSnapshot,
    arrayUnion,
    setDoc,
} from "firebase/firestore";
import moment from "moment"

const getPRList=async()=>{
    var list=[]
    const querySnapshot = await getDocs(collection(dbRef, "PRList"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        list.push(doc.data());
    });
    return list;

    
    
}

const getPR=async(uid,setter)=>{
    const prRef = doc(dbRef, "PR", String(uid));
    onSnapshot(prRef,(doc)=>{
        var data=doc.data();
        console.log(data,"getter")
        setter(data);
    },(err)=>{alert(err)});   
}

const savePR=async(uid,number,reps,exercise)=>{
    console.log(uid);
    var PR = getDoc(doc(dbRef, "PR", String(uid)));
    var obj={};
    var obj2={};
    obj2[reps]=arrayUnion({
        number:number,
        date:String(moment().format("L"))
    });
    obj[exercise]=obj2
    setDoc(doc(dbRef, "PR", String(uid)),obj,{merge:true});
}

export {getPRList,savePR,getPR};