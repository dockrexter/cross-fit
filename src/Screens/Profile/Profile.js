import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {View,TouchableOpacity,Keyboard,ScrollView} from 'react-native';
import {Text,Divider,List} from 'react-native-paper';
import { MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';
import styles from './styles';
import { normalize } from '../../Helpers/normalize';
import { FAB,Avatar} from 'react-native-paper';
import Theme from '../../Constants/Theme';
import { Linking } from 'react-native';
import { auth } from '../../Firebase/firebase';
import { CommonActions } from '@react-navigation/native';




const UserProfile=({route,navigation})=> {

    const handleLogout=()=>{
        auth.signOut().then(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                    { name: 'Login' },
                    ],
                })
            );
        })
        .catch((error) => {
            alert("Make sure you have network connection")
        });
    };
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
                    style={styles.profileBtn}>
                        <Text style={styles.profileBtnText}>{"Hello, "+route.params.user.FirstName}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        // navigation.navigate("Home");
                    }}
                    style={styles.topBarBtns}>
                        <MaterialCommunityIcons  name="bell-ring-outline" size={normalize(25)} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.profilePicContainer}>
            <Avatar.Image size={normalize(80)}  source={route.params.user.Picture?{uri:route.params.user.Picture}:require('../../../assets/USER.png')}/>
            </View>
            <ScrollView style={styles.profileSettings}>
            <List.Section>
                    <List.Subheader>Profile Settings</List.Subheader>
                    <TouchableOpacity onPress={()=>navigation.navigate("EditProfile",{user:route.params.user})}>
                    <List.Item title="Personal Information" left={() => <List.Icon icon="account" color={Theme.red} />} onPress={()=>navigation.navigate('EditProfile',{user:route.params.user})} />
                        {/* <List.Item title="Personal Information" left={() => <List.Icon color="#000" icon="account" color={Theme.red} />} onPress={()=>navigation.navigate('Membership',{user:route.params.user})/> */}
                        <Divider />
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <List.Item title="Membership Plans" left={() => <List.Icon icon="file-document" color={Theme.red} />} onPress={()=>navigation.navigate('Membership',{user:route.params.user})} />
                        <Divider />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <List.Item title="PR" left={() => <List.Icon icon="file-document" color={Theme.red} />} onPress={()=>navigation.navigate('PR')} />
                        <Divider />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=>{handleLogout()}}
                        >
                        <List.Item title="Logout" left={() => <List.Icon icon="logout" color={Theme.red} />} />
                        <Divider />
                    </TouchableOpacity>
            </List.Section>
        </ScrollView>
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
        <FAB
            style={styles.rightFab}
            icon="home"
            color='white'
            onPress={() => {
                navigation.navigate("Dashboard");
            }}
            />
        </View>
    );
}

export default UserProfile;
