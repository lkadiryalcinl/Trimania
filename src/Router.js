import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth'

//Auth Stack
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen';

//Main Stack
import HomeScreen from './screens/Home/HomeScreen'
import QuestionsScreen from './screens/Questions/QuestionsScreen';

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  )
}

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Questions' component={QuestionsScreen} />
    </Stack.Navigator>
  )
}


const Router = () => {

  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  return (
    <NavigationContainer >
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default Router