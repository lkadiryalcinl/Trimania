import * as yup from 'yup';

const Error = {
    email: "Invalid email address.",
    string: "Invalid string format.",
    numeric: "You should enter a numeric value in this field.",
    required: "This field is required.",
    minCharacter: (min) => `You should enter at least ${min} characters in this field.`,
    maxCharacter: (max) => `You should enter no more than ${max} characters in this field.`
    
}


const authValidations = {
        
        username: yup
        .string(Error['string'])
        .min(8,({min}) => Error['minCharacter'](min))
        .max(16,({max}) => Error['maxCharacter'](max))
        .required(Error['required']),

        email: yup
        .string(Error['string'])
        .email(Error['email'])
        .required(Error['required']),

        password: yup
        .string(Error['string'])
        .min(8,({min}) => Error['minCharacter'](min))
        .max(16,({max}) => Error['maxCharacter'](max))
        .required(Error['required']),

        confirm: yup.string(Error['string'])
        .oneOf([yup.ref('password'), null], 'Passwords not match.')

}

const authValidationSchema = yup.object().shape(authValidations);

export default authValidationSchema