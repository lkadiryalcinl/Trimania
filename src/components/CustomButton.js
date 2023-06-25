import { Dimensions,StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { ActivityIndicator } from 'react-native'
import colors from '../utils/colors'
 
const CustomButton = ({ onPress, icon, loading, label,disabled }) => {


  return (
    <TouchableOpacity styles={styles.container} onPress={onPress} disabled={disabled}>
      {loading ?
        <ActivityIndicator
          
        />
        :
        <View style={styles.inner_container}>
          <>
          {
            icon 
            &&
            <Icon
            name={icon.name}
            size={icon.size}
            color={icon.color}
          /> 
          }

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
    fontSize:24,
    marginLeft:8
  }
})