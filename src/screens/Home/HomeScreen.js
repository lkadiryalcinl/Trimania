import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  BackHandler,
} from 'react-native'

import React,
{
  useContext,
  useEffect,
  useState
} from 'react'

import LinearGradient from 'react-native-linear-gradient'

import auth from '@react-native-firebase/auth'

import Button from '../../components/CustomButton'
import colors from '../../utils/colors'
import Icon from 'react-native-vector-icons/AntDesign'

import LeaderBoard from './LeaderBoard/LeaderBoard'
import getAvatar from '../../utils/getAvatar'
import { findUserById,findUserRank } from '../../firebase/UserTransactions'
import ChangeIcon from './Modals/changeIcon'
import ChooseModal from './Modals/ChooseModal'
import { Context } from '../../context/Context'

const HomeScreen = () => {
  const {currUser:user,setCurrUser:setUser} = useContext(Context)

  const [loading, setLoading] = useState(true);  // loading state'i default olarak true ayarlandı.
  const [userRank, setUserRank] = useState();
  const [changeIcon, setChangeIcon] = useState(false);
  const [chooseModal, setChooseModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await findUserById(auth().currentUser.uid);
      const rank = await findUserRank();
      setUser(user);
      setUserRank(rank);
      setLoading(false);  // loading state'i asenkron işlemler tamamlandıktan sonra false olarak set edildi.
    };

    fetchUserData();

  }, [userRank]);

  

  const signOutControl = () =>
    Alert.alert(
      "Sign Out",
      "Do you really want to quit?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => auth().signOut()
        }
      ]
    );

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.bg, colors.bg2]}
      style={styles.container}
    >
      <TouchableOpacity onPress={signOutControl}>
        <Icon name='logout' color={colors.fg} size={32} style={{ position: 'absolute', right: 16, top: 8 }} />
      </TouchableOpacity>

      <View style={styles.top_container}>
        {loading
          ? <ActivityIndicator size={32} style={styles.indicator} color={colors.ac} />
          :
          <>
            <TouchableOpacity style={styles.icon_container} onPress={() => { setChangeIcon(!changeIcon) }}>
              <Image source={user ? getAvatar(user.icon) : require('../../assets/Avatars/Avatar1.png')} style={styles.image} />
              <Icon name='edit' color={'white'} size={24} style={styles.icon_style} />
              <ChangeIcon modalVisible={changeIcon} setModalVisible={setChangeIcon}/>
            </TouchableOpacity>

            <View style={styles.text_container}>
              <Text style={styles.text}>Are you ready? <Text style={[styles.text,{color:colors.ac}]}>{user ? user.username : ''}</Text></Text>
              <Text style={styles.text}>Your current rank is : <Text style={[styles.text,{color:colors.ac}]}>{userRank ? userRank : 'Not exist'}</Text></Text>
            </View>
          </>

        }
      </View>


      <View style={styles.mid_container}>
        <LeaderBoard />
      </View>

      <View style={styles.bottom_container}>
        <Button label={'Start Game'} icon={{ name: 'right', size: 24, color: colors.fg }} onPress={() => setChooseModal(!chooseModal)} additionalStyles={styles.additionalStyles}/>
      </View>
      <ChooseModal modalVisible={chooseModal} setModalVisible={setChooseModal}/>
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.bg2
  },
  top_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 8
  },
  mid_container: {
    flex: 4,
  },
  bottom_container: {
    flex: 1,
    justifyContent: 'center',
  },
  icon_container: {
    width: 100,
    height: 100,
    marginLeft: 8,
    borderRadius: 50,
    backgroundColor: colors.ac,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8
  },
  text_container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 16
  },
  text: {
    fontSize: 20,
    color: colors.fg,
    flexWrap: 'wrap'
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  icon_style: {
    position: 'absolute',
    bottom: Dimensions.get('screen').height / 24,
    right: 6
  },
  indicator: { position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 },
  additionalStyles:{
    inner_container: {
      marginHorizontal:Dimensions.get('screen').width/4
    }
  }
})