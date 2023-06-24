import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'

import Button from '../../components/CustomButton'
import colors from '../../utils/colors'
import findUserById from '../../firebase/findUserById'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/FontAwesome'

import LeaderBoard from './LeaderBoard'
import getAvatar from '../../utils/getAvatar'
import findUserRank from '../../firebase/findUserRank'
import ChangeIcon from './changeIcon'

const HomeScreen = () => {
  const [user, setUser] = useState([])
  const [loading,setLoading] = useState(false)
  const [userRank, setUserRank] = useState()
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchUser = async () => {
      setUser(await findUserById(auth().currentUser.uid))
      setUserRank(await findUserRank())
      setLoading(false)
    }
    fetchUser()
  }, [userRank])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => auth().signOut()}>
        <Icon2 name='sign-out' color={colors.ac} size={32} style={{ position: 'absolute', right: 16, top: 8 }} />
      </TouchableOpacity>

      <View style={styles.top_container}>
        
        <TouchableOpacity style={styles.icon_container} onPress={() => {setModalVisible(!modalVisible)}}>
          {loading?<ActivityIndicator size={24} style={styles.indicator} color={colors.fg}/>:<Image source={getAvatar(user.icon)} style={styles.image} />}
          <Icon name='edit' color={'white'} size={24} style={styles.icon_style} />
          <ChangeIcon modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </TouchableOpacity>

        <View style={styles.text_container}>
          <Text style={styles.text}>Are you ready? {loading?<ActivityIndicator size={20} style={styles.indicator} color={colors.ac}/>:<Text style={[styles.text, { color: colors.ac }]}>{user.username}</Text>}</Text>          
          <Text style={styles.text}>Your current rank is : {loading?<ActivityIndicator size={20} style={styles.indicator} color={colors.ac}/>:<Text style={[styles.text, { color: colors.ac }]}>{userRank?userRank:'Not exist'}</Text>}</Text>                      
        </View>
      </View>

      <View style={styles.mid_container}>
        <LeaderBoard />
      </View>

      <View style={styles.bottom_container}>
        <Button label={'Start Game'} icon={{name:'right' , size:24, color:colors.fg}}/>
      </View>

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg
  },
  top_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  mid_container: {
    flex: 4,
    backgroundColor: colors.bg
  },
  bottom_container: {
    flex: 1,
    backgroundColor:colors.bg,
    justifyContent:'center'
  },
  icon_container: {
    width:100,
    height:100,
    marginLeft: 8,
    borderRadius: 50,
    backgroundColor: 'purple',
    alignSelf: 'auto'
  },
  text_container: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'flex-end',
    marginBottom:16
  },
  text: {
    fontSize: 20,
    color: colors.black,
    flexWrap:'wrap'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  icon_style: {
    position: 'absolute',
    bottom: Dimensions.get('screen').height / 24,
    right: 6
  },
  indicator:{position:'absolute',top:0,right:0,left:0,bottom:0}
})