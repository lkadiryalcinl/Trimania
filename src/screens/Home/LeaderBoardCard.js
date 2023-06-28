import { StyleSheet,Dimensions, Text, View,Image } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'
import getAvatar from '../../utils/getAvatar'

const LeaderBoardCard = ({id,icon,username,score,user,userID}) => {  
  const isActiveUser = user?.userID === userID;

 return ( 
    <View style={isActiveUser ? styles.active_container : styles.container}>
      <View style={styles.index_container}>
        <Text style={isActiveUser ? styles.active_text : styles.text}>{id}</Text>
      </View>
      <View style={styles.icon_container}>
        <Image source={getAvatar(isActiveUser ? user.icon : icon)} style={styles.image}/>
      </View>
      <View style={styles.username_container}>
        <Text style={isActiveUser ? styles.active_text : styles.text}>{isActiveUser ? user.username : username}</Text>
      </View>
      <View style={styles.score_container}>
        <Text style={isActiveUser ? styles.active_text : styles.text}>{score}</Text>
      </View>
    </View>
  )
}

export default LeaderBoardCard

const styles = StyleSheet.create({
    container:{
        height:Dimensions.get('screen').height/12,	
        backgroundColor:'#D4D4D4',
        margin:6,
        marginHorizontal:12,
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