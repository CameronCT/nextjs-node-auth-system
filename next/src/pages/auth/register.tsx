import Register from '../../components/Authentication/Register'
import AppContainer from '../../components/Page/AppContainer'
import { Meta } from '../../components/Page/Meta'

const Page = () => {
    return (
        <AppContainer meta={<Meta title="Register" />} noNavbar isLoaded>
            <Register />
        </AppContainer>
    )
}

export default Page
