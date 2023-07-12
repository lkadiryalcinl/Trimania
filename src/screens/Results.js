import {
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native'

import React,
{
  useContext,
  useEffect
} from 'react'

import LinearGradient from 'react-native-linear-gradient'

import colors from '../utils/colors'
import Button from '../components/CustomButton'
import Lottie from 'lottie-react-native'

import { setUserScore } from '../firebase/UserTransactions'
import { Context } from '../context/Context'

const Results = ({ navigation, route }) => {
  const { score } = route.params
  const { currUser:user } = useContext(Context)

  console.log(user,typeof(user));

  useEffect(() => {
    if (user.score) {
      if (score > user.score)
        setUserScore(score)
    }
    else {
      setUserScore(score)
    }
  }, [])

  const handleFinish = () => {
    navigation.replace('Home')
  }

  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.bg, colors.bg2]}
    >
      <View style={styles.top}>
        <Text style={[styles.text, { color: colors.fg }]}>Well Done :)</Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.congrats}>
          <Text style={styles.text}>You’re finished the test.</Text>
        </View>
        <View style={styles.lottie}>
          <Lottie source={require('../assets/Lottie/celebration.json')} autoPlay loop />
        </View>
        <View style={styles.score_info}>
          <Text style={styles.text}>your score is : <Text style={[styles.text, { color: colors.ac }]}>{score}</Text></Text>
        </View>
        <View style={styles.button_container}>
          <Button label={'Back to Board'} icon={{ name: 'back', color: colors.fg, size: 24 }} onPress={handleFinish} />
        </View>
      </View>
    </LinearGradient>
  )
}

export default Results

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    backgroundColor: colors.ac,
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  bottom: {
    flex: 8,
    backgroundColor: colors.fg,
    marginHorizontal: 20,
    marginBottom: 20
  },
  congrats: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lottie: {
    flex: 3,
  },
  score_info: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  button_container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    color: colors.black
  }
})