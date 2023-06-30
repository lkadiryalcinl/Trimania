import * as yup from 'yup';

const Error = {
    email: "Invalid email address.",
    string: "Invalid string format.",
    numeric: "You should enter a numeric value in this field.",
    required: "This field is required.",
    minCharacter: (min) => `You should enter at least ${min} characters in this field.`,
    maxCharacter: (max) => `You should enter no more than ${max} characters in this field.`,
    regex:"Must Contain 8 Characters, At Least One Letter and Number"
}



const authValidations = {
        
        email: yup
        .string(Error['string'])
        .email(Error['email'])
        .required(Error['required']),

        password: yup
        .string(Error['string'])
        .min(8,({min}) => Error['minCharacter'](min))
        .max(16,({max}) => Error['maxCharacter'](max))
        .required(Error['required']),

}

const signIn = {
    ...authValidations,
}

const createUser = {
    ...authValidations,
    username: yup
        .string(Error['string'])
        .min(4,({min}) => Error['minCharacter'](min))
        .max(12,({max}) => Error['maxCharacter'](max))
        .required(Error['required']),
        
        confirm: yup.string(Error['string'])
        .oneOf([yup.ref('password'), null], 'Passwords not match.'),

        password: yup
        .string(Error['string'])
        .matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/,Error['regex'])
        .required(Error['required']),
}

const forgotPassword = {
    email: yup
    .string(Error['string'])
    .email(Error['email'])
    .required(Error['required']),
}

const createUserValidationSchema = yup.object().shape(createUser);
const signInValidationSchema = yup.object().shape(signIn);
const forgotPasswordValidationSchema = yup.object().shape(forgotPassword)

export {
    createUserValidationSchema,
    signInValidationSchema,
    forgotPasswordValidationSchema
}