import { auth,dbRef } from "../../Firebase/firebase";
import Config from '../../Constants/Config';
import * as Google from "expo-google-app-auth";
// import * as Facebook from 'expo-facebook';
import { 
    // FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithCredential,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { 
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";
import User from "../dbSchema/Users";
import { Platform } from "react-native";
import Theme from "../../Constants/Theme";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            // alert('Failed to get push token for push notification!');
            return "";
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
        } else {
        alert('Must use physical device for Push Notifications');
        return "";
        }
    
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: Theme.red,
            });
        }
    
        return token;
    }

const handleSignUp=async(email,password,confirmPassword,name,surname,codice,contact)=>{
    const userdb=User;
    const userau=await createUserWithEmailAndPassword(auth,email,password);
    const userRef = doc(dbRef, "Users", userau.user.uid);
    registerForPushNotificationsAsync().then(token =>{ 
        userdb.NotificationToken=String(token);
        userdb.Email=userau.user.email;
        userdb.FirstName=name;
        userdb.LastName=surname;
        userdb.CodiceFiscale=codice;
        userdb.Contact=contact;
        userdb.uid=userau.user.uid;
        setDoc(userRef, userdb, { merge: true });
    }).catch(err=>alert(err));
    
}

const handleLogin= async (email,password)=>{
    await signInWithEmailAndPassword(auth,email,password);
}

// const facebookLogin=async()=> { 
//     const userdb=User; 
//     if(Platform.OS === 'ios'){
//         alert("Comming soon for ios");
//     } 
//     else{ 
//     await Facebook.initializeAsync({
//         appId: '708487053499245',
//         appName:"crossFit-Bolzano",
//         autoLogAppEvents:false,
//     });
//     const { type, token, expirationDate, permissions, declinedPermissions } =
//         await Facebook.logInWithReadPermissionsAsync({
//             permissions: ['public_profile','email'],
//             behavior: 'web'
//         });
//     if (type === 'success') {
//         var credential = FacebookAuthProvider.credential(token);
//         signInWithCredential(auth,credential).then((userCredentials)=>{
//             const userRef = doc(dbRef, "Users", userCredentials.user.uid);
//             // const userRef = doc(dbRef, "Users", uid);
//             // const docSnap = await getDoc(userRef);
//             // if (docSnap.exists()) {
//                 registerForPushNotificationsAsync().then(token =>{ 
//                     userdb.NotificationToken=String(token);
//                     userdb.Picture=userCredentials.user.photoURL;
//                     userdb.Email=userCredentials.user.email;
//                     userdb.FirstName=userCredentials.user.displayName;
//                     userdb.uid=userCredentials.user.uid;
//                     setDoc(userRef, userdb, { merge: true });
//                 })
//         })
//         .catch((error) => {
//             alert(error);
//         });
//     } 
//     else {
//         alert("cancelled")
//     }
// }
// }



const checkAuthState=async(setter)=>{
    // const userdb=User;
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // const uid = user.uid;
            // const userRef = doc(dbRef, "Users", uid);
            // const docSnap = await getDoc(userRef);
            // if (docSnap.exists()) {
                setter(true);
                console.log("authcheck called")
            // } 
            // else {
                
            //         setter(true);
            //     });
                
            // }
        } 
        else {
            console.log("user gone!");
        }
        });

// code for firebase@8
    // auth.onAuthStateChanged(user=>{
    //     if(user){
    //         console.log(user);
    //         var userRef= dbRef.collection("Users").doc(String(user.uid));
    //         userRef.get().then((doc) => {
    //             if (doc.exists) {
    //                 console.log("exist");
    //                 setter(true);
    //             } 
    //             else {
    //                 userdb.Picture=String(user.photoURL);
    //                 userdb.Email=user.email;
    //                 userdb.FirstName=user.displayName;
    //                 userdb.uid=user.uid;
    //                 userRef.set(userdb);
    //                 console.log("No such document!");
    //                 setter(true);
    //             }
    //         })
    //         .catch((error) => {
    //             console.log("Error getting document:", error);
    //         });
    //     }
    //     else{
    //         setter(false);
    //     }
    // })
}

const handleGoogleSignIn=()=>{
    const userdb=User;
    const config={
        iosClientId:Config.iosClientId,
        androidClientId:Config.androidClientId,
        androidStandaloneAppClientId:Config.androidClientId,
        iosStandaloneAppClientId:Config.iosClientId,

        scope:["profile","email"],
    }
    Google
    .logInAsync(config)
    .then((result)=>{
        const{type,user}=result;
        if (result.type === 'success') {
            console.log(result);
            var credential = GoogleAuthProvider.credential(result.idToken,result.accessToken);
            signInWithCredential(auth,credential).then(async(userCredentials)=>{
                const userRef = doc(dbRef, "Users", userCredentials.user.uid);
                const docSnap = await getDoc(userRef);
                if (!docSnap.exists()) {
                    registerForPushNotificationsAsync().then(token =>{ 
                        userdb.NotificationToken=String(token);
                        userdb.Picture=userCredentials.user.photoURL;
                        userdb.Email=userCredentials.user.email;
                        userdb.FirstName=userCredentials.user.displayName;
                        userdb.uid=userCredentials.user.uid;
                        setDoc(userRef, userdb, { merge: true });
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
        } 
        else {
            alert("cancelled")
        }
    })
    .catch((err)=>console.log(err));
}

// ,facebookLogin
export {handleLogin,handleSignUp,checkAuthState,handleGoogleSignIn,registerForPushNotificationsAsync}