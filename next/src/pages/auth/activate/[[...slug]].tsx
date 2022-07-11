import { GetServerSidePropsContext } from 'next';
import Activate from '../../../components/Authentication/Activate';
import AppContainer from '../../../components/Page/AppContainer'
import { Meta } from '../../../components/Page/Meta'

interface IProps {
    activationCode: string;
}

const Page = (props: IProps) => {

    return (
        <AppContainer meta={<Meta title="Activation" />} noNavbar isLoaded>
            <Activate {...props} />
        </AppContainer>
    )
}

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
    return {
        props: {
            activationCode: String(params?.slug?.[0] || ''),
        },
    }
};

export default Page;
