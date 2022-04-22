import { dbRef } from "../../Firebase/firebase";
import { 
    doc,
    setDoc,
} from "firebase/firestore";
import moment from "moment"


const AnnualFee=async(uid)=>{
    // var user = dbRef.collection("Users").doc(String(uid));
    // // Atomically add a new region to the "regions" array field.
    // await user.update({
    //     ValidFrom:`${moment()}`,
    //     ValidThru:`${moment().add(365,"days")}`
    // });
    await setDoc(doc(dbRef, "Users", String(uid)),{
        ValidFrom:`${moment()}`,
        ValidThru:`${moment().add(365,"days")}`
    },{merge:true});
}

const Packages=async(uid,Entries,Price,TotalEntries,Type,ValidFrom,ValidThru)=>{
    // var user = dbRef.collection("Users").doc(String(uid));
    // // Atomically add a new region to the "regions" array field.
    // await user.update({
    //     Plan:{
    //         Entries:Entries,
    //         Price:Price,
    //         TotalEntries:TotalEntries,
    //         Type:Type,
    //         ValidFrom:ValidFrom,
    //         ValidThru:ValidThru,
    //     }
    // });
    await setDoc(doc(dbRef, "Users", String(uid)),{
        Plan:{
            Entries:Entries,
            Price:Price,
            TotalEntries:TotalEntries,
            Type:Type,
            ValidFrom:ValidFrom,
            ValidThru:ValidThru,
        }
    },{merge:true});
}
const Plans=async(uid,Entries,Price,TotalEntries,Type,ValidFrom,ValidThru)=>{
    // var user = dbRef.collection("Users").doc(String(uid));
    // // Atomically add a new region to the "regions" array field.
    // await user.update({
    //     Plan:{
    //         Entries:Entries,
    //         Price:Price,
    //         TotalEntries:TotalEntries,
    //         Type:Type,
    //         // ValidFrom:`${ValidFrom}`,
    //         // ValidThru:`${ValidThru}`,
    //         ValidFrom:"",
    //         ValidThru:"",
    //     }
    // });
    await setDoc(doc(dbRef, "Users", String(uid)),{
        Plan:{
            Entries:Entries,
            Price:Price,
            TotalEntries:TotalEntries,
            Type:Type,
            // ValidFrom:`${ValidFrom}`,
            // ValidThru:`${ValidThru}`,
            ValidFrom:"",
            ValidThru:"",
        }
    },{merge:true});
}


export {AnnualFee,Packages,Plans}