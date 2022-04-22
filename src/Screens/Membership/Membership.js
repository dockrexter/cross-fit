import React,{useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View,TouchableOpacity,Keyboard,ScrollView,Alert} from 'react-native';
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { normalize } from '../../Helpers/normalize';
import Theme from '../../Constants/Theme';
import { ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import getMemberships from '../../Helpers/MembershipHelper/MembershipsFb';
import getUser from '../../Helpers/db/getUser';
import { useStripe } from '@stripe/stripe-react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { AnnualFee,Packages,Plans} from '../../Helpers/PaymentHelper/AnnualFee';
import moment from "moment"

const Membership=({route,navigation})=> {
    const [plans,setPlans]=useState({});
    const [user,setUser]=useState();
    const [loading,setLoading]=useState(true);
    const stripe = useStripe();

    function toDateTime(secs) {
        return moment(parseInt(secs)).format("YYYY-MM-DD");
    }

    useEffect(async()=>{
        setLoading(true);
        await getMemberships((plans)=>{
            setPlans(plans);
        })
        await getUser((user)=>{
            setUser(user);
            setLoading(false);
        })
    },[])

    
    const donate = async (plan,amount,TotalEntries,ValidFrom,ValidThru) => {
        setLoading(true);
        try {
            const finalAmount = parseInt(amount);
            let obj={
                "user-email":user.Email,
                "uid":user.uid,
                "plan": plan,
                "amount": (finalAmount+0.50)*100,
            }
            const response = await fetch("https://crossfit-bolzano.herokuapp.com/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
            });
            const data = await response.json();
            if (!response.ok) {
                setLoading(false);
                return Alert.alert(data.message);
            }
            const initSheet = await stripe.initPaymentSheet({
                paymentIntentClientSecret: data.clientSecret,
                merchantDisplayName: "CrossFit",
            });
            if (initSheet.error) {
                console.error(initSheet.error);
                setLoading(false);
                return Alert.alert(initSheet.error.message);
            }
            const presentSheet = await stripe.presentPaymentSheet({
                clientSecret: data.clientSecret,
            });
            if (presentSheet.error) {
                console.error(presentSheet.error);
                setLoading(false);
                return Alert.alert(presentSheet.error.message);
            }
            Alert.alert("Payment successfull!");
            if(plan=="Annual Fee"){
                setLoading(true);
                AnnualFee(user.uid)
                .then(()=>{
                    setLoading(false);
                })
            }
            else if(plan=="Packages"){
                setLoading(true);
                Packages(user.uid,0,amount,TotalEntries,plan,ValidFrom,ValidThru)
                .then(()=>{
                    setLoading(false);
                })
            }
            else{
                setLoading(true);
                Plans(user.uid,0,amount,TotalEntries,plan,ValidFrom,ValidThru)
                .then(()=>{
                    setLoading(false);
                })
            }
            
        } catch (err) {
            console.error(err);
            setLoading(false);
            Alert.alert("Payment failed!");
        }
    };

    return (
        // pk_test_51KcxxpAev9YOfEHruQ3juQb8WJVfIx5x7tWGIJg422c7FF62ouGXhqv274ubbR1324Nmmsnsq88uUymXERR25PU400sra9OGio
        <StripeProvider publishableKey="pk_live_51KjlexK9SRSsZsTiOg6NFEAy2x1jJTWSkPbYGtjIQmuSbQkgdOrcibksCUrf8JgI0mJMm4UhJyNmmluG8jSzxoOI00nPEHzsAB">
            <View onTouchStart={Keyboard.dismiss} style={styles.container}>
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
                            navigation.navigate("Home",{user:user});
                        }}
                        style={styles.topBarBtns}>
                            <MaterialCommunityIcons  name="bell-ring-outline" size={normalize(25)} color="black" />
                    </TouchableOpacity>
                </View>
                {loading ?
                <ActivityIndicator animating={true} size={"large"} color={Theme.red} />:
                <ScrollView
                    contentContainerStyle={styles.scrollView}>
                    <View style={styles.texts}>
                        <Text style={styles.progressText}>
                            Membership
                        </Text>
                    </View>
                    {/* {user.ValidThru} */}
                    <View>
                        <LinearGradient
                            // Button Linear Gradient
                            colors={['white', 'white', 'white']}
                            style={styles.progressCardView}>
                                <Text style={[styles.greatText,{color:"black"}]}>
                                    Gold Membership
                                </Text>
                                {(user).ValidFrom=="" && (user).ValidThru==""?
                                <View>
                                    <View style={{marginVertical:normalize(10)}}>
                                        <Text style={styles.greattagText}>
                                        {"Be a gold member to enjoy all membership plans"}
                                        </Text>
                                    </View>
                                    <View style={{marginVertical:normalize(10)}}>
                                        <Text style={styles.greattagText}>
                                        {typeof plans["Annual Fee"] == "undefined" ? "N/a" :"JUST IN : "+ plans["Annual Fee"]["Price"] +" € Annually"}
                                        </Text>
                                    </View>
                                    <View style={styles.progressBtnsView}>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                Alert.alert(
                                                        "Bank Transfer",
                                                        `Dati Bancari 
                                                        \n Intestatario: BARBELLS & MOUNTAINS ASSOCIAZIONE  SPORTIVA DILETTANTISTICA
                                                        \n IBAN: IT09G0818435640000002157178
                                                        \n Causale: ABBONAMENTO SCELTO + Nome&Cognome + Email
                                                        \n * 0.50 service charges via card`,
                                                        [
                                                            {
                                                                text: "OK",
                                                                onPress: () => console.log("Cancel Pressed"),
                                                                style: "OK"
                                                            },
                                                            { text: "Pay with card", onPress: () => donate("Annual Fee",plans["Annual Fee"]["Price"]) }
                                                        ]
                                                    );
                                                    
                                                }}
                                            style={styles.progressBtn} 
                                            >
                                                <View>
                                                    <Text style={[styles.greatText]}>
                                                        BUY NOW!
                                                    </Text>
                                                </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :<View>
                                    <View style={{marginVertical:normalize(10)}}>
                                        <Text style={styles.greattagText}>
                                        {"VALID FROM : "+toDateTime((user).ValidFrom)}
                                        </Text>
                                    </View>
                                    <Text style={styles.greattagText}>
                                        {"VALID THRU : "+toDateTime((user).ValidThru)}
                                    </Text>
                                </View>
                                }
                        </LinearGradient>
                    </View>
                    {user.Plan.Type!=""?
                    <>
                        <View style={styles.texts}>
                            <Text style={styles.progressText}>
                                Your Plan
                            </Text>
                        </View>
                        <LinearGradient
                            // Button Linear Gradient
                            colors={['white', 'white', 'white']}
                            style={styles.progressCardView}>
                            <Text style={[styles.greatText,{color:"black"}]}>
                                {user.Plan.Type}
                            </Text>
                            <View>
                                <View style={{marginVertical:normalize(10)}}>
                                    <Text style={styles.greattagText}>
                                        {"TOTAL ENTRIES : "+(user.Plan).TotalEntries}
                                    </Text>
                                </View>
                                <View style={{marginVertical:normalize(10)}}>
                                    <Text style={styles.greattagText}>
                                        {"USED ENTRIES : "+(user.Plan).Entries}
                                    </Text>
                                </View>
                                {toDateTime((user.Plan).ValidFrom)!="Invalid date"?
                                <>
                                <View style={{marginVertical:normalize(10)}}>
                                    <Text style={styles.greattagText}>
                                    {"VALID FROM : "+toDateTime((user.Plan).ValidFrom)}
                                    </Text>
                                </View>
                                <View style={{marginVertical:normalize(10)}}>
                                    <Text style={styles.greattagText}>
                                        {"VALID THRU : "+toDateTime((user.Plan).ValidThru)}
                                    </Text>
                                </View>
                                </>:null}
                                <View style={{marginVertical:normalize(10)}}>
                                    <Text style={styles.greattagText}>
                                        {"PRICE : "+(user.Plan).Price +" €"}
                                    </Text>
                                </View>
                            </View>
                            
                        </LinearGradient>
                    </>:null}
                    {Object.keys(plans).map(item=>{
                        // && (user).ValidFrom !="" && item!="Packages"
                        if(item!="Annual Fee" && (user).ValidFrom !="" && item!="Packages"){
                        return(
                            <>
                            <View style={styles.texts}>
                                <Text style={styles.progressText}>
                                    {item}
                                </Text>
                            </View>
                            {Object.keys(plans[item]).map(item2=>{
                                if(item2!="Name")
                                return(
                                    <LinearGradient
                                        // Button Linear Gradient
                                        colors={['white', 'white', 'white']}
                                        style={styles.progressCardView}>
                                            <Text style={[styles.greatText,{color:"black"}]}>
                                                {"PACKAGE : "+item2}
                                            </Text>
                                            <View>
                                                <Text style={styles.greattagText}>
                                                    {plans[item][item2]["Entries"]==-1?"ENTRIES : SIX DAYS A WEEK":"ENTRIES : "+plans[item][item2]["Entries"]}
                                                </Text>
                                                <Text style={styles.greattagText}>
                                                    {"PRICE  : "+plans[item][item2]["Price"]+" €"}
                                                </Text>
                                                <View style={styles.progressBtnsView}>
                                                    <TouchableOpacity
                                                        onPress={()=>{
                                                            let from=moment();
                                                            let to;
                                                            if(item=="Annual"){
                                                                to=moment().add(365,"days");
                                                            }
                                                            else if(item=="Monthly"){
                                                                to=moment().add(30,"days");
                                                            }
                                                            else if(item=="Six Months"){
                                                                to=moment().add(180,"days");
                                                            }
                                                            else{
                                                                to=moment().add(90,"days");
                                                            }
                                                            Alert.alert(
                                                                "Bank Transfer",
                                                                `Dati Bancari 
                                                                \n Intestatario: BARBELLS & MOUNTAINS ASSOCIAZIONE  SPORTIVA DILETTANTISTICA
                                                                \n IBAN: IT09G0818435640000002157178
                                                                \n Causale: ABBONAMENTO SCELTO + Nome&Cognome + Email
                                                                \n * 0.50 service charges via card`,
                                                                [
                                                                    {
                                                                        text: "OK",
                                                                        onPress: () => console.log("Cancel Pressed"),
                                                                        style: "OK"
                                                                    },
                                                                    { text: "Pay with card", onPress: () => donate(item,plans[item][item2]["Price"],plans[item][item2]["Entries"]==-1?270:plans[item][item2]["Entries"],from,to) }
                                                                ]
                                                            );
                                                            }}
                                                        style={styles.progressBtn} 
                                                        >
                                                            <View>
                                                                <Text style={[styles.greatText]}>
                                                                    BUY NOW!
                                                                </Text>
                                                            </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                    </LinearGradient>
                                )
                            })}
                            </>
                        )}
                        if(item=="Packages"){
                            return(
                                <>
                                    <View style={styles.texts}>
                                        <Text style={styles.progressText}>
                                            {item}
                                        </Text>
                                    </View>
                                    {Object.keys(plans[item]).map(item2=>{
                                        if(item2!="Name")
                                        return(
                                            <LinearGradient
                                                // Button Linear Gradient
                                                colors={['white', 'white', 'white']}
                                                style={styles.progressCardView}>
                                                    <Text style={[styles.greatText,{color:"black"}]}>
                                                        {"PACKAGE : "+item2}
                                                    </Text>
                                                    <View>
                                                        <Text style={styles.greattagText}>
                                                            {plans[item][item2]["Entries"]==-1?"ENTRIES : SIX DAYS A WEEK":"ENTRIES : "+plans[item][item2]["Entries"]}
                                                        </Text>
                                                        <Text style={styles.greattagText}>
                                                            {"PRICE  : "+plans[item][item2]["Price"]+" €"}
                                                        </Text>
                                                        <View style={styles.progressBtnsView}>
                                                            <TouchableOpacity
                                                                onPress={()=>{
                                                                    Alert.alert(
                                                                        "Bank Transfer",
                                                                        `Dati Bancari 
                                                                        \n Intestatario: BARBELLS & MOUNTAINS ASSOCIAZIONE  SPORTIVA DILETTANTISTICA
                                                                        \n IBAN: IT09G0818435640000002157178
                                                                        \n Causale: ABBONAMENTO SCELTO + Nome&Cognome + Email
                                                                        \n * 0.50 service charges via card`,
                                                                        [
                                                                            {
                                                                                text: "OK",
                                                                                onPress: () => console.log("Cancel Pressed"),
                                                                                style: "OK"
                                                                            },
                                                                            { text: "Pay with card", onPress: () => donate("Packages",plans[item][item2]["Price"],plans[item][item2]["Entries"],"","") }
                                                                        ]
                                                                    );
                                                                    }}
                                                                style={styles.progressBtn} 
                                                                >
                                                                    <View>
                                                                        <Text style={[styles.greatText]}>
                                                                            BUY NOW!
                                                                        </Text>
                                                                    </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                            </LinearGradient>
                                        )
                                    })}
                                </>
                            )
                        }

                    })}
                </ScrollView>}
            <StatusBar style="auto" />
            </View>
        </StripeProvider>
    );
}

export default Membership;

