import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import colors from '../../utils/colors'
import getAvatar from '../../utils/getAvatar'
import findUserRank from '../../firebase/findUserRank'

const LeaderBoardCard = ({id,icon,username,score}) => {
  const [userRank,setUserRank] = useState(0)
  const [control,setControl] = useState(false)
  
  useEffect(() => {
    const handleChange = async() => {
      setUserRank(await findUserRank())
      if(userRank === id) {
        setControl(true)
      }
      else{
        setControl(false)
      }
    }
    handleChange()
  },[userRank])

  return ( 
    <View style={control?styles.active_container:styles.container}>
      <View style={styles.index_container}>
        <Text style={control?styles.active_text:styles.text}>{id}</Text>
      </View>
      <View style={styles.icon_container}>
        <Image source={getAvatar(icon)} style={styles.image}/>
      </View>
      <View style={styles.username_container}>
        <Text style={control?styles.active_text:styles.text}>{username}</Text>
      </View>
      <View style={styles.score_container}>
        <Text style={control?styles.active_text:styles.text}>{score}</Text>
      </View>
    </View>
  )
}

export default LeaderBoardCard

const styles = StyleSheet.create({
    container:{
        height:Dimensions.get('screen').height/12,	
        backgroundColor:'#D4D4D4',
        margin:5,
        borderRadius:5,
        flexDirection:'row',
        paddingVertical:5
    },
    active_container:{
      height:Dimensions.get('screen').height/12,	
        backgroundColor:colors.ac,
        margin:5,
        borderRadius:5,
        flexDirection:'row',
        paddingVertical:5
    },
    index_container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    icon_container:{
        width:60,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:50,
        backgroundColor:colors.bg
    },
    username_container:{
        flex:3,
        justifyContent:'center',
        alignItems:'center'
    },
    score_container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:60,
        height:60,
        resizeMode:'contain'
    },
    text:{
        fontSize:18,
        flexWrap:'wrap',
        color:colors.black,
    },
    active_text:{
      fontSize:18,
        flexWrap:'wrap',
        color:colors.fg,
    }
})