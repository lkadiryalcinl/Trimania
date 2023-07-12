import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'

import
React, {
  useContext,
} from 'react'

import LinearGradient from 'react-native-linear-gradient';

import Button from '../components/CustomButton'
import Input from '../components/CustomInput'

import colors from '../utils/colors'
import { Formik } from 'formik'

import { signInUser } from '../firebase/AuthTransactions'
import { signInValidationSchema } from '../utils/validations'
import { Context } from '../context/Context'

import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { signInWithGoogle } from '../firebase/SocialAuth';

const LoginScreen = ({ navigation }) => {
  const { loading, setLoading } = useContext(Context)

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.bg, colors.bg2]}
      style={styles.container}
    >
      <View style={styles.top_container}>
        <Image source={require('../assets/images/Trimania_Logo.png')} style={styles.image} />
      </View>
      <View style={styles.bottom_container}>
        <Formik
          initialValues={{ email: '', password: '', }}
          validationSchema={signInValidationSchema}
          onSubmit={(values) => signInUser(values, setLoading)}
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
                  icon={{ name: 'key', size: 32, color: colors.fg }}
                />

              </View>
              <View style={styles.bottom_bottom_container}>
                <Button onPress={handleSubmit} label='Login' icon={{ name: 'login', size: 24, color: colors.fg }} additionalStyles={styles.additionalStyles} loading={loading} disabled={loading} />
                <TouchableOpacity style={styles.button_below} onPress={() => navigation.navigate('ForgotPassword')}><Text style={styles.text}>Reset password</Text></TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
      <View style={styles.providers}>
      </View>
      <TouchableOpacity style={styles.text_container} onPress={() => navigation.navigate('Register')}><Text style={styles.text}>Don't have an account yet?</Text></TouchableOpacity>
    </LinearGradient>
  )
}

export default LoginScreen

const screen = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top_container: {
    flex: 3,
    justifyContent: 'center',
  },
  bottom_container: {
    flex: 4,
  },
  bottom_top_container: {
    flex: 2,
  },
  bottom_bottom_container: {
    flex: 3,
  },
  image: {
    width: screen.width / 1.15,
    height: screen.height / 4,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  text_container: {
    padding: 4,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0
  },
  text: {
    fontSize: 18,
    color: colors.fg,
  },
  error: {
    fontSize: 16,
    color: colors.fg,
    textAlign: 'center',
    height: 24
  },
  additionalStyles: {
    inner_container: {
      marginHorizontal: screen.width / 4
    }
  },
  button_below: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 8,
  },
  providers: {
    flex: 1,
  }
})