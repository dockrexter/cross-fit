import { StyleSheet,StatusBar,Dimensions} from "react-native";
import Theme from "../../Constants/Theme";
import { normalize } from "../../Helpers/normalize";
import { getStatusBarHeight } from 'react-native-status-bar-height';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal:normalize(16),
        backgroundColor:"white",
    },
    item: {
        fontFamily:"OpenSansCondensedlight",
        backgroundColor: "white",
        padding:normalize(10),
        marginVertical: normalize(8),
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 2
    },
    header: {
        paddingLeft:normalize(10),
        paddingVertical:normalize(10),
        color:"white",
        fontFamily:"OpenSansCondensedBold",
        fontSize: normalize(22),
        backgroundColor: Theme.red
    },
    title: {
        fontSize:normalize(20) 
    },
    topBar:{
        width:width,
        flexDirection:"row",
        justifyContent:"space-between",
        alignSelf:"center",
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
});


export default styles;
