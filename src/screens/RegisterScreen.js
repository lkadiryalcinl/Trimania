import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions,ImageBackground } from 'react-native'
import React from 'react'

import Button from '../components/CustomButton'
import Input from '../components/CustomInput'
import colors from '../utils/colors'

import { Formik } from 'formik'
import {createUserValidationSchema} from '../utils/validations'
import createUser from '../firebase/createUser'


const RegisterScreen = ({ navigation }) => {

  return (
    <ImageBackground
      source={require('../assets/images/purple-blue-bg.jpg')}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.top_container}>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirm: '' }}
          validationSchema={createUserValidationSchema}
          onSubmit={async(values)=> await createUser(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>

              <View style={styles.top}>
                {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}
                <Input
                  placeholder="Username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  icon={{ name: 'account', size: 32, color: colors.fg }}
                />

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
                  icon={{ name: 'key', size: 32, color: colors.fg}}

                />

                {touched.confirm && errors.confirm && <Text style={styles.error}>{errors.confirm}</Text>}
                <Input
                  placeholder="Confirm"
                  onChangeText={handleChange('confirm')}
                  onBlur={handleBlur('confirm')}
                  value={values.confirm}
                  secret={true}
                  icon={{ name: 'key', size: 32, color: colors.fg }}

                />
                
              </View>

              <View style={styles.bottom}>
                <Button label="Register" onPress={handleSubmit} icon={{ name: 'login', size: 24, color: colors.fg }}/>
              </View>
            </>
          )}
        </Formik>
      </View>
      <TouchableOpacity style={styles.text_container} onPress={() => navigation.navigate('Login')}><Text style={styles.text}>Already have an account ?</Text></TouchableOpacity>
    </ImageBackground>
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
  top: {
    flex:3,
    justifyContent:'center',
  },
  bottom: {
    flex:1,
    justifyContent:'flex-start',
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
