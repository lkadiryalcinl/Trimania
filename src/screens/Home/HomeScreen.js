import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={() => auth().signOut()} title='press me'/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})