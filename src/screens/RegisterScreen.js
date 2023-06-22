import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions,KeyboardAvoidingView } from 'react-native'
import React from 'react'

import Button from '../components/CustomButton'
import Input from '../components/CustomInput'
import colors from '../utils/colors'

import { Formik } from 'formik'
import {createUserValidationSchema} from '../utils/validations'
import createUser from '../firebase/createUser'


const RegisterScreen = ({ navigation }) => {

  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior={'height'}
    >
      <View style={styles.top_container}>
        <Image source={require('../assets/images/TriviaLogo.png')} style={styles.image} />
      </View>
      <View style={styles.bottom_container}>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirm: '' }}
          validationSchema={createUserValidationSchema}
          onSubmit={createUser}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>

              <View style={styles.bottom_top_container}>
                <Input
                  placeholder="Username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  icon={{ name: 'account', size: 28, color: 'grey' }}
                />
                {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

                <Input
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  icon={{ name: 'mail', size: 25, color: 'grey' }}
                />
                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                <Input
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secret={true}
                  icon={{ name: 'key', size: 28, color: 'grey' }}

                />
                {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                <Input
                  placeholder="Confirm"
                  onChangeText={handleChange('confirm')}
                  onBlur={handleBlur('confirm')}
                  value={values.confirm}
                  secret={true}
                  icon={{ name: 'key', size: 28, color: 'grey' }}

                />
                {touched.confirm && errors.confirm && <Text style={styles.error}>{errors.confirm}</Text>}
                
              </View>

              <View style={[styles.bottom_bottom_container,touched?{justifyContent:'center'}:null]}>
                <Button label="Register" onPress={handleSubmit} />
              </View>
            </>
          )}
        </Formik>
      </View>
      <TouchableOpacity style={styles.text_container} onPress={() => navigation.navigate('Login')}><Text style={styles.text}>Already have an account ?</Text></TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  top_container: {
    flex: 1,
    justifyContent: 'center',
  },
  bottom_container: {
    flex: 1,
  },
  bottom_top_container: {
    flex:3,
    justifyContent:'center',
  },
  bottom_bottom_container: {
    flex:2,
    justifyContent:'center',
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
    fontSize: 16,
    color: colors.black
  },
  error: {
    fontSize: 16,
    color: colors.warn,
    textAlign: 'center'
  },

})
