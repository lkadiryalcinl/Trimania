import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../utils/colors';

const CustomInput = ({ placeholder, onChangeText, secret = false, value, icon, error }) => {
  const [passEntry, setPassEntry] = useState(secret);

  return (
    <View styles={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center',marginHorizontal:6 }}>
          {icon ? <Icon name={icon?.name} size={icon?.size} color={icon?.color} /> : null}
        </View>
        <View >
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            secureTextEntry={passEntry}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={'#D4D4D4'}
            autoCapitalize='none'
          />
        </View>

        <View style={{ position: 'absolute', right: Dimensions.get('screen').width / 28, top: 12 }}>
          {
            secret ? (
              <Icon
                name={passEntry ? 'eye-off' : 'eye'}
                size={24}
                onPress={() => setPassEntry(!passEntry)}
                style={{ marginHorizontal: 8, color: 'grey' }}
              />
            )
              : null
          }
        </View>
      </View>
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
  container: {
  },
  textInput: {
    backgroundColor: colors.fg,
    borderRadius: 5,
    marginBottom:8,
    width: Dimensions.get('screen').width / 1.15,
    elevation: 20,
    shadowColor: '#52006A',
    color:colors.black
  }
})