import Cookies from 'universal-cookie'
import axios from './axiosConfig'

const cookies = new Cookies()

const isServerRequest = typeof window === 'undefined'

const getAccessToken = () => {
    if (isServerRequest) return ''

    const accessToken = localStorage?.getItem('accountSession') || cookies.get('accountSession')
    if (accessToken) return accessToken

    return null
}

const updateAccessToken = (token: string) => {
    if (!isServerRequest) {
        console.log('Called updateAccessToken: ', token.substring(0, 5))
        axios.defaults.headers.common['X-Authentication-Token'] = token
        localStorage?.setItem('accountSession', token)
    }
}

const getCSRFToken = () => {
    if (!isServerRequest) {
        const accessToken = localStorage?.getItem('_csrf') || cookies.get('_csrf')
        if (accessToken) return accessToken

        return null
    } else return ''
}

const updateCSRFToken = (token: string) => {
    if (!isServerRequest) {
        console.log('Called updateCSRFToken: ', token.substring(-5, 5))
        axios.defaults.headers.common['X-CSRF-Token'] = token
        localStorage.setItem('_csrf', token)
    }
}

// eslint-disable-next-line
export default {
    getAccessToken,
    updateAccessToken,
    getCSRFToken,
    updateCSRFToken,
}
