import AppContainer from '../components/Page/AppContainer'
import { Meta } from '../components/Page/Meta'

const Page = () => {
    return (
        <AppContainer 
          meta={<Meta title="Home" />}   
          isLoaded
        >
            Test
        </AppContainer>
    )
}

export default Page
