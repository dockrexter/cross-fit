import { StyleSheet,Dimensions,StatusBar, Platform} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { normalize } from "../../Helpers/normalize";
import Constants from "../../Constants/Constants";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Theme from "../../Constants/Theme";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    body:{
        flex:1,
        marginTop:normalize(50),
    },
    topBar:{
        width:width,
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:getStatusBarHeight(),
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
    texts:{
        width:width,
        marginVertical:normalize(15),
        paddingLeft:normalize(25),
    },
    logView:{
        flexDirection:"row",
        width:width-normalize(20),
        height:normalize(150),
        justifyContent:"space-evenly",
        alignItems:"center",
        marginTop:normalize(5),
        borderRadius:normalize(30),
        backgroundColor:"white",
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2
    },
    input:{
        flex:0.4,
        height:normalize(50),
        backgroundColor:"transparent",
    },
    buttons:{
        flex:0.3,
        height:normalize(50),
        backgroundColor:Theme.red,
        borderRadius:normalize(30),
        alignItems:"center",
        justifyContent:"center",
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2
    },
    
    greatText:{
        fontFamily:"OpenSansCondensedBold",
        color:"white",
        fontSize:normalize(18),
    },
});

export default styles;