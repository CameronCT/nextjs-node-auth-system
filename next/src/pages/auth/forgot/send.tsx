import ForgotSend from '../../../components/Authentication/ForgotSend'
import AppContainer from '../../../components/Page/AppContainer'
import { Meta } from '../../../components/Page/Meta'

const Page = () => {
    return (
        <AppContainer meta={<Meta title="Password Recovery" />} noNavbar isLoaded>
            <ForgotSend />
        </AppContainer>
    )
}

export default Page
