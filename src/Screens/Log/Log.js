import React,{useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View,TouchableOpacity,ScrollView,Dimensions,KeyboardAvoidingView,Platform} from 'react-native';
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import styles from './styles';
import { normalize } from '../../Helpers/normalize';
import { Avatar } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import Theme from '../../Constants/Theme';
import { dbRef } from '../../Firebase/firebase';
import { collection, doc, setDoc, getDoc } from "firebase/firestore"; 

const width = Dimensions.get('window').width;




const Log=({route,navigation})=> {
    const [min,setMin]=useState("0");
    // const [sec,setSec]=useState("0");
    const [scale,setScale]=useState("RX");
    const [loading,setLoading]=useState(false);
    const [comment,setComment]=useState("");
    useEffect(async()=>{
        const leaderboardRef = doc(dbRef, "LeaderBoard", String(route.params.wod.Date+` ${route.params.part}`));
        // var leaderboardRef = dbRef.collection("LeaderBoard").doc(String(route.params.wod.Date+` ${route.params.part}`));
        const docSnap = await getDoc(leaderboardRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            var us=(docSnap.data()).Users
            const objIndex = us.findIndex((obj => obj.uid == route.params.user.uid));
            if(typeof us[objIndex] !=="undefined" ){
                setScale((us[objIndex])["Scale"]);
                setComment((us[objIndex])["Comment"]);
                setMin((us[objIndex])["Record"]);

            }
        } 
        else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
        // leaderboardRef.get()
        // .then((data)=>{
        //     if(typeof data.data()!=="undefined"){
        //         var us=(data.data()).Users
        //         const objIndex = us.findIndex((obj => obj.uid == route.params.user.uid));
        //         if(typeof us[objIndex] !=="undefined" ){
        //             setScale((us[objIndex])["Scale"]);
        //             setComment((us[objIndex])["Comment"]);
        //             setMin((us[objIndex])["Record"]);

        //         }
                

        //     }

        // })

    },[])

    const saveLog=async ()=>{
        // alert("saved");
        setLoading(true);
        const leaderboardRef = doc(dbRef, "LeaderBoard", String(route.params.wod.Date+` ${route.params.part}`));
        // var leaderboardRef = dbRef.collection("LeaderBoard").doc(String(route.params.wod.Date+` ${route.params.part}`));
        const docSnap = await getDoc(leaderboardRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            var us=(docSnap.data()).Users
                console.log(us,"sdsd");
                var newUser={
                    Name:route.params.user.FirstName,
                    uid:route.params.user.uid,
                    Picture:route.params.user.Picture,
                    RecordType:(route.params.wod)[`Type${route.params.part}`],
                    Record:min,
                    Scale:scale,
                    Comment:comment,
                }
                const objIndex = us.findIndex((obj => obj.uid == route.params.user.uid));
                us.some(item=>item.uid==route.params.user.uid)?us[objIndex]=newUser
                :us.push(newUser)
                console.log(us);
                setDoc(leaderboardRef,{
                    Users:us
                    })
                .then(() => {
                    console.log("Document successfully written!");
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

        } 
        else {
        // doc.data() will be undefined in this case
            console.log("No such document!");
            setDoc(leaderboardRef,{
                Users:[{
                    Name:route.params.user.FirstName,
                    Picture:route.params.user.Picture,
                    uid:route.params.user.uid,
                    RecordType:(route.params.wod)[`Type${route.params.part}`],
                    Record:min,
                    Scale:scale,
                    Comment:comment,
                }]
            })
            .then(() => {
                console.log("Document successfully written!");
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        }
        // var leaderboardRef = dbRef.collection("LeaderBoard").doc(String(route.params.wod.Date+` ${route.params.part}`));
        // // leaderboardRef.get()
        // // .then((data)=>{
        // //     if(typeof data.data()!=="undefined"){
        // //         var us=(data.data()).Users
        // //         console.log(us,"sdsd");
        // //         var newUser={
        // //             Name:route.params.user.FirstName,
        // //             uid:route.params.user.uid,
        // //             Picture:route.params.user.Picture,
        // //             RecordType:(route.params.wod)[`Type${route.params.part}`],
        // //             Record:min,
        // //             Scale:scale,
        // //             Comment:comment,
        // //         }
        // //         const objIndex = us.findIndex((obj => obj.uid == route.params.user.uid));
        // //         us.some(item=>item.uid==route.params.user.uid)?us[objIndex]=newUser
        // //         :us.push(newUser)
        // //         console.log(us);
        // //         leaderboardRef.set({
        // //             Users:us
        // //         })
        // //         .then(() => {
        // //             console.log("Document successfully written!");
        // //             setLoading(false);
        // //         })
        // //         .catch((error) => {
        // //             console.error("Error writing document: ", error);
        // //         });
        // //         console.log(data.data().Users);
        // //     }
        // //     else{
        // //         leaderboardRef.set({
        // //                 Users:[{
        // //                     Name:route.params.user.FirstName,
        // //                     Picture:route.params.user.Picture,
        // //                     uid:route.params.user.uid,
        // //                     RecordType:(route.params.wod)[`Type${route.params.part}`],
        // //                     Record:min,
        // //                     Scale:scale,
        // //                     Comment:comment,
        // //                 }]
        // //             })
        // //             .then(() => {
        // //                 console.log("Document successfully written!");
        // //                 setLoading(false);
        // //             })
        // //             .catch((error) => {
        // //                 console.error("Error writing document: ", error);
        // //             });
        // //         // alert("undefined");
        // //     }
        // })
        // .catch((error)=>{
        //     console.log(error);
        // })
    }
    
    return (
        <View  style={styles.container}>
            <KeyboardAvoidingView
                style={{justifyContent:"center",alignItems:"center"}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.topBar}>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate("LeaderBoard",{user:route.params.user});
                    }}
                    style={styles.topBarBtns}>
                        <MaterialIcons name="leaderboard" size={normalize(25)} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate("UserProfile",{user:route.params.user});
                    }}
                    style={styles.profileBtn}>
                        <Text style={styles.profileBtnText}>{"Hello, "+route.params.user.FirstName}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate("Home");
                    }}
                    style={styles.topBarBtns}>
                        <MaterialCommunityIcons  name="bell-ring-outline" size={normalize(25)} color="black" />
                </TouchableOpacity>
            </View>
                <ScrollView style={styles.body}>
                    <Avatar.Image size={normalize(80)} style={{alignSelf:"center",marginVertical:normalize(20)}} source={route.params.user.Picture?{uri:route.params.user.Picture}:require('../../../assets/USER.png')}/>
                <View style={styles.logView}>
                    <TouchableOpacity
                        // onPress={()=>{navigation.navigate("LeaderBoard",{user:user})}}
                        style={styles.buttons} 
                        >
                            <View>
                                <Text style={[styles.greatText]}>
                                    {(route.params.wod)[`Type${route.params.part}`]}
                                </Text>
                            </View>
                    </TouchableOpacity>
                    {console.log((route.params.wod)[`Type${route.params.part}`])}
                    <TextInput
                        style={styles.input}
                        keyboardType="numbers-and-punctuation"
                        maxLength={3}
                        value={min}
                        label={(route.params.wod)[`Type${route.params.part}`]=="TIME"?"MIN":(route.params.wod)[`Type${route.params.part}`]}
                        // secureTextEntry={showPassword}
                        theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                        onChangeText={(min)=>{setMin(min)}}
                        />  
                </View> 
                <View style={styles.logView}>
                    <TouchableOpacity
                        onPress={()=>{setScale("RX")}}
                        style={[styles.buttons,scale=="RX"?{backgroundColor:Theme.red}:{backgroundColor:"white"}]} 
                        >
                            <View>
                                <Text style={[styles.greatText,scale=="RX"?{color:"white"}:{color:Theme.red}]}>
                                    RX
                                </Text>
                            </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            setScale("SCALED")
                        }}
                        style={[styles.buttons,scale=="SCALED"?{backgroundColor:Theme.red}:{backgroundColor:"white"}]} 
                        >
                            <View>
                                <Text style={[styles.greatText,scale=="SCALED"?{color:"white"}:{color:Theme.red}]}>
                                    SCALED
                                </Text>
                            </View>
                            
                    </TouchableOpacity>
                </View>
                <View style={[styles.logView]}>
                    <TextInput
                        style={{width:width-normalize(50),height:normalize(100)}}
                        mode="outlined"
                        label="Comment"
                        value={comment}
                        placeholder="#Comment"
                        multiline={true}
                        theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                        onChangeText={(comment)=>{setComment(comment)}}
                    />
                </View>
                <View style={[styles.logView,{
                    backgroundColor:"transparent",
                    shadowColor: 'transparent',
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 0,
                    elevation: 0
                    }]}>
                    {loading ?
                    <ActivityIndicator animating={true} size={"large"} color={Theme.red} />:
                    <TouchableOpacity
                            onPress={()=>{
                                saveLog();
                            }}
                            style={[styles.buttons]} 
                            >
                                <View>
                                    <Text style={[styles.greatText]}>
                                        SAVE
                                    </Text>
                                </View>
                                
                    </TouchableOpacity>}
                </View>
            </ScrollView>
        <StatusBar style="auto" />
        </KeyboardAvoidingView>
        </View>
    );
}

export default Log;
