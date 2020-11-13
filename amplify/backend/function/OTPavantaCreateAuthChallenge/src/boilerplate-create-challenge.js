/* tslint:disable */
/* eslint-disable */
const https = require('https')
const axios = require('axios')

const agent = new https.Agent({
    rejectUnauthorized: false
})

exports.handler = async (event, context, callback) => {
    //Create a random number for otp
    const challengeAnswer = Math.random().toString(10).substr(2, 6)
    //Beeline number format should go without + sign
    const phoneNumber = event.request.userAttributes.phone_number.slice(1)

    //For Debugging
    console.log(event, context)

    const params = {
        destAddr: phoneNumber,
        sourceAddr: 'CLEAN HOUSE',
        message: `Your confirmation code is: ${challengeAnswer}`
    }

    try {
        const response = await axios.get(
            'https://sms.beeline.am/ecm3-2.1.2/user/receive_sms.html',
            {
                httpsAgent: agent,
                params,
                auth: {
                    username: 'CLEAN HOUSE', //Should be moved to env variables
                    password: '0880030512'
                }
            }
        )
        //For debugging purpose
        console.log(`Response: ${response.data}`)
    } catch (error) {
        console.log(error)
    }

    event.response.privateChallengeParameters = {}
    event.response.privateChallengeParameters.answer = challengeAnswer
    event.response.challengeMetadata = 'CUSTOM_CHALLENGE'
    callback(null, event)
}
