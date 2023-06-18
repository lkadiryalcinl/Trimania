import { StyleSheet, Text, TouchableOpacity, View,Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import Button from '../components/CustomButton'
import Input from '../components/CustomInput'
import colors from '../utils/colors'

import  {Formik} from 'formik'
import validationSchema from '../utils/validations'
import createUser from '../firebase/createUser'


const RegisterScreen = ({navigation}) => {

  const handleSubmit = (values) => {
    createUser(values)
  }

  return (
    <>
    <View style={styles.container}>
      <Image source={require('../assets/images/TriviaLogo.png')} style={styles.image}/>
      <Formik
        initialValues={{ username: '', email: '', password: '' , confirm: ''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formik}>
            
            <Input
              placeholder="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              icon={{name:'account',size:28,color:'grey'}}
            />
            {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

            <Input
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              icon={{name:'mail',size:25,color:'grey'}}
              />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Input
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secret={true}
              icon={{name:'key',size:28,color:'grey'}}

            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <Input
              placeholder="Confirm"
              onChangeText={handleChange('confirm')}
              onBlur={handleBlur('confirm')}
              value={values.confirm}
              secret={true}
              icon={{name:'key',size:28,color:'grey'}}

            />
            {touched.confirm && errors.confirm && <Text style={styles.error}>{errors.confirm}</Text>}

            <Button label="Register" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
      <TouchableOpacity style={styles.text_container} onPress={() => navigation.navigate('Login')}><Text style={styles.text}>Already have an account ?</Text></TouchableOpacity>
    </View>
    </>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  text_container: {
    padding: 4,
    alignSelf: 'center',
    position:'absolute',
    bottom:0
  },
  text: {
    fontSize: 16,
    color: colors.black
  },
  error: {
    fontSize: 16,
    color: colors.warn,
    textAlign:'center'
  },
  formik:{
    flex:0.5,
    justifyContent:'space-evenly',
  },
  image:{
    flex:0.3,
    width:Dimensions.get('screen').width/1.15,
    height:Dimensions.get('screen').height/4,
    resizeMode:'contain'
  }

})