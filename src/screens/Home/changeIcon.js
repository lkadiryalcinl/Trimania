import { StyleSheet, Dimensions, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'

import Modal from "react-native-modal";
import getAvatar from '../../utils/getAvatar'
import auth from '@react-native-firebase/auth'
import findUserById from '../../firebase/findUserById'
import Button from '../../components/CustomButton'
import colors from '../../utils/colors'

import Icon from 'react-native-vector-icons/AntDesign'
import updateIcon from '../../firebase/updateIcon'

const changeIcon = ({ modalVisible, setModalVisible }) => {
  const user = findUserById(auth().currentUser.uid)
  const [selectedIcon, setSelectedIcon] = useState(user.icon)

  let numbers = [];
  for (let i = 1; i <= 12; i++) {
    numbers.push(i);
  }

  const handleSubmit = async(newIconValue) => {
    await updateIcon(newIconValue)
    setModalVisible(!modalVisible)
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
      {selectedIcon === item?<Icon name='check' size={24} color={colors.ac} style={styles.check_icon_style}/>:null}
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
          <FlatList
            data={numbers}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
          <Button label={'Edit'} icon={{name:'edit',size:18,color:colors.fg}} onPress={(selectedIcon?() => handleSubmit(selectedIcon):() => {})}/>
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
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'white',
    width: screen.width,
    height: '50%',
    paddingBottom: 20,
    paddingVertical:8,
  },
  button: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: 'lightgray',
    padding: 10,
  },
  image: {
    width:screen.width/3-8,
    height:screen.height/4
  },
  selectedIcon: {
    width:screen.width/3,
    height:screen.height/4,
    borderWidth:1,
    borderColor:colors.ac,
    borderRadius:50
  },
  check_icon_style: {
    position:'absolute',
    bottom:0,
    alignSelf:'center'
  }
})