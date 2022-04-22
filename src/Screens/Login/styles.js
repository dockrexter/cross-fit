import { StyleSheet,Dimensions,StatusBar, Platform} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { normalize } from "../../Helpers/normalize";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    body:{
        flex:1,
        height:height-normalize(40),
        width:width-normalize(40),
        justifyContent:"space-between",
        alignSelf:"center",
        alignItems:"center",
    },
    LoginScreenImage:{
        marginTop:getStatusBarHeight()+normalize(5),
        width:width-normalize(40),
        height:(height/3),
        resizeMode:"contain"
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
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },

});

export default styles;