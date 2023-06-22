import { StyleSheet, Text, View,Button,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'

import colors from '../../utils/colors'
import findUserById from '../../firebase/findUserById'

const HomeScreen = () => {
  const [user,setUser] = useState([])

  useEffect(() => {

    const fetchUser = async () => {
      setUser(await findUserById(auth().currentUser.uid))
    }
    fetchUser()

  },[])

  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <View style={styles.icon_container}>
          <Image source={require('../../assets/Avatars/Avatar1.jpg')} style={styles.image} />
        </View>
        <View style={styles.text_container}>
          <Text style={styles.text}>are you ready? <Text style={[styles.text,{}]}>{user.username}</Text></Text>
        </View>
      </View>
      <View style={styles.mid_container}>

      </View>
      <View style={styles.bottom_container}>
        <Button onPress={() => auth().signOut()} title='press me'/>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.bg
  },
  top_container:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  mid_container:{
    flex:4,
    backgroundColor:'green'
  },
  bottom_container:{
    flex:1,
    backgroundColor:'blue'
  },
  icon_container:{
    flex:1,
    backgroundColor:'purple',
    alignItems:'center'
  },
  text_container:{
    flex:1,
    alignItems:'center',
    backgroundColor:'pink'
  },
  text:{
    fontSize:20,
    color:colors.ac,
  },
  image: {
    width:100,
    height:100,
    resizeMode:'contain'
  }
})