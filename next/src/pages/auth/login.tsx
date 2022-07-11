import Login from '../../components/Authentication/Login'
import AppContainer from '../../components/Page/AppContainer'
import { Meta } from '../../components/Page/Meta'

const Page = () => {
    return (
        <AppContainer meta={<Meta title="Home" />} noNavbar isLoaded>
            <Login />
        </AppContainer>
    )
}

export default Page;
