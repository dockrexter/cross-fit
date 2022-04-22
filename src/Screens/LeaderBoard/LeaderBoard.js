import React,{useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View,TouchableOpacity,Keyboard,ScrollView,FlatList,Image} from 'react-native';
import { MaterialCommunityIcons,AntDesign,MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { normalize } from '../../Helpers/normalize';
import { Searchbar,Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Theme from '../../Constants/Theme';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from '../../Constants/Constants';
import { dbRef } from '../../Firebase/firebase';
import { FAB } from 'react-native-paper';
import { 
    getDocs,
    collection,
    query, 
    where,
} from "firebase/firestore";




const LeaderBoard=({route,navigation})=> {

    const [date,setDate]=useState(moment());
    const [day,setDay]=useState(0);
    const [loading,setLoading]=useState(true);
    const [wod,setWod]=useState([]);

    let datesBlacklist = [ moment().isoWeekday(7) ];
    let datesWhitelist = [{
        start: moment().subtract(365, 'days'), // yesterday
        end: moment().add(0, 'days')  // tomorrow
    }];

    const setUpLeaderBoard=async (date)=>{
        setLoading(true);
        // dbRef.collection("WOD").where("Date", "==", moment(date).format("YYYY-MM-DD"))
        // .onSnapshot((querySnapshot) => {
        //     var cities = [];
        //     querySnapshot.forEach((doc) => {
        //         cities.push(doc.data());
        //     });
        //     console.log("Current cities in CA: ", cities);
        //     setWod(cities);
        //     setLoading(false);
        // });
        const date_formated=moment(date).format("YYYY-MM-DD");
        var wods=[];
        console.log(date_formated);
        const q = query(collection(dbRef, "WOD"), where("Date", "==", String(date_formated)));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            wods.push(doc.data());
        });
        setWod(wods);
        setLoading(false);
    }

    const handleDateChange=(date)=>{
        setDay(moment(date).day())
        setDate(moment(date));
        setUpLeaderBoard(date);
    }
    
    useEffect(()=>{
        console.log(moment(date).format("YYYY-MM-DD"));
        setUpLeaderBoard(moment(date).format("YYYY-MM-DD"));
    },[])

    // useEffect(()=>{
    //     setDate(moment());
    //     setDay(moment().day());
    // },[])
    
    return (
        <View onTouchStart={Keyboard.dismiss} style={styles.container}>
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
                        navigation.navigate("Home",{user:route.params.user});
                    }}
                    style={styles.topBarBtns}>
                        <MaterialCommunityIcons  name="bell-ring-outline" size={normalize(25)} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <CalendarStrip
                    // scrollable={true}
                    // scrollerPaging={true}
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                    style={styles.calender}
                    calendarHeaderStyle={{color: Theme.red}}
                    calendarColor={'white'}
                    dateNumberStyle={{color: 'black'}}
                    dateNameStyle={{color: 'black'}}
                    highlightDateNumberStyle={{color: 'white'}}
                    highlightDateNameStyle={{color: 'white'}}
                    highlightDateContainerStyle={{backgroundColor:Theme.red}}
                    disabledDateNameStyle={{color: 'grey'}}
                    disabledDateNumberStyle={{color: 'grey'}}
                    selectedDate={date}
                    datesWhitelist={datesWhitelist}
                    datesBlacklist={datesBlacklist}
                    onDateSelected={(date)=>handleDateChange(date)}
                    maxDate={moment().add(0, 'days')}
                    iconContainer={{flex: 0.1}}
                />
            </View>
            {loading ?
            <ActivityIndicator animating={true} size={"large"} color={Theme.red} />:
            <ScrollView
                contentContainerStyle={styles.scrollView}>
                <View style={styles.texts}>
                    <Text style={styles.progressText}>
                        WOD
                    </Text>
                </View>
                {
                wod.filter(
                    object=>{
                        return object.Date == moment(date).format("YYYY-MM-DD")
                    }
                ).length>0?
                <View>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['white', 'white', 'white']}
                        style={styles.progressCardView}>
                            <Text style={[styles.greatText,{color:"black"}]}>
                                PART A:
                            </Text>
                            <View style={{marginVertical:normalize(10)}}>
                                <Text style={styles.greattagText}>
                                    {
                                        wod.filter(
                                            object=>{
                                                return object.Date == moment(date).format("YYYY-MM-DD")
                                            }
                                        ).length>0?String(wod[0].PartA).replace(/\\n/g,"\n"):"N/a"
                                    }
                                </Text>
                            </View>
                            <Text style={styles.greattagText}>
                                {/* {"KGs"} */}
                            </Text>
                            <View style={styles.progressBtnsView}>
                                <TouchableOpacity
                                    onPress={()=>{navigation.navigate("LeaderBoardList",{user:route.params.user,wod:wod[0],part:"A"})}}
                                    style={styles.progressBtn} 
                                    >
                                        <View>
                                            <Text style={[styles.greatText]}>
                                                LEADERBOARD
                                            </Text>
                                        </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>{
                                        navigation.navigate("Log",{user:route.params.user,wod:wod[0],part:"A"})
                                    }}
                                    style={[styles.progressBtn,{backgroundColor:"white"}]} 
                                    >
                                        <View>
                                            <Text style={[styles.greatText,{color:"black"}]}>
                                                LOG
                                            </Text>
                                        </View>
                                        
                                </TouchableOpacity>
                            </View>
                    </LinearGradient>
                    <LinearGradient
                        // Button Linear Gradient
                        // colors={['#54B8D2', '#9291DF', '#e993b6']}
                        colors={['white', 'white', 'white']}
                        style={styles.progressCardView}>
                            <Text style={[styles.greatText,{color:"black"}]}>
                                PART B:
                            </Text>
                            <View style={{marginVertical:normalize(10)}}>
                                <Text style={styles.greattagText}>
                                    {
                                        wod.filter(
                                            object=>{
                                                return object.Date == moment(date).format("YYYY-MM-DD")
                                            }
                                        ).length>0?String(wod[0].PartB).replace(/\\n/g,"\n"):"N/a"
                                    }
                                </Text>
                                
                            </View>
                            <Text style={styles.greattagText}>
                                {/* {"KGs"} */}
                            </Text>
                            <View style={styles.progressBtnsView}>
                                <TouchableOpacity
                                    onPress={()=>{navigation.navigate("LeaderBoardList",{user:route.params.user,wod:wod[0],part:"B"})}}
                                    style={styles.progressBtn} 
                                    >
                                        <View>
                                            <Text style={[styles.greatText]}>
                                                LEADERBOARD
                                            </Text>
                                        </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=> 
                                    navigation.navigate("Log",{user:route.params.user,wod:wod[0],part:"B"})
                                    }
                                    style={[styles.progressBtn,{backgroundColor:"white"}]} 
                                    >
                                        <View>
                                            <Text style={[styles.greatText,{color:"black"}]}>
                                                LOG
                                            </Text>
                                        </View>
                                        
                                </TouchableOpacity>
                            </View>
                    </LinearGradient>
                </View>:
                    <View
                    style={styles.imageContainer}
                    >
                    <Image 
                        style={styles.notFoundImage}
                        source={Constants.notFound}
                    />
                </View>
                }
            </ScrollView>}
            <FAB
                style={styles.rightFab}
                icon="home"
                color='white'
                onPress={() => {
                    navigation.navigate("Dashboard");
                }}
            />

            
        <StatusBar style="auto" />
        </View>
    );
}

export default LeaderBoard;




{/* <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.texts}>
                    <Text style={styles.progressText}>
                        LEADERBOARD
                    </Text>
                </View>
                <FlatList
                    data={classes}
                    renderItem={({item,index}) =>(
                        <TouchableOpacity 
                            style={styles.classItem}
                        >
                            <View style={styles.classItemBodyLeft}>
                                <View style={styles.imageBody}>
                                    <Avatar.Image size={50} source={require('/Users/dockrexter/Desktop/crossfit/assets/USER.png')} />
                                    <Image style={styles.classImage} source={require('../../../assets/USER.png')}/>
                                </View>
                            </View>
                            <View style={styles.classItemBodyRight}>
                                <Text style={styles.className}>
                                    {item.name}
                                </Text>
                                <Text style={styles.classDescription}>
                                    {"HURRAH!"}
                                </Text>
                            </View>

                        </TouchableOpacity>
                     ) }
                />
            </ScrollView> */}