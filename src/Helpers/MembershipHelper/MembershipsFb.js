// import * as firebase from "firebase"
import { dbRef } from "../../Firebase/firebase";
import { getDocs,collection} from "firebase/firestore";


const getMemberships=async (setter)=>{
    var plans={}
    const querySnapshot = await getDocs(collection(dbRef, "Memberships"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        plans[doc.id]=doc.data();
    });
    setter(plans);
    // await dbRef.collection("Memberships")
    // .onSnapshot({
    //     includeMetadataChanges: true
    // },async (querySnapshot) => {
    //     await querySnapshot.forEach((doc) => {
            
    //     })
    // });
}
export default getMemberships;


// PartAHistory:{
//     type:"",
//     min:"",
//     sec:"",
//     comment:"",
// },
// PartBHistory:{
//     type:"",
//     min:"",
//     sec:"",
//     comment:"",
// }