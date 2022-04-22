import 'react-native-gesture-handler';
import React,{useState,useEffect,useRef} from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import Loading from './src/Screens/Loading/Loading';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/Navigation/StackNavigation';
import * as Notifications from 'expo-notifications';
// import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

const customFonts = {
  OpenSansCondensedBold: require("./assets/Fonts/OpenSansCondensed-Bold.ttf"),
  OpenSansCondensedLight: require("./assets/Fonts/OpenSansCondensed-Light.ttf"),
  OpenSansCondensedLightItalic:require("./assets/Fonts/OpenSansCondensed-LightItalic.ttf"),
};
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {

    // (async () => {
    //   const { status } = await requestTrackingPermissionsAsync();
    //   if (status === 'granted') {
    //     console.log('Yay! I have user permission to track data');
    //   }
    // })();

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const [loaded] = useFonts(customFonts);
  const [loading,setLoading]=useState(false);
  if (!loaded || !loading) {
    setTimeout(() => {
    setLoading(true)}, 2000)
    return(
      <Loading/>
      )
  }
  return (
    <PaperProvider>
      <NavigationContainer>
          <StackNavigation/>
      </NavigationContainer>
    </PaperProvider>
    
  );
}
