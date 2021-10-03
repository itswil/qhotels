import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import styled from 'styled-components';

const Container = styled.div`
  color: #333;
  font-family: 'Nunito', sans-serif;
  height: 100%;
`;
const Main = styled.main`
  height: 100%;
`;

const Home: NextPage = () => {
  const MapWithNoSSR = dynamic(
    () => import('../components/Map'),
    { ssr: false }
  )

  return (
    <Container>
      <Head>
        <title>Hong Kong Quarantine Hotels</title>
        <meta name="description" content="Mapping the hotels available for quarantine in Hong Kong for the Facebook HK Quarantine Support Group" />
        <link rel="icon" href="/favicon.svg" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;800&display=swap" rel="stylesheet" />
      </Head>

      <Main>
        <MapWithNoSSR />
      </Main>
      <div id="modal"></div>
    </Container>
  )
}

export default Home
