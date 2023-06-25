import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'
import colors from '../../utils/colors'
import { TouchableOpacity } from 'react-native'

const Question = ({ category, question, correct_answer, incorrect_answers, type, index, seconds }) => {
  const [mixControl, setMixControl] = useState(false);
  const [allAnswers, setAllAnswers] = useState([correct_answer, ...incorrect_answers]);
  const formattedCategory = decodeURIComponent(category);
  const formattedQuestion = decodeURIComponent(question);

  useEffect(() => {
    if (!mixControl) {
      let shuffledArray = [...allAnswers];
      let i = shuffledArray.length - 1;
      for (i; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      setAllAnswers(shuffledArray);
      setMixControl(true);
    }
  }, [mixControl]);

  useEffect(() => {
    if (seconds === 12) {
      setMixControl(false); // Eğer seconds 12 ise mixControl false yapılır
    } else {
      setMixControl(true); // Eğer seconds 12 değilse mixControl true yapılır
    }
  }, [seconds]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.category_container}>
          <Text style={styles.text_category}>Category: {formattedCategory}</Text>
        </View>
        <View style={styles.under_category_container}>
          <View style={styles.under_category}>
            <Icon name='crown' size={24} color={colors.fg} />
            <Text style={styles.text_category}>50</Text>
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
          {allAnswers.map((item, index) => {
            return (
              <TouchableOpacity style={styles.button} key={index}>
                <Text style={styles.button_text}>{decodeURIComponent(item)}</Text>
                <View style={{borderWidth:1,paddingHorizontal:16,paddingVertical:12,borderRadius:20,backgroundColor:colors.ac}}>
                  <Icon2 name='right' size={24} color={colors.fg}/>
                </View>
              </TouchableOpacity>
            )
          })
          }
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
    marginTop: 32,
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
    width: Dimensions.get('screen').width,
    backgroundColor: '#D4D4D4',
    borderRadius: 5,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  bottom_bottom: {
    flex: 3,
    justifyContent: 'center',
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
    flexDirection:'row',
    width: Dimensions.get('screen').width - 48,
    backgroundColor: '#D4D4D4',
    height: Dimensions.get('screen').height / 16,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingLeft: 16,
    justifyContent: 'space-between',
    alignItems:'center',
    marginTop: 16
  },
  button_text: {
    fontSize: 18,
    color: colors.black,
  }
})