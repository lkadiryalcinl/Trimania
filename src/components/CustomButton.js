import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { ActivityIndicator } from 'react-native'
import colors from '../utils/colors'

const CustomButton = ({ onPress, icon, label, loading = false, disabled = false }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled} 
      style={styles.container}>
      <View style={styles.innerContainer}>
        {loading ?
          <View style={styles.activityContainer}>
            <ActivityIndicator color="#E6E6FA" style={styles.activityIndicator}/>
            <View style={styles.spacer} />
          </View>
          :
          <>
            {icon && <Icon {...icon} />}
            {label && <Text style={styles.text}>{label}</Text>}
          </>
        }
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.ac,
    paddingVertical: 4,
    paddingHorizontal:16,
    alignSelf: 'center',
    elevation: 20,
    shadowColor: '#52006A',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24, // Adjust based on the width of your text
    height: 24, // Adjust based on the height of your icon
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    flexGrow: 1,
  },
  text: {
    color: colors.fg,
    fontSize: 24,
    marginLeft: 8
  }
})
