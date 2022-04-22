import { dbRef } from "../../Firebase/firebase";
import moment from "moment";
import Days from "./Days";
import { 
    doc,
    getDoc,
    getDocs,
    collection,
    onSnapshot,
    query, 
    where,
} from "firebase/firestore";

const getTimeTable=async (day,setter)=>{
    console.log(Days[`${day}`])
    const timeTableRef = doc(dbRef, "TimeTable", String(Days[`${day}`]));
    onSnapshot(timeTableRef,(doc)=>{
        console.log(doc.data());
        setter(doc.data());
    },(err)=>{alert(err)});
    
    // await dbRef.collection("TimeTable").doc(String(Days[`${day}`]))
    //     .onSnapshot((doc) => {
    //         console.log("Current data: ", doc.data());
    //         setter(doc.data());
    //     },(err)=>{alert(arr)});
}

const getUserBookings=async(date,setter)=>{
    const date_formated=moment(date).format("YYYY-MM-DD");
    var bookings=[];
    console.log(date_formated);
    const q = query(collection(dbRef, "Bookings"), where("ClassDate", "==", String(date_formated)));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        bookings.push(doc.data());
    });
    setter(bookings);
    // await dbRef.collection("Bookings").where("ClassDate", "==", String(date_formated))
    // .onSnapshot((snapshots) => {
    //     snapshots.forEach((doc) => {
    //         
            
    //     });
    //     setter(bookings);
    // });
    
}

const getWod=async(date,setter)=>{
    const date_formated=moment(date).format("YYYY-MM-DD");
    const wodRef = doc(dbRef, "WOD", date_formated);
    const docSnap = await getDoc(wodRef);
    try {
        if(docSnap.exists()){
            console.log(docSnap.data());
            setter(docSnap.data())
        }
        else{
            setter({})
        }
    } catch (error) {
        console.log(error);
        
    }
    // var wods=[];
    // await dbRef.collection("WOD").where("Date", "==", String(date_formated))
    // .onSnapshot((snapshots) => {
    //     snapshots.forEach((doc) => {
    //         console.log(doc.data());
    //         wods.push(doc.data());
            
    //     });
    //     setter(wods);
    //     console.log(wods);
    // });

}

export {getTimeTable,getUserBookings,getWod}


// const setUpDashboard= async ()=>{
    //     let wod_array=[];
    //     let table_array=[];
    //    const table= await dbRef.collection("TimeTable").get();
    //     table.forEach((doc) => {
    //         table_array.push(doc.data());
    //     });
    //     const workout= await dbRef.collection("WOD").get()
    //     workout.forEach((doc) => {
    //         wod_array.push(doc.data());
    //     });
    //     return({
    //         table:table_array,
    //         wod:wod_array
    //     })
    // }

 // useEffect(()=>{
    //     let mounted = true;
    //     setCanBook(true);
    //     setLoading(true);
    //     setUpDashboard().then(data=>{
    //         setTimeTable(data.table);
    //         setWod(data.wod.filter(
    //             object=>{
    //                 return object.Date == moment().format("YYYY-MM-DD")
    //             }
    //         ));
    //         setDate(moment());
    //         setDay(moment().day());
    //     }).finally(()=>{
    //         setLoading(false);
    //     })
    //     return () => mounted = false;
    // },[refreshing])

    // useEffect(()=>{
    //     setRefreshing(false);
    //     setCanBook(true);
    // },[date,timeTable,wod,day])

    //     useEffect(()=>{
    //         setLoading(true);
    //         setCanBook(true);
    //         dbRef.collection("Bookings").where("ClassDate", "==", moment(date).format("YYYY-MM-DD"))
    //         .onSnapshot({
    //             includeMetadataChanges: true
    //         }, (querySnapshot) => {
    //             var cities = [];
    //             querySnapshot.forEach((doc) => {
    //                 cities.push(doc.data());
    //             });
    //             setBookings(cities);
    //             setLoading(false);
    //         });
    //     },[date])

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         setLoading(true);
    //         setCanBook(true);
    //         dbRef.collection("Bookings").where("ClassDate", "==", moment(date).format("YYYY-MM-DD"))
    //         .onSnapshot({
    //             includeMetadataChanges: true
    //         }, (querySnapshot) => {
    //             var cities = [];
    //             querySnapshot.forEach((doc) => {
    //                 cities.push(doc.data());
    //             });
    //             setBookings(cities);
    //             setLoading(false);
    //         });
    //     });
        
    //     return unsubscribe;
    //   }, [navigation,date]);

    // useEffect(()=>{
    //     const unsubscribe = navigation.addListener('beforeRemove', (e) => {
    //         e.preventDefault();
    //         console.log(route.name);
    //         if(route.name=="Dashboard"){
                
    //             BackHandler.exitApp();
    //         }
    //         else{
    //             navigation.goBack()
    //         }
    //       });
    //     return unsubscribe;
    // })
