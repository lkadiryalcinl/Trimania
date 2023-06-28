import { StyleSheet, Dimensions, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'

import Button from '../components/CustomButton'
import Input from '../components/CustomInput'

import colors from '../utils/colors'
import { Formik } from 'formik'

import signIn from '../firebase/signInUser'
import { signInValidationSchema } from '../utils/validations'

const LoginScreen = ({ navigation }) => {

  return (
    <ImageBackground
      source={require('../assets/images/purple-blue-bg.jpg')}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.top_container}>
        <Image source={require('../assets/images/TriviaLogo.png')} style={styles.image} />
      </View>
      <View style={styles.bottom_container}>
        <Formik
          initialValues={{ email: '', password: '', }}
          validationSchema={signInValidationSchema}
          onSubmit={signIn}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View style={styles.bottom_top_container}>
                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                <Input
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  icon={{ name: 'mail', size: 32, color: colors.fg }}
                />

                {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                <Input
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secret={true}
                  icon={{ name: 'key', size: 32, color: colors.fg }}

                />

              </View>
              <View style={styles.bottom_bottom_container}>
                <Button onPress={handleSubmit} label='Login' icon={{ name: 'login', size: 24, color: colors.fg }} />
              </View>

            </>
          )}
        </Formik>
      </View>
      <TouchableOpacity style={styles.text_container} onPress={() => navigation.navigate('Register')}><Text style={styles.text}>Don't have an account yet?</Text></TouchableOpacity>
    </ImageBackground>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg
  },
  top_container: {
    flex: 4,
    justifyContent: 'center',
  },
  bottom_container: {
    flex: 5,
    justifyContent: 'center',
  },
  bottom_top_container: {
    flex: 2,
  },
  bottom_bottom_container: {
    flex: 2.5,
    justifyContent: 'flex-start'
  },
  image: {
    width: Dimensions.get('screen').width / 1.15,
    height: Dimensions.get('screen').height / 4,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  text_container: {
    padding: 4,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0
  },
  text: {
    fontSize: 18,
    color: colors.fg
  },
  error: {
    fontSize: 16,
    color: colors.warn,
    textAlign: 'center'
  },
})