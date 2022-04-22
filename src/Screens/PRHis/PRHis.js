import React,{useEffect,useState} from "react";
import {Text, View, SafeAreaView, ScrollView,FlatList,TouchableOpacity, Modal,Pressable} from "react-native";
import { MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';
import { TextInput,Avatar } from "react-native-paper";
import { savePR,getPR} from "../../Helpers/PRHelper/PRList";
import styles from "./styles";
import getUser from "../../Helpers/db/getUser";
import { normalize } from "../../Helpers/normalize";
import Theme from "../../Constants/Theme";


const PRHis= ({navigation,route}) => {
    const [title,setTitle]=useState(route.params.title);
    const [user,setUser]=useState(route.params.user);
    const [loading,setLoading]=useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [number,setNumber] = useState("");
    const [reps,setReps]=useState("");
    const [data,setData]=useState({})
    const [rep,setRep]=useState();
    const per=[105,100,95,90,85,80,75,70,65,60,55,50,45,40,35,30]
    useEffect(()=>{
        setLoading(true);
        getUser((user)=>{
            setUser(user);
        }).then(()=>{
            getPR(user.uid,(data)=>{
                // console.log(data,"vhgvhg");
                setData(typeof data=="undefined" || typeof data[title]=="undefined" ?{}:data[title]);
                setRep(typeof data=="undefined"|| typeof data[title]=="undefined" ?null:data[title][String((Object.keys(data[title]))[0])])
                setLoading(false);
            })
        })
    },[])

    useEffect(()=>{
        console.log(rep);
    },[rep])

    return(
        <SafeAreaView style={styles.container}>
        
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <ScrollView style={styles.modalView}>
                    <Text style={styles.modalText}>{title}</Text>
                    <View style={styles.inputsView}>
                        <TextInput
                            mode="outlined"
                            style={styles.input}
                            value={number}
                            onChangeText={(number)=>{setNumber(number)}}
                            theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                            label="KGs"
                        />
                        <TextInput
                            mode="outlined"
                            style={styles.input}
                            value={reps}
                            onChangeText={(reps)=>{setReps(reps)}}
                            theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                            label="REPS"
                        />
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                            onPress={() =>{
                                if(number=="" || reps=="" ){
                                    setModalVisible(!modalVisible);
                                }
                                else{
                                    setLoading(true);
                                    savePR(user.uid,number,reps,title).then(()=>{
                                        setLoading(false);
                                        setModalVisible(!modalVisible);
                                    })
                                }
                                
                            }}
                        >
                        <Text style={styles.textStyle}>{number=="" || reps=="" ?"CLOSE":"SAVE"}</Text>
                    </Pressable>
                </ScrollView>
                </View>
            </Modal>
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
                    onPress={() => setModalVisible(true)}
                    style={styles.topBarBtns}>
                        <MaterialCommunityIcons  name="plus" size={normalize(25)} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView>
            {!loading?
            <>
            <Text style={styles.header}>{"percentage".toUpperCase()}</Text>
            <View style={styles.PerBody}>
            <View style={{marginBottom:normalize(10)}}>
                <FlatList
                    horizontal
                    data={Object.keys(data)}
                    renderItem={({item,index}) =>(
                        <Pressable
                            onPress={()=>{setRep(item)}}
                            style={[styles.button, styles.buttonClose,{marginHorizontal:normalize(4)},rep==item?{backgroundColor:"white"}:null]}>
                            <Text style={[styles.textStyle,rep==item?{color:Theme.red}:null]}>{`${item} REPS`}</Text>
                        </Pressable>
                    )}
                />
            </View>
            {typeof data[rep]!=="undefined"?
            <FlatList
                data={per}
                renderItem={({item,index}) =>(
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            margin: 1,
                            justifyContent:"center",
                            alignItems:"center",
                            borderWidth:2,
                            borderColor:Theme.red,
                            borderRadius:normalize(10),
                        }}>
                        <Text style={styles.perText}>{item+"%"}</Text>
                        <Text style={styles.perText}>{Math.max.apply(Math, (data[rep]).map(function(o) {return Math.round((o.number*item)/100)}))}</Text>
                    </View>
                )}
                numColumns={4}
            />:null}

            </View>
            <Text style={styles.header}>{"History".toUpperCase()}</Text>
            <View style={{justifyContent:"center",alignItems:"center"}}>
                {/* return Object.keys(data).forEach(item=>{ */}
                {Object.keys(data).map(item=>(
                    data[item].map(item2=>(
                        <TouchableOpacity 
                            style={styles.classItem}
                        >
                            <View style={styles.classItemBodyLeft}>
                                <View style={styles.imageBody}>
                                    <Text style={styles.date}>{item2["number"]}</Text>
                                </View>
                            </View>
                            <View style={styles.classItemBodyRight}>
                                <Text style={styles.className}>
                                    {title+" - "+item+" REPS"}
                                </Text>
                                <Text style={styles.classDescription}>
                                    {item2["date"]}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        
                    ))
                ))}
            
            </View>
            
            </>:null}
            </ScrollView>
        </SafeAreaView>
)};



export default PRHis;

