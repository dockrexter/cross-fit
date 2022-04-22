import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View ,Image,TouchableOpacity,ScrollView,KeyboardAvoidingView,Platform} from 'react-native';
import { MaterialCommunityIcons,MaterialIcons,Octicons} from '@expo/vector-icons';
import { ActivityIndicator,Avatar} from 'react-native-paper';
import styles from './styles';
import { normalize } from '../../Helpers/normalize';
import { TextInput } from 'react-native-paper';
import { dbRef,storage} from '../../Firebase/firebase';
import { ref,uploadBytes,getDownloadURL } from "firebase/storage";
import Theme from '../../Constants/Theme';
import getUser from '../../Helpers/db/getUser';
import * as ImagePicker from 'expo-image-picker';
import { Linking } from 'react-native';
import { MaskedTextInput} from "react-native-mask-text";
import Loading from '../Loading/Loading';
import { 
    doc,
    setDoc,
} from "firebase/firestore";
import moment from "moment";


const EditProfile=({navigation,route})=> {
    const [email, setEmail] = useState(route.params.user.Email);
    const [firstName,setFirstName] = useState(route.params.user.FirstName);
    const [lastName,setLastName]=useState(route.params.user.LastName);
    const [profilePicture,setProfilePicture]=useState(route.params.user.Picture);
    const [loading,setLoading]=useState(false);
    const [codice,setCodice] =useState(route.params.user.CodiceFiscale);
    const [uploading,setUploading]=useState(false);
    const [user,setUser]=useState();
    const [openDate,setOpenDate]=useState("");
    const [expiryDate,setExpiryDate]=useState("");
    const [save,setSave]=useState(true);
    const uploadDp = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
        });
        
        let uri;
        if (result.cancelled) {
            return;
        }
        else{
            uri=result.uri
        }
        try {
            setUploading(true);
            const fetchResponse = await fetch(uri);
            const blob = await fetchResponse.blob();
            // var storageRef = ;
            var mountainImagesRef = ref(storage, `${"ProfilePictures/"+user.uid}.png`);
            uploadBytes(mountainImagesRef, blob).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(mountainImagesRef)
                .then((url)=>{
                    var obj;
                    obj={
                        Picture:String(url),
                    }
                    setDoc(doc(dbRef, "Users", String(user.uid)),obj,{merge:true}).then(()=>{
                        alert("UpLoad SuccessFull!");
                        setUploading(false);
                    })
                })
            });
        } 
        catch (error) {
            console.log('ERR: ' + error.message);
        }
        
	}

    const pickDocument = async (docType) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
        });
        
        let uri;
        if (result.cancelled) {
            return;
        }
        else{
            uri=result.uri
        }
        try {
            setUploading(true);
            const fetchResponse = await fetch(uri);
            const blob = await fetchResponse.blob();
            // var storageRef = ;
            var mountainImagesRef = ref(storage, `${docType+"/"+user.uid}.pdf`);
            uploadBytes(mountainImagesRef, blob).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(mountainImagesRef)
                .then((url)=>{
                    var obj;
                    if(docType=="CodiceFiscale"){
                        obj={
                            CodiceFiscaleDoc:String(url),
                        }
                    }
                    else{
                        obj={
                            MadicalCertificateDoc:String(url),
                        }
                    }
                    setDoc(doc(dbRef, "Users", String(user.uid)),obj,{merge:true}).then(()=>{
                        alert("UpLoad SuccessFull!");
                        setUploading(false);
                    })
                })
            });
        } 
        catch (error) {
            console.log('ERR: ' + error.message);
        }
        
	}
    useEffect(()=>{
        setLoading(true);
        console.log("in useffect")
        getUser((user)=>{
            setUser(user);
            setFirstName(user.FirstName);
            setLastName(user.LastName);
            setProfilePicture(user.Picture);
            setCodice(user.CodiceFiscale);
            setExpiryDate(user.ExpMadicalCertificte);
            setOpenDate(user.ExpMadicalCertificte);
        })
        .then(()=>{
            setLoading(false);
        })
        console.log(route.params.user);
    },[save,uploading])


    const saveProfile=async ()=>{
        setLoading(true);
        var obj={
            FirstName:firstName,
            LastName:lastName,
            CodiceFiscale:codice,
        }
        obj["ExpMadicalCertificte"]=openDate!==""?openDate:expiryDate
        await setDoc(doc(dbRef, "Users", user.uid),obj,{merge:true});
        setLoading(false);
        setSave(prev=>!prev);
    }

    if(loading){
        return(
            <Loading/>
        );
    }
    
    return (
        <ScrollView style={styles.container} >
            <KeyboardAvoidingView
                style={{justifyContent:"center",alignItems:"center"}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.body}>
            
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
                            <Text style={styles.profileBtnText}>{user?"Hello, "+user.FirstName:"Hello, "}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            // navigation.navigate("Home");
                        }}
                        style={styles.topBarBtns}>
                            <MaterialCommunityIcons  name="bell-ring-outline" size={normalize(25)} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{alignSelf:"center",margin:normalize(5)}}>
                {typeof user!="undefined" && !loading ?
                [
                    
                    user["MadicalCertificateDoc"]=="" || expiryDate=="" || moment(new Date(expiryDate)) < moment() ?
                <View style={{alignItems:"center"}}>
                    <Octicons name="unverified" size={24} color="#6E1D1D" />
                    <Text style={{color:"#6E1D1D"}}>{"Upload medical certificate to get verified"}</Text>
                </View>:
                <View style={{alignItems:"center"}}>
                    <Octicons name="verified" size={24} color="green" />
                    <Text style={{color:"green"}}>{"Verified!"}</Text>
                </View>]:null} 
                </View>
                <View style={styles.profilePicContainer}>
                    <Avatar.Image size={normalize(80)}  source={user?{uri:user.Picture}:require('../../../assets/USER.png')}/>
                    <TouchableOpacity onPress={()=>uploadDp()} style={{flexDirection:"row",alignItems:"center",padding:normalize(5),margin:normalize(5)}}>
                        <Text style={[styles.profileBtnText,{color:Theme.red,paddingRight:normalize(10)}]}>Upload Image</Text>
                        <Octicons name="cloud-upload" size={24} color="#6E1D1D" />
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.inputsView}>
                    <TextInput
                        mode="outlined"
                        style={styles.input}
                        value={firstName}
                        onChangeText={(firstName)=>{setFirstName(firstName)}}
                        theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                        label="First Name"
                    />
                    <TextInput
                        mode="outlined"
                        style={styles.input}
                        value={lastName}
                        onChangeText={(lastName)=>{setLastName(lastName)}}
                        theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                        label="Last Name"
                    />
                    <TextInput
                        mode="outlined"
                        style={styles.input}
                        disabled
                        value={email}
                        onChangeText={(email)=>{setEmail(email)}}
                        theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                        label="Email"
                    />
                    <TextInput
                        mode="outlined"
                        style={styles.input}
                        value={codice}
                        onChangeText={(codice)=>{setCodice(codice)}}
                        theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                        label="Codice Fiscale Code"
                    />
                    <TextInput
                        mode="outlined"
                        style={styles.input}
                        theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                        render={props=>
                            <MaskedTextInput
                                {...props}
                                mask="9999-99-99"
                                value={openDate}
                                // onFocus={()=>{setOpenDate(true)}}
                                onChangeText={(exp)=>{
                                    setOpenDate(exp);
                                    console.log(openDate);
                                }}
                                placeholder="YYYY-MM-DD"
                                keyboardType="numeric"
                                label="expiry date madical certificate"
                            />
                        }
                        // label="expiry date madical certificate"
                    />
                    <Text>{"expiry date(medical certificate) : "+expiryDate}</Text>
            
                    
                    {/* {!route.params.user.social?
                    <TextInput
                        mode="outlined"
                        style={styles.input}
                        label="Password"
                        secureTextEntry={showPassword}
                        theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                        onChangeText={(password)=>{setPassword(password)}}
                        right={<TextInput.Icon onPress={()=>setShowPassword(prev=>!prev)} name={showPassword?"eye-off":"eye"} />}
                    />:null} */}
                    <View style={{alignItems:"center",marginTop:normalize(20)}}> 
                        <TouchableOpacity
                            style={[{flexDirection:"row",width:"auto",paddingHorizontal:normalize(10),height:normalize(50)}]}>
                                <Text onPress={()=>{Linking.openURL(user["CodiceFiscaleDoc"])}} style={[styles.profileBtnText,{color:Theme.red,paddingRight:normalize(10)}]}>{"VIEW CODICE FISCALE |"}</Text>
                                <Text onPress={async()=>{
                                        await pickDocument("CodiceFiscale");
                                    }} style={[styles.profileBtnText,{paddingRight:normalize(10)}]}>{" UPLOAD CODICE FISCALE"}</Text>
                                <MaterialIcons name="upload-file" size={normalize(15)} color={Theme.red} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            
                            style={[{flexDirection:"row",width:"auto",paddingHorizontal:normalize(10),height:normalize(50)}]}>
                                <Text onPress={()=>{Linking.openURL(user["MadicalCertificateDoc"])}} style={[styles.profileBtnText,{color:Theme.red,paddingRight:normalize(10)}]}>{"VIEW MEDICAL CERTIFICATE |"}</Text>
                                <Text onPress={()=>{
                                    pickDocument("MadicalCirtificate");
                                }}  style={[styles.profileBtnText,{paddingRight:normalize(10)}]}>{"UPLOAD MEDICAL CIRTIFICATE "}</Text>
                                <MaterialIcons name="upload-file" size={normalize(15)} color={Theme.red} />
                        </TouchableOpacity>
                        
                        
                    </View>
                </View>
                
                {uploading?
                    <ActivityIndicator animating={true} size={"large"} color={"#6E1D1D"} />
                :<TouchableOpacity 
                    onPress={()=>{
                        saveProfile();
                    }}
                    style={styles.loginBtn}>
                    <Text style={styles.loginBtnText}>
                        {"SAVE"}
                    </Text>
                </TouchableOpacity>}
                
            </View>
            </KeyboardAvoidingView>
        <StatusBar style="auto" />

        </ScrollView>
    );
}

export default EditProfile;
