import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, Image, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import findUserById from '../../firebase/findUserById';
import updateIcon from '../../firebase/updateIcon'
import getAvatar from '../../utils/getAvatar';
import CustomButton from '../../components/CustomButton';
import colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth'

const screen = Dimensions.get('window');
const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

const ChangeIcon = ({ modalVisible, setModalVisible }) => {
  const [user, setUser] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setUser(await findUserById(auth().currentUser.uid));
    };
    fetchData();
  }, []);

  const handleSubmit = async (newIconValue) => {
    if (user.icon !== newIconValue) {
      await updateIcon(newIconValue);
      setModalVisible(false);
      navigation.replace('Home');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedIcon(item)}>
      <Image
        source={getAvatar(item)}
        style={[
          styles.image,
          selectedIcon === item ? styles.selectedIcon : null
        ]}
      />
      {selectedIcon === item && <Icon name='check' size={36} color={colors.ac} style={styles.check_icon_style} />}
    </TouchableOpacity>
  );

  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <View style={styles.container}>
      <Modal
        isVisible={modalVisible}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.line} />
          <FlatList
            data={numbers}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatList}
          />
        </View>
        <View style={styles.button}>
        <CustomButton label={'Edit'} icon={{ name: 'edit', size: 18, color: colors.fg }} onPress={(selectedIcon ? () => handleSubmit(selectedIcon) : () => { })} style={styles.button} />

        </View>
      </Modal>
    </View>
  );
};

export default ChangeIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: colors.fg,
    height: '50%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
  line: {
    width: '20%',
    height: 10,
    backgroundColor: '#ccc',
    marginVertical: 15,
    borderRadius:20,
  },
  flatList: {
    flexGrow: 1,
  },
  image: {
    width: screen.width / 3,
    height: screen.height / 4,
  },
  selectedIcon: {
    borderWidth: 3,
    borderColor: colors.ac,
    borderRadius: 50,
  },
  check_icon_style: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  button:{
    position: 'absolute',	
    bottom:0,
    left:0,
    right:0,
  }
});
