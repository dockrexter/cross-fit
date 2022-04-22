import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View ,Image,TouchableOpacity,ScrollView,Platform,KeyboardAvoidingView} from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import styles from './styles';
import { normalize } from '../../Helpers/normalize';
import Constants from '../../Constants/Constants';
import { TextInput } from 'react-native-paper';
import { Linking } from 'react-native';
import {
    handleSignUp,
    handleLogin,
    handleGoogleSignIn,
    checkAuthState,
    } from '../../Helpers/db/auth';
    // facebookLogin

const Login=({navigation})=> {
    const [email, setEmail] = useState('');
    const [password,setPassword] =useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [register,setRegister] = useState(false);
    const [showPassword,setShowPassword] = useState(true);
    const [loading,setLoading]=useState(true);
    const [user,setUser]=useState(false);
    const [name,setName]=useState("");
    const [surname,setSurname]=useState("");
    const [contact,setContact]=useState("");
    const [codice,setCodice]=useState("");

    useEffect(()=>{
        checkAuthState((state)=>{
            setLoading(true);
            setUser(state)
        })
        .then(()=>{
            if(user==true){
                setLoading(false);
                navigation.replace("Dashboard");
            }
            else{
                setLoading(false);
            }
        })
    })

    return (

        <ScrollView style={styles.container} contentContainerStyle={{alignItems:"center"}}>
        <KeyboardAvoidingView
                style={{justifyContent:"center",alignItems:"center"}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.body}>
                <View
                    style={styles.imageContainer}
                >
                    <Image 
                        style={[styles.LoginScreenImage,register?{width:normalize(190),height:normalize(140)}:null]}
                        source={Constants.logo}
                    />
                </View>
                <View style={styles.inputsView}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(email)=>{setEmail(email)}}
                        theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                        label="Email"
                    />
                    <TextInput
                        style={styles.input}
                        label="Password"
                        secureTextEntry={showPassword}
                        theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                        onChangeText={(password)=>{setPassword(password)}}
                        right={<TextInput.Icon onPress={()=>setShowPassword(prev=>!prev)} name={showPassword?"eye-off":"eye"} />}
                    />
                    {register?
                        <>
                        <TextInput
                            style={styles.input}
                            label="Confirm Password"
                            secureTextEntry={showPassword}
                            theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                            onChangeText={(confirmPassword)=>{setConfirmPassword(confirmPassword)}}
                        />
                        <TextInput
                            style={styles.input}
                            label="Name"
                            theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                            onChangeText={(name)=>{setName(name)}}
                        />
                        <TextInput
                            style={styles.input}
                            label="Surname"
                            theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                            onChangeText={(surname)=>{setSurname(surname)}}
                        />
                        <TextInput
                            style={styles.input}
                            label="Contact"
                            theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                            onChangeText={(contact)=>{setContact(contact)}}
                        />
                        <TextInput
                            style={styles.input}
                            label="Codice Fiscale"
                            theme={{colors: {text: 'black', primary: '#6E1D1D'}}}
                            onChangeText={(codice)=>{setCodice(codice)}}
                        />
                        </>
                        :null}
                </View>
                <Text style={styles.tagline}>
                        {"By :"}
                </Text>
                {loading?
                    <ActivityIndicator animating={true} size={"large"} color={"#6E1D1D"} />:
                    <TouchableOpacity 
                        onPress={()=>{
                            if(register){
                                if(email!=="" && password !=="" && confirmPassword !=="" && name!=="" && surname!=="" && codice !=="" && contact !==""){
                                    if(password==confirmPassword){
                                        setLoading(true);
                                        handleSignUp(email,password,confirmPassword,name,surname,codice,contact)
                                        .then(()=>{
                                            // setLoading(false);
                                            navigation.replace("Dashboard");
                                        })
                                        .catch(err=>{
                                            setLoading(false);
                                            alert(err);
                                        })
                                    }
                                    else{
                                        alert("Password don't match");
                                    }
                                }
                                else{
                                    alert(
                                        "All fields are rquired!"
                                    )
                                }
                                
                            }
                            else{
                                setLoading(true);
                                handleLogin(email,password)
                                .then(()=>{
                                    // setLoading(false);
                                    navigation.replace("Dashboard");
                                    
                                })
                                .catch(err=>{
                                    setLoading(false);
                                    alert(err);
                                })
                            }
                            
                        }}
                        style={styles.loginBtn}>
                        <Text style={styles.loginBtnText}>
                            {register?"Register":"Login"}
                        </Text>
                    </TouchableOpacity>
                }
                
                
                <View style={styles.socialLogins}>
                    
                    <TouchableOpacity 
                        onPress={()=>{
                            handleGoogleSignIn();
                            // navigation.navigate("Home");
                        }}
                        style={[styles.googleLoginBtn,Platform.OS=='ios'?{width:normalize(60),height:normalize(60)}:null]}>
                        <MaterialCommunityIcons  name="gmail" size={normalize(27)} color="white" />
                    </TouchableOpacity>
                    {Platform.OS!=='ios' || Platform.OS!=="android"?
                        <TouchableOpacity
                            onPress={()=>{
                                // facebookLogin();
                            }}
                            style={styles.facebookLoginBtn}>
                                <MaterialCommunityIcons  name="facebook" size={normalize(28)} color="white" />
                        </TouchableOpacity>
                    :null}
                </View>
                <View style={styles.signUpView}>
                    <Text style={styles.tagline}>
                        {"Agrees to all "}
                    </Text>
                    <Text 
                    onPress={()=>{
                        let url = "https://crossfitbolzano.com/dichiarazione-liberatoria-modulo-di-adesione/"
                        Linking.openURL(url)
                            .then(data => {
                            })
                            .catch(() => {
                            alert("Make sure you have network connection");
                            });

                    }}
                    style={[styles.signUpBtn,{textDecorationLine:"underline"}]}>
                        {"terms and conditions"}
                    </Text>
                </View>
            
                <View style={styles.signUpView}>
                    <Text style={styles.tagline}>
                        {register?"Login with email: ":"Not a member? "}
                    </Text>
                    <Text onPress={()=>{setRegister(prev=>!prev)}}style={styles.signUpBtn}>
                        {register?"Login":"Sign Up"}
                    </Text>
                </View>
            </View>
        <StatusBar style="auto" />
        </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default Login;
