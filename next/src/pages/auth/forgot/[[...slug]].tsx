import { GetServerSidePropsContext } from 'next';
import ForgotRecovery from '../../../components/Authentication/ForgotRecovery';
import AppContainer from '../../../components/Page/AppContainer'
import { Meta } from '../../../components/Page/Meta'

interface IProps {
    recoveryCode: string;
}

const Page = (props: IProps) => {

    return (
        <AppContainer meta={<Meta title="Password Recovery" />} noNavbar isLoaded>
            <ForgotRecovery {...props} />
        </AppContainer>
    )
}

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
    return {
        props: {
            recoveryCode: String(params?.slug?.[0] || ''),
        },
    }
};

export default Page;
