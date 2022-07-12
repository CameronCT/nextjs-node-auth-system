import Authentication from '../utils/Authentication'

function useAccountToken() {
    return {
        accountSession: Authentication.getAccessToken(),
    }
}

export default useAccountToken
