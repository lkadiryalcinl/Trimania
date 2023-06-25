import { StyleSheet, View, Button,FlatList } from 'react-native'
import React,{useState,useEffect,useRef} from 'react'

import colors from '../../utils/colors'

import Question from './Question';

const QuestionsScreen = ({ navigation, route }) => {
  const [seconds, setSeconds] = useState(12);
  const [index, setIndex] = useState(0);
  const flatListRef = useRef();

  const data = [
    {
      "category": "General%20Knowledge",
      "type": "multiple",
      "difficulty": "easy",
      "question": "On%20a%20dartboard%2C%20what%20number%20is%20directly%20opposite%20No.%201%3F",
      "correct_answer": "19",
      "incorrect_answers": [
        "20",
        "12",
        "15"
      ]
    },
    {
      "category": "General%20Knowledge",
      "type": "boolean",
      "difficulty": "medium",
      "question": "The%20vapor%20produced%20by%20e-cigarettes%20is%20actually%20water.",
      "correct_answer": "False",
      "incorrect_answers": [
        "True"
      ]
    },
    {
      "category": "General%20Knowledge",
      "type": "multiple",
      "difficulty": "medium",
      "question": "Which%20of%20the%20following%20Ivy%20League%20universities%20has%20its%20official%20motto%20in%20Hebrew%20as%20well%20as%20in%20Latin%3F",
      "correct_answer": "Yale%20University",
      "incorrect_answers": [
        "Princeton%20University",
        "Harvard%20University",
        "Columbia%20University"
      ]
    },
    {
      "category": "General%20Knowledge",
      "type": "multiple",
      "difficulty": "medium",
      "question": "What%20was%20the%20name%20given%20to%20Japanese%20military%20dictators%20who%20ruled%20the%20country%20through%20the%2012th%20and%2019th%20Century%3F",
      "correct_answer": "Shogun",
      "incorrect_answers": [
        "Ninja",
        "Samurai",
        "Shinobi"
      ]
    },
  ]

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      if (index === 3) {
        navigation.replace('Home');
      } else {
        setIndex((prevIndex) => prevIndex + 1);
        setSeconds(12);
      }
    }
  }, [seconds]);

  useEffect(() => {
    flatListRef.current.scrollToIndex({ animated: true, index });
  }, [index]);

  return (
    <View style={styles.outer_container}>
      <View style={styles.swiper_container}>

        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showHorizontalIndicator={false}
          scrollEnabled={false}
          ref={flatListRef}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return <Question category={item.category} question={item.question} index={index} correct_answer={item.correct_answer} incorrect_answers={item.incorrect_answers} seconds={seconds}/>
          }}
          
        />
      </View>
      <View style={styles.ad}>
        <Button title='go back' onPress={() => navigation.replace('Home')} />
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
    flex: 12,
    margin:16
  },

  ad: {
    flex: 3
  },


})