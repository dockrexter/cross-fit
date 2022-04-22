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
    //   justifyContent: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor:Theme.red,
        elevation:50,
      },
    rightFab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
    backgroundColor:Theme.red,
    elevation:50,
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
    findText:{
        fontFamily:"OpenSansCondensedLight",
        color:"black",
        fontSize:normalize(25),
        textAlign:"left"
    },
    
    scrollView:{
        width:width,
        alignItems:"center",
    },
    profilePicContainer:{
        width:width,
        height:normalize(120),
        justifyContent:"center",
        alignItems:"center",
    },
    profilePic:{
        height:normalize(80),
        width:normalize(80),
    },
    profileSettings:{
        flex:1,
        marginBottom:normalize(45),
        width:width
    }

  });

export default styles;