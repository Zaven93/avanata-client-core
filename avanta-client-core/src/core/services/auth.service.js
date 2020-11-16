import Auth from '@aws-amplify/auth'

export const signIn = ({ number }) => Auth.signIn(number)

export const signUp = ({ number }) =>
    Auth.signUp({
        username: number,
        password: Math.random().toString(10) + 'Abc#',
        attributes: {
            phone_number: number
        }
    })

export const verifyOtp = ({ session, otp }) => Auth.sendCustomChallengeAnswer(session, otp)

export const verifyAuth = () => Auth.currentAuthenticatedUser()

export const signOut = () => Auth.signOut()
