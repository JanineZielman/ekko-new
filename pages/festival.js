import Head from 'next/head';
import Moment from 'moment';

import Container from '../components/container';
import Layout from '../components/layout';
import { getNavigation } from '../lib/api';
import Spacer from '../components/spacer'


export default function Festival({ navigation }) {
    return (
        <>
          <Layout navigation={navigation}>
            <Container>
              <div className='grid'>
                <Spacer/>
              </div>
            </Container>
          </Layout>
        </>
    );
}

export async function getStaticProps(context) {

    const navigation = await getNavigation();

    return {
        props: {
            navigation
        },
    };
}
