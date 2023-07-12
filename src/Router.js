import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth'

//Auth Stack
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

//Main Stack
import HomeScreen from './screens/Home/HomeScreen'
import QuestionsScreen from './screens/Questions/QuestionsScreen';
import ResultsScreen from './screens/Results';

import FlashMessage from 'react-native-flash-message';
import {Context} from './context/Context'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </>
  )
}

const MainStack = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Questions' component={QuestionsScreen} />
        <Stack.Screen name='Results' component={ResultsScreen} />
      </Stack.Navigator>
    </>
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

  const [currUser,setCurrUser] = useState({})
  const [loading,setLoading] = useState(false)

  const values ={
    currUser,
    setCurrUser,
    loading,
    setLoading
  }
  return (
    <Context.Provider value={values}>
      <NavigationContainer >
        {user ? <MainStack /> : <AuthStack />}
        <FlashMessage position='top' />
      </NavigationContainer>
    </Context.Provider>
  )
}

export default Router