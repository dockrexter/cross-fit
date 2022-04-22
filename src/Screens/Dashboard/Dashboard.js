import React,{useEffect, useState,useCallback} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text,View,TouchableOpacity,Keyboard,ScrollView,FlatList,Image} from 'react-native';
import { MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';
import styles from './styles';
import { normalize } from '../../Helpers/normalize';
import { LinearGradient } from 'expo-linear-gradient';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { FAB } from 'react-native-paper';
import { Linking } from 'react-native';
import Theme from '../../Constants/Theme';
import { getTimeTable,getUserBookings,getWod} from '../../Helpers/DashboardHelper/DashboardFb';
import getUser from '../../Helpers/db/getUser';
import Loading from '../Loading/Loading';
import { useFocusEffect } from '@react-navigation/native';





const Dashboard=({route,navigation})=> {
    const [user,setUser]=useState();
    const [loading,setLoading]=useState(true);
    const [timeTable,setTimeTable]=useState();
    const [wod,setWod]=useState();
    const [day,setDay]=useState(moment().day()==0?moment().add(1,'days').day():moment().day());
    const [date,setDate]=useState(moment().day()==0?moment().add(1,'days'):moment());
    const [bookings,setBookings]=useState([]);
    const [canBook,setCanBook]=useState(true);
    const [canBookOpenBox,setCanBookOpenBox]=useState(true);
    let datesWhitelist = [{
        start: moment(),
        end: moment().add(6, 'days')  
    }];
    let datesBlacklist = [ moment().isoWeekday(7) ];
    
    const handleDateChange=(date)=>{
        setDay(moment(date).day())
        setDate(moment(date));
        setCanBook(true);
        setCanBookOpenBox(true);
        setLoading(true);
        getTimeTable(moment(date).day(),(timeTable)=>{
            setTimeTable(timeTable);
        }).then(()=>{
            getUserBookings(moment(date),(bookings)=>{
                setBookings(bookings);
                setLoading(false);
            })
        });
    }
    useEffect(()=>{
        console.log(day,date,"apple");
        // navigation.addListener('focus', () => {
            setLoading(true);
            setDay(moment(date).day())
            setDate(moment(date));
            setCanBook(true);
            setCanBookOpenBox(true);
            getUser((user)=>setUser(user));
            getTimeTable(day,(timeTable)=>{
                setTimeTable(timeTable);
            })
            .then(()=>{
                getUserBookings(moment(date),(bookings)=>{
                    setBookings(bookings);
                })
                .then(()=>{
                    getWod(moment(date),(wods)=>{
                        setWod(wods);
                        setLoading(false);
                    })
                })
            })
        // });
        // return unsubscribe;
    },[])

    useFocusEffect(
        useCallback(() => {
            getUser((user)=>setUser(user)).then(()=>{
                getUserBookings(moment(date),(bookings)=>{
                    setBookings(bookings);
                })
            })
            
            // alert(`${moment(date)} ${day}`);
          // Do something when the screen is focused
            // return () => {
                // alert(`${moment(date)} ${day}`);
            // Do something when the screen is unfocused
            // Useful for cleanup functions
            // };
        }, [date,day])
    );

    return (
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
                            <Text style={styles.profileBtnText}>{loading?"Hello, ":"Hello, "+user.FirstName}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                        }}
                        style={styles.topBarBtns}>
                            <MaterialCommunityIcons  name="bell-ring-outline" size={normalize(25)} color="black" />
                    </TouchableOpacity>
                </View>
                <View>
                <CalendarStrip
                    // scrollToOnSetSelectedDate={true}
                    // scrollable={true}
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
                    datesWhitelist={datesWhitelist}
                    datesBlacklist={datesBlacklist}
                    selectedDate={date}
                    onDateSelected={(date)=>handleDateChange(date)}
                    iconContainer={{flex: 0.1}}
                />
            </View>
            {/* <ActivityIndicator animating={true} size={"large"} color={Theme.red} />: */}
            {loading ?
            <Loading/>:
            <ScrollView contentContainerStyle={styles.scrollView}>
                {moment(date).format("YYYY-MM-DD")==moment().format("YYYY-MM-DD")?
                <View style={styles.texts}>
                    <Text style={styles.progressText}>
                        WOD
                    </Text>
                </View>:null}
                {moment(date).format("YYYY-MM-DD")==moment().format("YYYY-MM-DD")?
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
                                    {wod["PartA"]
                                        
                                    }
                                </Text>
                                {/* wod.filter(
                                            object=>{
                                                return object.Date == moment(date).format("YYYY-MM-DD")
                                            }
                                        ).length>0?String(wod[0].PartA).replace(/\\n/g,"\n"):"N/a" */}
                            </View>
                            <Text style={styles.greattagText}>
                                {/* {"KGs"} */}
                            </Text>
                            <View style={styles.progressBtnsView}>
                                <TouchableOpacity
                                    onPress={()=>{navigation.navigate("LeaderBoard",{user:user,wod:wod,part:"A"})}}
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
                                        navigation.navigate("Log",{user:user,wod:wod,part:"A"})
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
                        colors={['white', 'white', 'white']}
                        style={styles.progressCardView}>
                            <Text style={[styles.greatText,{color:"black"}]}>
                                PART B:
                            </Text>
                            <View style={{marginVertical:normalize(10)}}>
                                <Text style={styles.greattagText}>
                                    {
                                        wod["PartB"]
                                        
                                    }
                                </Text>
                                {/* wod.filter(
                                            object=>{
                                                return object.Date == moment(date).format("YYYY-MM-DD")
                                            }
                                        ).length>0?String(wod[0].PartB).replace(/\\n/g,"\n"):"N/a" */}
                            </View>
                            <Text style={styles.greattagText}>
                            </Text>
                            <View style={styles.progressBtnsView}>
                                <TouchableOpacity
                                    onPress={()=>{navigation.navigate("LeaderBoard",{user:user,wod:wod[0],part:"A"})}}
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
                                        navigation.navigate("Log",{user:user,wod:wod,part:"B"})
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
                </View>:null}
                <View style={styles.texts}>
                    <Text style={styles.progressText}>
                        Classes
                    </Text>
                </View>
                <FlatList
                    data={timeTable?(timeTable.classes).sort((obj1,obj2)=>{
                        if (parseInt(obj1.time.substr(0, (obj1.time).indexOf(':'))) > parseInt(obj2.time.substr(0, (obj2.time).indexOf(':')))) {
                            return 1;
                        }

                        if (parseInt(obj1.time.substr(0, (obj1.time).indexOf(':'))) < parseInt(obj2.time.substr(0, (obj2.time).indexOf(':')))) {
                            return -1;
                        }

                        return 0;
                    }):[]}
                    renderItem={({item,index}) =>{
                        let inusers=bookings.filter(obj=>{return obj.ClassTime==item.time && obj.ClassType=="crossFit"})[0];
                        var cap=0;
                        let w8Check=false;
                        if(typeof inusers !=="undefined"){
                            cap=inusers.USERS.length
                            if(inusers.WaitingList.length>0){
                                const found = inusers.WaitingList.find(element => element.uid == user.uid);
                                if(found){
                                    w8Check=true;
                                }
                                

                            }
                        }
                        let bkcond=false;
                        typeof inusers !=="undefined"?inusers.USERS.some(us=>us.uid==user.uid)?bkcond=true:null:null
                        bkcond?setCanBook(false):null
                        if(item.length==0){
                            alert("no classes added yet");
                        }
                        else return(
                            <TouchableOpacity 
                                onPress={()=>{navigation.navigate("Class",{"capacity":item.capacity,user:user,"classTime":item,"classDay":date,"canBook":canBook,classType:"crossFit"})}}
                                style={[styles.classItem,bkcond?{backgroundColor:Theme.red}:w8Check?{backgroundColor:"yellow"}:null]}
                            >
                                <View style={styles.classItemBodyLeft}>
                                    <View style={styles.imageBody}>
                                        <Image style={styles.classImage} source={require("../../../assets/LoginScreenImage1.jpg")}/>
                                    </View>
                                </View>
                                <View style={styles.classItemBodyRight}>
                                    <Text style={[styles.className,bkcond?{color:"white"}:null]}>
                                        {"crossFit"}
                                    </Text>
                                    <Text style={styles.classDescription}>
                                        {item.time}
                                    </Text>
                                    <Text style={styles.classDescription}>
                                        {"Capacity "+cap +"/"+item.capacity}
                                    </Text>
                                </View>

                            </TouchableOpacity>
                            );
                    } }
                />
                <View style={styles.texts}>
                    <Text style={styles.progressText}>
                        OpenBox
                    </Text>
                </View>
                <FlatList
                    data={timeTable?(timeTable.OpenBox).sort((obj1,obj2)=>{
                        if (parseInt(obj1.time.substr(0, (obj1.time).indexOf(':'))) > parseInt(obj2.time.substr(0, (obj2.time).indexOf(':')))) {
                            return 1;
                        }

                        if (parseInt(obj1.time.substr(0, (obj1.time).indexOf(':'))) < parseInt(obj2.time.substr(0, (obj2.time).indexOf(':')))) {
                            return -1;
                        }

                        return 0;
                    }):[]}
                    renderItem={({item,index}) =>{
                        // let inusers=bookings.filter(obj=>{return obj.ClassTime==item.time})[0];
                        // var cap=0;
                        // let bkcond=false;
                        // typeof inusers !=="undefined"?inusers.USERS.some(us=>us.uid==user.uid)?bkcond=true:null:null
                        // if(typeof inusers !=="undefined"){
                        //     cap=inusers.USERS.length
                        // }
                        let inusers=bookings.filter(obj=>{return obj.ClassTime==item.time && obj.ClassType=="openBox"})[0];
                        var cap=0;
                        var w8Check=false
                        if(typeof inusers !=="undefined"){
                            cap=inusers.USERS.length
                            if(inusers.WaitingList.length>0){
                                const found = inusers.WaitingList.find(element => element.uid == user.uid);
                                if (found){
                                    w8Check=true
                                }

                            }
                        }
                        let bkcond=false;
                        typeof inusers !=="undefined"?inusers.USERS.some(us=>us.uid==user.uid)?bkcond=true:null:null
                        bkcond?setCanBookOpenBox(false):null
                        return(
                            <TouchableOpacity 
                                onPress={()=>
                                    {
                                        navigation.navigate("Class",{"capacity":item.capacity,user:user,"classTime":item,"classDay":date,"canBook":canBookOpenBox,classType:"openBox"})
                                    }}
                                style={[styles.classItem,bkcond?{backgroundColor:Theme.red}:w8Check?{backgroundColor:"yellow"}:null]}
                            >
                                <View style={styles.classItemBodyLeft}>
                                    <View style={styles.imageBody}>
                                        <Image style={styles.classImage} source={require("../../../assets/LoginScreenImage1.jpg")}/>
                                    </View>
                                </View>
                                <View style={styles.classItemBodyRight}>
                                    <Text style={[styles.className,bkcond?{color:"white"}:null]}>
                                        {"openBox"}
                                    </Text>
                                    <Text style={styles.classDescription}>
                                        {item.time}
                                    </Text>
                                    <Text style={styles.classDescription}>
                                        {"Capacity "+cap+"/"+item.capacity}
                                    </Text>
                                </View>

                            </TouchableOpacity>
                            );
                    } }
                />
            </ScrollView>}
        <StatusBar style="auto" />
        <FAB
            style={styles.fab}
            icon="chat"
            color='white'
            onPress={() => {
                let url = "whatsapp://send?phone=+393516154019"
                Linking.openURL(url)
                    .then(data => {
                    console.log("WhatsApp Opened successfully " + data);  //<---Success
                    })
                    .catch(() => {
                    alert("Make sure WhatsApp installed on your device");  //<---Error
                    });
            }}
            />
        </View>
    );
}

export default Dashboard;
