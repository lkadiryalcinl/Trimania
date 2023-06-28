import { StyleSheet, View, Button, FlatList, Alert,TouchableOpacity,BackHandler } from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import colors from '../../utils/colors'
import Question from './Question';
import Icon from 'react-native-vector-icons/FontAwesome'

const QuestionsScreen = ({ navigation, route }) => {
  const {data,user} = route.params
  const [seconds, setSeconds] = useState(12);
  const [index, setIndex] = useState(0);
  const [score,setScore] = useState(0);

  const flatListRef = useRef(0);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      if (index === 9) {
        navigation.navigate('Results',{score,user});
        setIndex(0)
        setSeconds(12)
        setScore(0)
      } else {
        setIndex((prevIndex) => prevIndex + 1);
        setSeconds(12);
      }
    }
  }, [seconds]);

  useEffect(() => {
    if (data) {
      flatListRef.current.scrollToIndex({ animated: true, index });
    } else {
      Alert.alert("Error", "No data found. Please return to home screen and try again.");
    }
  }, [index]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => navigation.replace('Home') }
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
    <View style={styles.outer_container}>
      <View style={styles.swiper_container}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          ref={flatListRef}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return <Question 
            category={item.category} 
            question={item.question} 
            index={index} 
            correct_answer={item.correct_answer} 
            incorrect_answers={item.incorrect_answers} 
            seconds={seconds}
            setSeconds={setSeconds}
            score={score}
            setScore={setScore}
            difficulty={item.difficulty}
            type={item.type}
            />
          }}
        />
      </View>
      <View style={styles.ad}>

      </View>
    </View>
  )
}

export default QuestionsScreen


const styles = StyleSheet.create({
  outer_container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  swiper_container: {
    flex: 8,
    margin:16
  },
  ad:{
    flex:0.5
  }
})