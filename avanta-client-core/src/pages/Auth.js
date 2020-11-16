import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import Amplify from '@aws-amplify/core'
import Analytics from '@aws-amplify/analytics'
import awsconfig from '../aws-exports'

import {
    useLogin,
    useSignUp,
    useVerifyOTP,
    useVerifyAuth,
    useSignOut,
    useCreateCustomer
} from '../core/hooks'

Amplify.configure(awsconfig)

const NOTSIGNIN = 'You are NOT logged in'
const SIGNEDIN = 'You have logged in successfully'
const SIGNEDOUT = 'You have logged out successfully'
const WAITINGFOROTP = 'Enter OTP number'
const VERIFYNUMBER = 'Verifying number (Country code (+XXX) needed)'

function Auth() {
    const [message, setMessage] = useState('Welcome to AWS Amplify Demo')
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [otp, setOtp] = useState('')
    const [number, setNumber] = useState('')
    const [customer, setCustomer] = useState({
        name: '',
        surname: ''
    })

    const { login, isLoading, data, error } = useLogin()
    const { signUp, isLoading: signUpLoading, error: signUpError } = useSignUp()
    const { verifyOtp, data: otpData, error: otpError } = useVerifyOTP()
    const { verifyAuth, data: authData, error: authError } = useVerifyAuth()
    const { signOut } = useSignOut()
    const { createCustomer, data: customerData, error: customerError } = useCreateCustomer()

    const password = Math.random().toString(10) + 'Abc#'

    const handleCustomer = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        console.log('Ready to auth')
        setTimeout(verifyAuth, 1500)
        Analytics.autoTrack('session', {
            enable: true
        })
    }, [])

    useEffect(() => {
        if (authData) {
            setUser(authData)
            setMessage(SIGNEDIN)
            setSession(null)
        }
        if (authError) {
            console.error(authError)
            setMessage(NOTSIGNIN)
        }
    }, [authData, authError])

    useEffect(() => {
        if (!data) {
            return
        }
        setSession(data)
        setMessage(WAITINGFOROTP)
    }, [data])

    useEffect(() => {
        checkIfSignedIn()
    }, [error])

    useEffect(() => {
        if (otpData) {
            setUser(otpData)
            setMessage(SIGNEDIN)
            setSession(null)
        }
        if (otpError) {
            login({ number })
            setMessage(otpError.message)
            setOtp('')
            console.log(otpError)
        }
    }, [otpData, otpError])

    const checkIfSignedIn = async () => {
        if (!error) {
            return
        }
        if (error.code === 'UserNotFoundException') {
            await signUp({ number })
            await login({ number })
        } else if (error.code === 'UsernameExistsException') {
            setMessage(WAITINGFOROTP)
            login({ number })
        } else {
            console.log(error.code)
            console.error(error)
        }
        return
    }

    console.log('User data', user)
    console.log('Customer data', customerData)

    return (
        <div className="App">
            <header className="App-header">
                <p>{message}</p>
                {!user && !session && (
                    <div>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Phone Number (+XXX)"
                                onChange={(event) => setNumber(event.target.value)}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => login({ number })}>
                                    Get OTP
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                )}
                {!user && session && (
                    <div>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Your OTP"
                                onChange={(event) => setOtp(event.target.value)}
                                value={otp}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => verifyOtp({ session, otp })}>
                                    Confirm
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                )}
                {user && (
                    <div>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Name"
                                name="name"
                                onChange={handleCustomer}
                                value={customer.name}
                            />
                            <FormControl
                                placeholder="Surname"
                                name="surname"
                                onChange={handleCustomer}
                                value={customer.surname}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() =>
                                        createCustomer({
                                            name: customer.name,
                                            surname: customer.surname,
                                            phone_number: user.attributes.phone_number
                                        })
                                    }>
                                    Submit
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                )}
                <div>
                    <ButtonGroup>
                        <Button variant="outline-primary" onClick={verifyAuth}>
                            Am I signed in?
                        </Button>
                        <Button
                            variant="outline-danger"
                            onClick={() => {
                                if (user) {
                                    signOut()
                                    setUser(null)
                                    setOtp('')
                                    setMessage(SIGNEDOUT)
                                }
                            }}>
                            Sign Out
                        </Button>
                    </ButtonGroup>
                </div>
            </header>
        </div>
    )
}

export default Auth
