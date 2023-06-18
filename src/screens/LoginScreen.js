import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const LoginScreen = ({navigation}) => {
  return (
    <View>
      <Text>LoginScreen</Text>
      <Button onPress={() => navigation.navigate('Register')} title='press me'/>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  
})