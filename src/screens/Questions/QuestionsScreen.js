import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  BackHandler,
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient';

import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react'
import Question from './Question'

const QuestionsScreen = ({ navigation, route }) => {
  const { data,amountSize } = route.params
  const [seconds, setSeconds] = useState(12);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const flatListRef = useRef(0);
  const isFocused = useIsFocused();

  useEffect(() => {

    let timerId;
    if (seconds > 0 && isFocused) { // Check if screen is focused
      timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

    } else {
      setSeconds(12)
      if (index === +amountSize - 1 && isFocused) { // Check if screen is focused
        navigation.navigate('Results', { score});
        setIndex(null)
        setScore(0)
        flatListRef.current.scrollToIndex({ animated: true, index });
      }
      else if (index === null) {
        setIndex(0)
      }
      else {
        setIndex((prevIndex) => prevIndex + 1);
      }
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    }
  }, [seconds, isFocused]);

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

  const renderItem = ({ item, index }) => {
    return (
      <Question
        item={item}
        index={index}
        seconds={seconds}
        setSeconds={setSeconds}
        score={score}
        setScore={setScore}
      />
    )
  }

  return (
    <LinearGradient
      style={styles.outer_container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.bg, colors.bg2]}
    >
      <View style={styles.swiper_container}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          ref={flatListRef}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.ad}>

      </View>
    </LinearGradient>
  )
}

export default QuestionsScreen


const styles = StyleSheet.create({
  outer_container: {
    flex: 1,
  },

  swiper_container: {
    flex: 16,
    margin: 16
  },
  ad: {
    flex: 1
  }
})