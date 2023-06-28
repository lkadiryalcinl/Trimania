import { StyleSheet, Dimensions, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import Modal from "react-native-modal";
import getAvatar from '../../utils/getAvatar'
import auth from '@react-native-firebase/auth'
import findUserById from '../../firebase/findUserById'
import Button from '../../components/CustomButton'
import colors from '../../utils/colors'

import Icon from 'react-native-vector-icons/AntDesign'
import updateIcon from '../../firebase/updateIcon'

const changeIcon = ({ modalVisible, setModalVisible, navigation }) => {
  const [user,setUser] = useState([])
  const [selectedIcon, setSelectedIcon] = useState()

  useEffect(() => {
    const fetchData = async() => {
      setUser(await findUserById(auth().currentUser.uid))
    }
    fetchData()
  },[])

  let numbers = [];
  for (let i = 1; i <= 12; i++) {
    numbers.push(i);
  }

  const handleSubmit = async (newIconValue) => {
    if (user.icon !== newIconValue) {
      await updateIcon(newIconValue)
      setModalVisible(!modalVisible)
      navigation.replace('Home')
    }
  }


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedIcon(item)}>
      <Image
        source={getAvatar(item)}
        style={[
          styles.image,
          selectedIcon === item ? styles.selectedIcon : null
        ]}
      />
      {selectedIcon === item ? <Icon name='check' size={36} color={colors.ac} style={styles.check_icon_style} /> : null}
    </TouchableOpacity>
  );

  const toggleModal = () => setModalVisible(!modalVisible)

  return (
    <View style={styles.container}>
      <Modal
        isVisible={modalVisible}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        style={styles.modal}
      >
        <View style={styles.inside_modal}>
          <View style={styles.flatList}>

          <FlatList
            data={numbers}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
          </View>
          <View style={styles.button}>
            <Button label={'Edit'} icon={{ name: 'edit', size: 18, color: colors.fg }} onPress={(selectedIcon ? () => handleSubmit(selectedIcon) : () => { })} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default changeIcon

const screen = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  inside_modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: screen.width,
    height: '50%',
  },
  button: {
    flex:1,
    position:'absolute',
    alignSelf:'center',
    bottom:0
  },
  flatList:{
    flex:8
  },
  image: {
    width: screen.width / 3 - 16,
    height: screen.height / 4,
    margin:4
  },
  selectedIcon: {
    width: screen.width / 3,
    height: screen.height / 4,
    borderWidth: 1,
    borderColor: colors.ac,
    borderRadius: 50
  },
  check_icon_style: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center'
  },
  warn:{
    color:colors.warn
  }
})