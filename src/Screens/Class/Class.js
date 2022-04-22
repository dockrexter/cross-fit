import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Keyboard, ScrollView, FlatList, Alert } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { normalize } from '../../Helpers/normalize';
import {
    Avatar,
    ActivityIndicator
} from 'react-native-paper';
import moment from 'moment';
import { FAB } from 'react-native-paper';
import { dbRef } from '../../Firebase/firebase';
import {
    doc,
    setDoc,
    onSnapshot,
    collection,
    getDocs,
    where,
    query,
    arrayUnion,
    arrayRemove,
    increment,
} from "firebase/firestore";
import Loading from '../Loading/Loading';


const Class = ({ route, navigation }) => {
    const [user, setUser] = useState(route.params.user);
    const [classDay, setClassDay] = useState(route.params.classDay);
    const [classTime, setClassTime] = useState(route.params.classTime);
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleCancelWaitingList = () => {
        setLoading(true);
        const document = String(moment(classDay).format("YYYY-MM-DD") + " " + classTime.time);
        const bookingsRef = doc(dbRef, 'Bookings', document);
        let user = {
            FirstName: route.params.user.FirstName,
            uid: route.params.user.uid,
            Picture: route.params.user.Picture,
            Email: route.params.user.Email,
        }
        setDoc(bookingsRef, {
            WaitingList: arrayRemove(user),
        }, { merge: true }).then(() => {
            setLoading(false);
            alert("removed from waiting list")
        })
    }
    const handleWaitngList = async () => {
        // alert(route.params.user);
        setLoading(true);
        const document = String(moment(classDay).format("YYYY-MM-DD") + " " + classTime.time);
        const bookingsRef = doc(dbRef, 'Bookings', document);
        let user = {
            FirstName: route.params.user.FirstName,
            uid: route.params.user.uid,
            Picture: route.params.user.Picture,
            Email: route.params.user.Email,
        }
        let from = moment();
        let to;
        if (route.params.user.Plan["Type"] == "Annual") {
            to = moment().add(365, "days");
        }
        else if (route.params.user.Plan["Type"] == "Monthly") {
            to = moment().add(30, "days");
        }
        else if (route.params.user.Plan["Type"] == "Six Months") {
            to = moment().add(180, "days");
        }
        else if (route.params.user.Plan["Type"] == "Three Months") {
            to = moment().add(90, "days");
        }
        if (route.params.user.Plan["ValidThru"] == "" && route.params.user.Plan["ValidFrom"] == "" && route.params.user.Plan["Type"] != "Packages") {
            setDoc(doc(dbRef, 'Users', String(route.params.user.uid)), {
                Plan: {
                    ValidFrom: `${from}`,
                    ValidThru: `${to}`
                }
            }, { merge: true })
        }
        setDoc(bookingsRef, {
            WaitingList: arrayUnion(user),
        }, { merge: true }).then(() => {
            setLoading(false);
            alert("added to waiting list")
        })
    }
    const handleBooking = async () => {
        setLoading(true);
        const document = String(moment(classDay).format("YYYY-MM-DD") + " " + classTime.time);
        const bookingsRef = doc(dbRef, 'Bookings', document);
        let user = {
            FirstName: route.params.user.FirstName,
            uid: route.params.user.uid,
            Picture: route.params.user.Picture,
            Email: route.params.user.Email,
        };
        setDoc(bookingsRef, {
            USERS: arrayUnion(user),
        }, { merge: true })
            .then(() => {
                let from = moment();
                let to;
                if (route.params.user.Plan["Type"] == "Annual") {
                    to = moment().add(365, "days");
                }
                else if (route.params.user.Plan["Type"] == "Monthly") {
                    to = moment().add(30, "days");
                }
                else if (route.params.user.Plan["Type"] == "Six Months") {
                    to = moment().add(180, "days");
                }
                else if (route.params.user.Plan["Type"] == "Three Months") {
                    to = moment().add(90, "days");
                }
                if (route.params.user.Plan["ValidThru"] == "" && route.params.user.Plan["ValidFrom"] == "" && route.params.user.Plan["Type"] != "Packages") {
                    setDoc(doc(dbRef, "Users", String(route.params.user.uid)), {
                        Plan: {
                            ValidFrom: `${from}`,
                            ValidThru: `${to}`
                        }
                    }, { merge: true })
                }
                setDoc(doc(dbRef, "Users", String(route.params.user.uid)), {
                    Plan: {
                        Entries: increment(1)
                    }
                }, { merge: true }).then(() => {
                    setLoading(false);
                })
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

    }

    const handleCancelBooking = () => {
        setLoading(true);
        const document = String(moment(classDay).format("YYYY-MM-DD") + " " + classTime.time);
        const bookingsRef = doc(dbRef, 'Bookings', document);
        let user = {
            FirstName: route.params.user.FirstName,
            uid: route.params.user.uid,
            Picture: route.params.user.Picture,
            Email: route.params.user.Email,
        }
        setDoc(bookingsRef, {
            USERS: arrayRemove(user),
        }, { merge: true }).then(() => {
            if (usersList.USERS.length <= usersList.Capacity && usersList.WaitingList.length > 0) {
                let firstUser = usersList.WaitingList[0];
                setDoc(bookingsRef, {
                    USERS: arrayUnion(firstUser),
                }, { merge: true }).then(() => {
                    setDoc(bookingsRef, {
                        WaitingList: arrayRemove(firstUser),
                    }, { merge: true }).then(() => {
                        setDoc(dbRef, "Users", doc(String(firstUser.uid)), {
                            Plan: {
                                Entries: increment(1)
                            }
                        }, { merge: true })
                    })
                })
                    .then(async () => {
                        const q = query(collection(dbRef, "Bookings"), where("USERS", "array-contains", firstUser), where("ClassDate", "==", String(moment(route.params.classDay).format("YYYY-MM-DD"))));
                        const querySnapshot = await getDocs(q);
                        // dbRef.collection("Bookings").where("USERS", "array-contains", firstUser).where("ClassDate","==",String(moment(route.params.classDay).format("YYYY-MM-DD"))).get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, route.params.classTime, " => ", doc.data());
                            if (String(route.params.classTime.time) != doc.data()["ClassTime"]) {
                                setDoc(doc(dbRef, "Bookings", String(doc.id)),
                                    {
                                        USERS: arrayRemove(firstUser),
                                    }, { merge: true })
                            }
                        });
                    });
                // })
            }

            setDoc(doc(dbRef, "Users", String(route.params.user.uid)), {
                Plan: {
                    Entries: increment(-1)
                }
            }, { merge: true })
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        console.log(route.params.canBook, classDay, classTime);
        setLoading(true);
        const document = String(moment(classDay).format("YYYY-MM-DD") + " " + classTime.time);
        console.log(document);
        const bookingsRef = doc(dbRef, 'Bookings', document);
        const unsubscribe = onSnapshot(bookingsRef, {
            includeMetadataChanges: true
        }, (doc) => {
            if (typeof doc.data() == "undefined") {
                setDoc(bookingsRef, {
                    ClassType:route.params.classType,
                    ClassDate: moment(classDay).format("YYYY-MM-DD"),
                    ClassTime: classTime.time,
                    USERS: [],
                    WaitingList: [],
                    Capacity: route.params.capacity
                })
                    .then(() => {
                        setLoading(false);
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            }
            else {
                setUsersList(doc.data());
                setLoading(false);
            }

        });
        return unsubscribe;
    }, [])
    if (loading) {
        return (
            <View style={[styles.container]}>
                <View style={styles.topBar}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("LeaderBoard", { user: user });
                        }}
                        style={styles.topBarBtns}>
                        <MaterialIcons name="leaderboard" size={normalize(25)} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("UserProfile", { user: user });
                        }}
                        style={styles.profileBtn}>
                        <Text style={styles.profileBtnText}>{"Hello, " + user.FirstName}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Home", { user: user });
                        }}
                        style={styles.topBarBtns}>
                        <MaterialCommunityIcons name="bell-ring-outline" size={normalize(25)} color="black" />
                    </TouchableOpacity>
                </View>
                <Loading/>
                {/* <ActivityIndicator style={styles.ActivityIndicator} animating={true} size={"large"} color={"#6E1D1D"} /> */}
            </View>
        );
    }
    else return (
        <View onTouchStart={Keyboard.dismiss} style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("LeaderBoard", { user: user });
                    }}
                    style={styles.topBarBtns}>
                    <MaterialIcons name="leaderboard" size={normalize(25)} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("UserProfile", { user: user });
                    }}
                    style={styles.profileBtn}>
                    <Text style={styles.profileBtnText}>{"Hello, " + user.FirstName}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Home", { user: user });
                    }}
                    style={styles.topBarBtns}>
                    <MaterialCommunityIcons name="bell-ring-outline" size={normalize(25)} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.texts}>
                    <Text style={styles.progressText}>
                        {"Members - " + (usersList.USERS).length + "/" + route.params.capacity}
                    </Text>
                </View>
                <FlatList
                    data={usersList.USERS}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={styles.classItem}
                        >
                            <View style={styles.classItemBodyLeft}>
                                <View style={styles.imageBody}>
                                    <Avatar.Image size={normalize(60)} source={item.Picture ? { uri: item.Picture } : require('../../../assets/USER.png')} />
                                </View>
                            </View>
                            <View style={styles.classItemBodyRight}>
                                <Text style={styles.className}>
                                    {item.FirstName}
                                </Text>
                                <Text style={styles.classDescription}>
                                    {"HURRAH!"}
                                </Text>
                            </View>

                        </TouchableOpacity>
                    )}
                />
                <View style={styles.texts}>
                    <Text style={styles.progressText}>
                        {"Waiting List - " + (usersList.WaitingList).length}
                    </Text>
                </View>
                <FlatList
                    data={usersList.WaitingList}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={styles.classItem}
                        >
                            <View style={styles.classItemBodyLeft}>
                                <View style={styles.imageBody}>
                                    <Avatar.Image size={normalize(60)} source={item.Picture ? { uri: item.Picture } : require('../../../assets/USER.png')} />
                                </View>
                            </View>
                            <View style={styles.classItemBodyRight}>
                                <Text style={styles.className}>
                                    {item.FirstName}
                                </Text>
                                <Text style={styles.classDescription}>
                                    {"HURRAH!"}
                                </Text>
                            </View>

                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
            <StatusBar style="auto" />
            {!(usersList.USERS).some(item => item.uid == user.uid) && !(usersList.WaitingList).some(item => item.uid == user.uid) ?
                <FAB
                    style={styles.fab}
                    icon="plus"
                    color='white'
                    label='Join now'
                    onPress={() => {
                        if (user.Plan.Entries < user.Plan.TotalEntries) {
                            if (parseInt((classTime.time).substr(0, (classTime.time).indexOf(':'))) - parseInt(moment().format("HH")) > 1 || moment(classDay).format("YYYY-MM-DD") !== moment().format("YYYY-MM-DD")) {
                                if (route.params.canBook) {
                                    if ((usersList.USERS).length < route.params.capacity) {
                                        handleBooking();
                                    }
                                    else {
                                        Alert.alert(
                                            "No Capacity",
                                            "Press okay if you want to be added in waiting list",
                                            [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => console.log("Cancel Pressed"),
                                                    style: "cancel"
                                                },
                                                { text: "OK", onPress: () => handleWaitngList() }
                                            ]
                                        );
                                    }
                                }
                                else {
                                    if ((usersList.USERS).length == route.params.capacity) {
                                        Alert.alert(
                                        "No Capacity",
                                        "Press okay if you want to be added in waiting list",
                                        [
                                            {
                                                text: "Cancel",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                            },
                                            { text: "OK", onPress: () => handleWaitngList() }
                                        ]
                                    );
                                    }
                                    else{
                                        alert("You have alredy booked in another class");
                                    }
                                    
                                    
                                }

                            }
                            else {


                                alert("You are late");
                            }
                        }
                        else {
                            alert("you have used all your entries")
                        }

                    }}
                />
                : <FAB
                    style={styles.fab}
                    icon="minus"
                    color='white'
                    label='Cancel booking'
                    onPress={() => {
                        if (!(usersList.WaitingList).some(item => item.uid == user.uid)) {
                            handleCancelBooking();
                        }
                        else {
                            handleCancelWaitingList();
                        }

                    }}
                />}
        </View>
    );
}

export default Class;
