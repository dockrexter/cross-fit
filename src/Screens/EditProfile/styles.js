import { StyleSheet,Dimensions,StatusBar, Platform} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { normalize } from "../../Helpers/normalize";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:getStatusBarHeight(),
    //   alignItems: 'center',
    },
    body:{
        width:width-normalize(40),
        alignItems:"center",
    },
    profilePicContainer:{
        width:width,
        height:normalize(120),
        justifyContent:"center",
        alignItems:"center",
        marginTop:normalize(25),
    },
    profilePic:{
        borderRadius:100,
        resizeMode:"contain",
        height:normalize(80),
        width:normalize(80),
    },
    imageContainer:{
    },
    inputsView:{
        width:"80%"
    },
    input:{
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginTop:normalize(10),
        height:normalize(50),
    },
    
    socialLogins:{
        flexDirection:"row",
    },
   
    tagline:{
        fontFamily:"OpenSansCondensedBold",
        color:"#cccccc",
        fontSize:normalize(16),
        textAlign:"center"
    },
    loginBtn:{
        marginTop:normalize(50),
        height:normalize(50),
        justifyContent:"center",
        alignItems:"center",
        width:(width/2)-normalize(50),
        borderRadius:normalize(15),
        borderWidth:2,
        borderColor:"black",
        marginBottom:normalize(12),
    },
    googleLoginBtn:{
        height:normalize(40),
        justifyContent:"center",
        alignItems:"center",
        width:normalize(40),
        borderRadius:normalize(100),
        // borderWidth:2,
        // borderColor:"black",
        marginBottom:normalize(12),
        backgroundColor:"#D90000"
    },
    loginBtnText:{
        fontFamily:"OpenSansCondensedBold",
        color:"black",
        fontSize:normalize(16),
        textAlign:"center"
    },
    facebookLoginBtn:{
        height:normalize(40),
        justifyContent:"center",
        alignItems:"center",
        width:normalize(40),
        borderRadius:normalize(100),
        marginBottom:normalize(12),
        marginLeft:normalize(20),
        backgroundColor:"#4267B2"

    },
    signUpView:{
        flexDirection:"row",
        justifyContent:"center",
        marginBottom:normalize(15),
    },
    signUpBtn:{
        fontFamily:"OpenSansCondensedBold",
        color:"#6E1D1D",
        fontSize:normalize(16),
    },
    topBar:{
        width:width,
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:normalize(20),
    },
    topBarBtns:{
        height:normalize(40),
        justifyContent:"center",
        alignItems:"center",
        width:normalize(40),
        borderRadius:normalize(100),
        marginBottom:normalize(12),
        backgroundColor:"white",
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 2
    },
    profileBtn:{
        height:normalize(40),
        justifyContent:"center",
        alignItems:"center",
        width:normalize(220),
        borderRadius:normalize(100),
        marginBottom:normalize(12),
        backgroundColor:"white",
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        elevation: 1
    },
    profileBtnText:{
        fontFamily:"OpenSansCondensedLight",
        color:"black",
        fontSize:normalize(16),
        textAlign:"center"
    },

  });

export default styles;