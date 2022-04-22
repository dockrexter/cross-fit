import React from 'react';
import { StyleSheet,View,Image} from 'react-native';
import { normalize } from '../../Helpers/normalize';



const Loading=()=> {
    return(
        <View style={styles.container}>
            <Image
            style={{width: normalize(200), height:normalize(400),resizeMode:"contain"}}
            source={require("../../../assets/loading.gif")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Loading;