import { StyleSheet,Dimensions,StatusBar, Platform} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { normalize } from "../../Helpers/normalize";
import Constants from "../../Constants/Constants";
import Theme from "../../Constants/Theme";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    calender:{
        height:normalize(90), 
        paddingTop: normalize(10),
        paddingBottom:normalize(10),
        width:width,
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
    workoutText:{
        fontFamily:"OpenSansCondensedBold",
        color:"black",
        fontSize:normalize(25),
        textAlign:"left"
    },
    searchBar:{
        width:width-normalize(40),
        height:normalize(50),
        borderRadius:normalize(20),
        color:Constants.green,
    },
    progressText:{
        fontFamily:"OpenSansCondensedBold",
        color:"black",
        fontSize:normalize(18),
        textAlign:"left"
    },
    scrollView:{
        width:width,
        alignItems:"center",
    },
    progressCardView:{
        // flexDirection:"row",
        marginBottom:normalize(10),
        paddingHorizontal:normalize(20),
        paddingVertical:normalize(20),
        width:width-normalize(40),
        borderRadius:normalize(35),
        height:"auto",
        justifyContent:"space-evenly",
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.3,
        elevation: 3

    },
    progressCardLeftBody:{
        flex:0.5,
        alignItems:"center"
    },
    progressCardRightBody:{
        flex:0.5
    },
    greatText:{
        fontFamily:"OpenSansCondensedBold",
        color:"white",
        fontSize:normalize(18),
    },
    greattagText:{
        fontFamily:"OpenSansCondensedLight",
        color:"black",
        fontSize:normalize(16),
    },
    progressBtnsView:{
        flexDirection:"row",
        width:width-normalize(80),
        height:normalize(35),
        justifyContent:"space-evenly",
        alignItems:"center",
        marginTop:normalize(5),
    },
    progressBtn:{
        flex:0.45,
        height:normalize(40),
        backgroundColor:Theme.red,
        justifyContent:"space-evenly",
        alignItems:"center",
        borderRadius:normalize(30),
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2
    },
    classItem:{
        alignItems:"center",
        paddingHorizontal:normalize(20),
        flexDirection:"row",
        width:width-normalize(42),
        height:normalize(85),
        marginBottom:normalize(10),
        borderRadius:normalize(20),
        backgroundColor:"white",
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2
    },
    classItemBodyLeft:{
        width:normalize(98),
        height:normalize(80),
        borderRadius:normalize(20),
        justifyContent:"center",
    },
    imageBody:{
        width:normalize(60),
        height:normalize(60),
        borderRadius:normalize(20),

    },
    classImage:{
        width:normalize(60),
        height:normalize(60),
        borderRadius:normalize(20),
    },
    className:{
        fontFamily:"OpenSansCondensedBold",
        color:"black",
        fontSize:normalize(18),
    },
    classDescription:{
        fontFamily:"OpenSansCondensedBold",
        color:"#cccccc",
        fontSize:normalize(16),
    },
    classItemBodyRight:{
        marginLeft:normalize(20),
        height:normalize(108),
        justifyContent:"center"
    },
    notFoundImage:{
        marginTop:normalize(100),
        width:width-normalize(100),
        height:normalize(250),
        resizeMode:"contain"
    },
    imageContainer:{
    },
    
  });

export default styles;