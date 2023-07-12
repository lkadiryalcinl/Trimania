import { 
  StyleSheet,
  Dimensions,
  Text, 
  TouchableOpacity, 
  View,
} from 'react-native'

import React,{
  useContext,
} from 'react'

import LinearGradient from 'react-native-linear-gradient';

import Button from '../components/CustomButton'
import Input from '../components/CustomInput'
import colors from '../utils/colors'

import { Formik } from 'formik'
import {createUserValidationSchema} from '../utils/validations'

import { createUser } from '../firebase/AuthTransactions'
import { Context } from '../context/Context'


const RegisterScreen = ({ navigation }) => {
  const {loading,setLoading} = useContext(Context)

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.bg, colors.bg2]}
      style={styles.container}
    >
      <View style={styles.top_container}>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirm: '' }}
          validationSchema={createUserValidationSchema}
          onSubmit={async(values)=> createUser(values,setLoading)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View style={{flex:1}}/>
              <View style={styles.top}>
                {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}
                <Input
                  placeholder="Username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  icon={{ name: 'user', size: 32, color: colors.fg }}
                />

                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                <Input
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType={'email-address'}
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
                  limit={16}
                />
              </View>
              <View style={styles.bottom}>
                  <Button label="Register" onPress={handleSubmit} icon={{ name: 'login', size: 24, color: colors.fg }} additionalStyles={styles.additionalStyles} loading={loading} disabled={loading}/>
              </View>
            </>
          )}
        </Formik>
      </View>
      <TouchableOpacity style={styles.text_container} onPress={() => navigation.navigate('Login')}><Text style={styles.text}>Already have an account ?</Text></TouchableOpacity>
    </LinearGradient>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.bg2
  },
  top_container: {
    flex: 3,
    justifyContent:'center'
  },
  top: {
    flex:3,
    justifyContent:'center'
  },
  bottom:{
    flex:1,
    marginTop:32
  },
  text_container: {
    padding: 4,
    alignSelf: 'center',
    flex:1,
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 18,
    color: colors.fg
  },
  error: {
    fontSize: 16,
    color: colors.fg,
    textAlign: 'center',
    height:24
  },
  additionalStyles:{
    inner_container: {
      marginHorizontal:Dimensions.get('screen').width/4
    }
  }
})
