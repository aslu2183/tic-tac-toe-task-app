import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../Auth/Login';
import SignUp from '../Auth/Signup';
import HomeScreen from '../Dashboard/Home';
import PlayGround from '../Dashboard/PlayGround';
import { useSelector,useDispatch } from 'react-redux'

const AuthStack = createNativeStackNavigator();
const BottomNavigator = createBottomTabNavigator();


const BottomTab = () => {
    return (
        <BottomNavigator.Navigator>
            <BottomNavigator.Screen name="Home" component={HomeScreen} />
            <BottomNavigator.Screen name="PlayGround" component={PlayGround} />
        </BottomNavigator.Navigator>
    )
}

export default function Routes(){
    const user = useSelector(state => state.auth)
    return (
        <NavigationContainer>
            {
                <AuthStack.Navigator>
                    {
                        !user.isAuthenticated ? (
                            <>
                                <AuthStack.Screen name="Login" component={Login} options={{headerShown:false}} />
                                <AuthStack.Screen name="Signup" component={SignUp} />
                            </>
                            
                        ) : (
                            <AuthStack.Screen name="Dashboard" component={BottomTab} options={{headerShown:false}}></AuthStack.Screen>
                        )
                    }
                </AuthStack.Navigator>
                
            }    
           
        </NavigationContainer>
    )
}

