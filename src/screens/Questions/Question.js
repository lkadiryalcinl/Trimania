import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState,useCallback } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../utils/colors'

const Question = ({item, index, seconds, setSeconds, score, setScore }) => {
  const { category, question, correct_answer, incorrect_answers, type,difficulty} = item
  
  const [allAnswers, setAllAnswers] = useState([correct_answer, ...incorrect_answers]);
  const [disableButtons, setDisableButtons] = useState(false);

  const [wrongIndex, setWrongIndex] = useState(null);
  const [correctIndex, setCorrectIndex] = useState(null);

  useEffect(() => {
    if (type === 'boolean') {
      setAllAnswers(['True', 'False']);
    } else {
      let shuffledArray = [correct_answer, ...incorrect_answers];
      let i = shuffledArray.length - 1;
      for (i; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      setAllAnswers(shuffledArray);
    }

    setCorrectIndex(null)
    setWrongIndex(null)
  }, [correct_answer,incorrect_answers]);

  useEffect(() => {
    if(seconds === 12)
      setDisableButtons(false)
  },[seconds])

  
const handleButtonPress = useCallback((item, id) => {
  setDisableButtons(true)
  setSeconds(1)
  
  if (item === correct_answer) {
    setCorrectIndex(id)
    setWrongIndex(null)

    if (type === 'boolean') {
      if (difficulty === 'easy')
        setScore(score + 6)
      else if (difficulty === 'medium')
        setScore(score + 10)
      else
        setScore(score + 13)
    }
    else {
      if (difficulty === 'easy')
        setScore(score + 10)
      else if (difficulty === 'medium')
        setScore(score + 15)
      else
        setScore(score + 20)
    }
  }
  else {
    setWrongIndex(id)
    setCorrectIndex(allAnswers.findIndex(element => element == correct_answer))

    if (type === 'boolean') {
      if (difficulty === 'easy')
        setScore(score - 3)
      else if (difficulty === 'medium')
        setScore(score - 5)
      else
        setScore(score - 7)
    }
    else {
      if (difficulty === 'easy')
        setScore(score - 5)
      else if (difficulty === 'medium')
        setScore(score - 8)
      else
        setScore(score - 10)
    }
  }
}, [correct_answer, incorrect_answers, difficulty, score, setScore, setSeconds]);

  const formattedCategory = decodeURIComponent(category)
  const formattedQuestion = decodeURIComponent(question)

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.category_container}>
          <Text style={styles.text_category}>Category: {formattedCategory}</Text>
        </View>
        <View style={styles.under_category_container}>
          <View style={styles.under_category}>
            <Icon name='crown' size={24} color={'gold'} />
            <Text style={styles.text_category}>{score}</Text>
          </View>
          <View style={styles.under_category}>
            <Icon name='timer-outline' size={24} color={colors.fg} />
            <Text style={styles.text_category}>{seconds}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottom_top}>
          <Text style={styles.text_question}><Text>{index + 1}. </Text>{formattedQuestion}</Text>
        </View>
        <View style={styles.bottom_bottom}>
          {allAnswers.map((item, index) => (
            <TouchableOpacity
              style={[
                styles.button,
                index === correctIndex ? { backgroundColor:colors.correct } : index === wrongIndex ? { backgroundColor: colors.warn } : null
              ]}
              key={index}
              onPress={() => handleButtonPress(item, index)}
              disabled={disableButtons}
            >
              <Text
                style={[
                  styles.button_text
                ]}
              >
                {decodeURIComponent(item)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </View>
  )
}

export default Question

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    backgroundColor: colors.ac,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  category_container: {
    flex: 1
  },
  text_category: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.fg,
    flexWrap: 'wrap'
  },
  bottom: {
    flex: 8,
    backgroundColor: colors.fg,
  },
  bottom_top: {
    flex: 1,
    width: Dimensions.get('screen').width - 64,
    minHeight: Dimensions.get('screen').height / 12,
    backgroundColor: colors.ac,
    borderRadius: 5,
    justifyContent: 'center',
    margin: 16,
    padding:8,
    alignItems: 'center'
  },
  bottom_bottom: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16
  },
  text_question: {
    fontSize: 18,
    color: colors.fg,
    flexWrap: 'wrap'
  },
  under_category: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center'
  },
  under_category_container: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width - 64,
    backgroundColor: colors.ac,
    minHeight: Dimensions.get('screen').height / 16,
    borderRadius: 50,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16
  },
  button_text: {
    fontSize: 18,
    color: colors.fg,
    flexWrap: 'wrap'
  }
})