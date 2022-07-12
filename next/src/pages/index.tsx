import AppContainer from '../components/Page/AppContainer'
import { Meta } from '../components/Page/Meta'

const Page = () => {
    return (
        <AppContainer 
          meta={<Meta title="Home" />}   
          isLoaded
        >
            <div className="tw-container tw-padding">
                <h1>Home</h1>
                <p className="mt-4 text-lg">
                    Welcome to <strong>nextjs-node-auth-system</strong>! This is an <span className="font-semibold text-indigo-500">open source</span> project created by CameronCT.
                </p>
            </div>
        </AppContainer>
    )
}

export default Page
