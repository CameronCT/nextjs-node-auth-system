import { GetServerSidePropsContext } from 'next'
import Account from '../../api/Account'
import AppContainer from '../../components/Page/AppContainer'
import { Meta } from '../../components/Page/Meta'
import { AccountData } from '../../types'

interface IProps {
    profileData: AccountData;
}

const Page = (props: IProps) => {

    const { profileData } = props;

    return (
        <AppContainer meta={<Meta title={`${profileData?.displayName}'s Profile`} />} isLoaded={typeof profileData !== 'undefined'}>
            <div className="tw-container tw-padding">
                <h1>{profileData?.displayName}'s Profile</h1>
                <p className="mt-4 text-lg">
                    Some general information can go here.
                </p>
            </div>
        </AppContainer>
    )
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {

  const getProfile = await Account.getByUrl(String(query?.url || ''));
  if (getProfile?.status != 200)
    return { notFound: true, };

  return {
    props: {
      profileData: getProfile?.data
    },
  }
}

export default Page
