import { StyleSheet, Text, View, Dimensions, Alert,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../utils/colors'

const Question = ({ category, question, correct_answer, incorrect_answers, type, index, seconds, setSeconds, score, setScore,difficulty }) => {
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
    setCorrectIndex(null);
    setWrongIndex(null);
    setDisableButtons(false);
  }, [index, question]);

  useEffect(() => {
    setDisableButtons(false);
  }, [index, question]);

  const handleButtonPress = (item, index) => {
    setDisableButtons(true);

    if (item === correct_answer) {
      setCorrectIndex(index);

      if(type === 'boolean') {
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

    } else {

      if(type === 'boolean') {
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

      setWrongIndex(index);
      setCorrectIndex(allAnswers.indexOf(correct_answer));
    }
    setSeconds(2)
  }

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
            <Icon name='crown' size={24} color={colors.fg} />
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
              index === correctIndex ? {borderWidth:2,borderColor:'green'} : index === wrongIndex ? {borderWidth:2,borderColor:'red'} : {borderWidth:2,borderColor:'#D4D4D4'}
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
    minHeight:Dimensions.get('screen').height/12,
    backgroundColor: '#D4D4D4',
    borderRadius: 5,
    justifyContent: 'center',
    margin: 16,
    alignItems:'center'
  },
  bottom_bottom: {
    flex: 3,
    justifyContent: 'center',
    alignItems:'center',
    margin:16
  },
  text_question: {
    fontSize: 18,
    color: colors.black,
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
    backgroundColor: '#D4D4D4',
    minHeight: Dimensions.get('screen').height / 16,
    borderRadius:20,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16
  },
  button_text: {
    fontSize: 18,
    color: colors.black,
    flexWrap:'wrap'
  }
})