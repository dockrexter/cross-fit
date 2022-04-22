import React,{useEffect,useState} from "react";
import {Text, View, SafeAreaView, SectionList,TouchableOpacity} from "react-native";
import { MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';
import styles from "./styles";
import { getPRList } from "../../Helpers/PRHelper/PRList";
import getUser from "../../Helpers/db/getUser";
import { normalize } from "../../Helpers/normalize";



const PR = ({navigation,route}) => {
    const [data,setdata]=useState({});
    const [user,setUser]=useState();
    const [loading,setLoading]=useState(true);

    const Item = ({ title }) => (
        <TouchableOpacity
            onPress={()=>navigation.navigate("PRHis",{user:user,title:title})}
            style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
    useEffect(()=>{
        setLoading(true);
        getUser((user)=>setUser(user))
        getPRList().then(obj=>{
            setdata(obj);
            setLoading(false);
        })
    },[])

    return(
        <SafeAreaView style={styles.container}>
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
            {!loading?
            <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title.toUpperCase()}</Text>
            )}
            />:null}
        </SafeAreaView>
    )
};



export default PR;