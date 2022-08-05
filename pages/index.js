import Head from 'next/head';
import Moment from 'moment';

import Container from '../components/container';
import Layout from '../components/layout';
import { getRecentEvents, getNavigation } from '../lib/api';
import Spacer from '../components/spacer'


export default function Index({ recentEvents, navigation }) {
    console.log(navigation)
    return (
        <>
          <Layout navigation={navigation}>
            <Head>
                <title>Home</title>
            </Head>
            <Container>
              <div className='grid'>
                {recentEvents.slice(0,2).map((item, i) => {
                  return(
                    <div key={`news-${i}`} className='item w3'>
                      <img src={item.eventFeaturedPhoto[0].url}/>
                      <div className='flex space-between'>
                        <div className='info'>
                          <h4>{item.title}</h4>
                        </div>
                        <div className='times big'>{Moment(item.date).format('D/M')}</div>
                      </div>
                    </div>
                  )
                })}
                {recentEvents.slice(2,5).map((item, i) => {
                  return(
                    <div key={`news2-${i}`} className='item w2'>
                      <img src={item.eventFeaturedPhoto[0].url}/>
                      <div className='flex space-between'>
                        <div className='info'>
                          <h4>{item.title}</h4>
                        </div>
                        <div className='times big'>{Moment(item.date).format('D/M')}</div>
                      </div>
                    </div>
                  )
                })}
                <Spacer/>
              </div>
            </Container>
          </Layout>
        </>
    );
}

export async function getStaticProps(context) {
    // const allPosts = await getAllPostsForHome(context.preview ? context.previewData?.previewToken : undefined);

    const recentEvents = await getRecentEvents();
    const navigation = await getNavigation();

    return {
        props: {
            // allPosts,
            recentEvents,
            navigation
        },
    };
}
