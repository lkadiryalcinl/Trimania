import { Dimensions,StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ActivityIndicator } from 'react-native'
import colors from '../utils/colors'

const CustomButton = ({ onPress, icon, loading, label }) => {


  return (
    <TouchableOpacity styles={styles.container} onPress={onPress}>
      {loading ?
        <ActivityIndicator
          
        />
        :
        <View style={styles.inner_container}>
          <>
            <Icon
              name='access-point'
              size={30}
              color={colors.fg}
            />

            <Text style={styles.text}>{label}</Text>
          </>
        </View>
      }

    </TouchableOpacity>

  )
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'flex-end'
  },
  inner_container: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    backgroundColor:colors.ac,
    marginHorizontal:Dimensions.get('screen').width/4,
    padding:4,
    elevation: 20,
    shadowColor: '#52006A',
    
  },
  text:{
    color:colors.fg,
    fontSize:24
  }
})