import React,{useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View,TouchableOpacity,Keyboard,ScrollView,FlatList,Image} from 'react-native';
import { MaterialCommunityIcons,AntDesign,MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { normalize } from '../../Helpers/normalize';
import { Avatar,ActivityIndicator} from 'react-native-paper';
import {
    doc,
    onSnapshot,
} from "firebase/firestore";
import { dbRef } from '../../Firebase/firebase';



const LeaderBoardList=({route,navigation})=> {
    const[user,setUser]=useState(route.params.user);
    const[classDay,setClassDay]=useState(route.params.classDay);
    const[classTime,setClassTime]=useState(route.params.classTime);
    const [usersList,setUsersList]=useState([]);
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        setLoading(true);
        const document=String(route.params.wod.Date+` ${route.params.part}`);
        console.log(document);
        // const unsubscribe = dbRef.collection("LeaderBoard").doc(document)
        // .onSnapshot({
        //     includeMetadataChanges: true
        // }, (doc) => {
        //     if(typeof doc.data() == "undefined"){
        //         setUsersList([]);
        //         setLoading(false);
        //         console.log("fsdfdf");
        //     }
        //     else{
        //         console.log(doc.data().Users);
        //         setUsersList(doc.data().Users);
        //         setLoading(false);
        //     }
            
        // });
        // return unsubscribe;
        const leaderRef = doc(dbRef, 'LeaderBoard', document);
        const unsubscribe = onSnapshot(leaderRef, {
            includeMetadataChanges: true
        }, (doc) => {
            if (typeof doc.data() == "undefined") {
                setUsersList([]);
                setLoading(false);
                console.log("fsdfdf");
            }
            else {
                console.log(doc.data().Users);
                setUsersList(doc.data().Users);
                setLoading(false);
            }

        });
        return unsubscribe;
    },[])

    if(loading){
        return(
            <View style={[styles.container]}>
                    <View style={styles.topBar}>
                        <TouchableOpacity
                            onPress={()=>{
                                navigation.navigate("LeaderBoard",{user:user});
                            }}
                            style={styles.topBarBtns}>
                                <MaterialIcons name="leaderboard" size={normalize(25)} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                navigation.navigate("UserProfile",{user:user});
                            }}
                            style={styles.profileBtn}>
                                <Text style={styles.profileBtnText}>{"Hello, "+user.FirstName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>{
                                navigation.navigate("Home",{user:user});
                            }}
                            style={styles.topBarBtns}>
                                <MaterialCommunityIcons  name="bell-ring-outline" size={normalize(25)} color="black" />
                        </TouchableOpacity>
                    </View>
                    <ActivityIndicator style={styles.ActivityIndicator} animating={true} size={"large"} color={"#6E1D1D"} />
                </View>
        );
    }
    else return (
        <View onTouchStart={Keyboard.dismiss} style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate("LeaderBoard",{user:user});
                    }}
                    style={styles.topBarBtns}>
                        <MaterialIcons name="leaderboard" size={normalize(25)} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate("UserProfile",{user:user});
                    }}
                    style={styles.profileBtn}>
                        <Text style={styles.profileBtnText}>{"Hello, "+user.FirstName}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate("Home",{user:user});
                    }}
                    style={styles.topBarBtns}>
                        <MaterialCommunityIcons  name="bell-ring-outline" size={normalize(25)} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.texts}>
                    <Text style={styles.progressText}>
                        LEADERBOARD
                    </Text>
                </View>
                <FlatList
                    data={usersList}
                    renderItem={({item,index}) =>(
                        <TouchableOpacity 
                            style={styles.classItem}
                        >
                            <View style={styles.classItemBodyLeft}>
                                <View style={styles.imageBody}>
                                    <Avatar.Image size={normalize(60)} source={item.Picture?{uri:item.Picture}:require('../../../assets/USER.png')}/>
                                </View>
                            </View>
                            <View style={styles.classItemBodyRight}>
                                <Text style={styles.className}>
                                    {item.Name}
                                </Text>
                                <Text style={styles.classDescription}>
                                    {item.RecordType+" = "+item.Record}
                                </Text>
                                <Text style={styles.classDescription}>
                                    {item.Scale}
                                </Text>
                            </View>

                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
        <StatusBar style="auto" />
        </View>
    );
}

export default LeaderBoardList;
