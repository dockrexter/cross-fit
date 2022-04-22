import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Login/Login';
import Dashboard from '../Screens/Dashboard/Dashboard';
import Class from '../Screens/Class/Class';
import UserProfile from '../Screens/Profile/Profile';
import EditProfile from '../Screens/EditProfile/EditProfile';
import PR from '../Screens/PR/PR';
import PRHis from '../Screens/PRHis/PRHis';
import Membership from '../Screens/Membership/Membership';
import LeaderBoard from '../Screens/LeaderBoard/LeaderBoard';
import LeaderBoardList from '../Screens/LeaderBoardList/LeaderBoardList';
import Payment from '../Screens/Payment/Payment';
import Log from '../Screens/Log/Log';
// import Class from '../Screens/Class/Class';
// import EditProfile from '../screens/EditProfile/EditProfile';
// import UserProfile from '../screens/Profile/Profile';
// import Log from '../screens/Log/Log';
// import LeaderBoardList from '../screens/LeaderBoardList/LeaderBoardList';
// import Membership from '../screens/Membership/Membership';
// import Payment from '../screens/Payment/Payment';


const Stack = createStackNavigator();


const StackNavigation= ()=> {

  return (
    <Stack.Navigator
        initialRouteName={"Login"}
        screenOptions={{
            gestureEnabled:true,
            headerShown:false,

        }}
    >
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Class" component={Class} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Membership" component={Membership} /> 
        <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
        <Stack.Screen name="LeaderBoardList" component={LeaderBoardList} />
        <Stack.Screen name="Log" component={Log} />  
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="PR" component={PR} />  
        <Stack.Screen name="PRHis" component={PRHis} />  

        
    </Stack.Navigator>
  );
}
export default StackNavigation;