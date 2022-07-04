import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import AppContainer from '../components/Page/AppContainer'
import { Meta } from '../components/Page/Meta'

const Home: NextPage = () => {
  return (
    <AppContainer 
      meta={<Meta title="Home" />}   
      isLoaded
    >
      <Navbar />
      Test
    </AppContainer>
  )
}

export default Home
