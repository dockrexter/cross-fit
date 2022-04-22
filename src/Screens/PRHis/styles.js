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
        marginVertical:normalize(5),
        color:"white",
        fontFamily:"OpenSansCondensedBold",
        fontSize: normalize(22),
        backgroundColor: "grey"
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
    PRsBody:{
        height:normalize(100),
        
    },
    PerBody:{
        height:"auto",
    },
    modalView: {
        margin: normalize(20),
        backgroundColor: "white",
        borderRadius: normalize(20),
        padding: normalize(35),
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: normalize(10),
        padding: normalize(15),
        elevation: 2
    },
    buttonClose: {
        backgroundColor: Theme.red,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontFamily:"OpenSansCondensedBold",
        fontSize:normalize(20),
        marginBottom: normalize(15),
        textAlign: "center"
    },
    inputsView:{
        width:"100%",
        marginBottom:normalize(20),
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
    classItem:{
        alignItems:"center",
        paddingHorizontal:normalize(20),
        flexDirection:"row",
        width:width-normalize(20),
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
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Theme.red,
        borderRadius:normalize(60),

    },
    date:{
        fontFamily:"OpenSansCondensedBold",
        color:"#cccccc",
        fontSize:normalize(22),
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
    perText:{
        fontFamily:"OpenSansCondensedBold",
        color:Theme.red,
        fontSize:normalize(18),
    }
});


export default styles;
