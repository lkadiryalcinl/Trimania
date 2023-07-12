import React, { useState } from 'react'
import { Dimensions, StyleSheet, ImageBackground, Alert,View,Text } from 'react-native'

import Input from '../components/CustomInput'
import Button from '../components/CustomButton'

import LinearGradient from 'react-native-linear-gradient'

import {forgotPassword} from '../firebase/AuthTransactions'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import { forgotPasswordValidationSchema } from '../utils/validations'

const ForgotPasswordScreen = () => {
    const navigation = useNavigation()
    
    const handlePasswordReset = (values) => {
        forgotPassword(values.email)
        passwordResetAlert()
    }

    const passwordResetAlert = () => {
        Alert.alert(
            "Reset Password",
            "A password reset link has been sent to your email. Please check your inbox and follow the instructions to reset your password.",
            [
                { text: "OK", onPress: () => navigation.replace('Login') }
            ],
            { cancelable: false }
        );
    }
    
    return (
        <LinearGradient
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.bg, colors.bg2]}
        >
            <Formik
                initialValues={{ email: '' }}
                validationSchema={forgotPasswordValidationSchema}
                onSubmit={(values) => handlePasswordReset(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View style={styles.formik_top}>
                            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                            <Input
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType={'email-address'}
                                icon={{ name: 'mail', size: 32, color: colors.fg }}
                            />
                        </View>
                        <View style={
                            [styles.formik_bottom,
                                (touched.email && errors.email) || (touched.password && errors.password) ? { ...styles.formik_bottom, justifyContent: 'center' } : null
                            ]}>
                            <Button
                                onPress={handleSubmit}
                                label='Send E-mail'
                                icon={{ name: 'mail', size: 24, color: colors.fg }}
                                additionalStyles={styles.additionalStyles}
                            />
                        </View>
                    </>
                )}
            </Formik>

        </LinearGradient>
    )
}

export default ForgotPasswordScreen

const screen = Dimensions.get('screen')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    formik_top:{

    },
    formik_bottom:{

    },
    additionalStyles: {
        inner_container: {
            marginHorizontal: screen.width / 4
        }
    },
    error: {
        fontSize: 16,
        color: colors.fg,
        textAlign: 'center',
        height: 24
      },
})